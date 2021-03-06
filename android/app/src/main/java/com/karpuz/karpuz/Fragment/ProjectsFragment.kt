package com.karpuz.karpuz.Fragment

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.karpuz.karpuz.Activity.ProfileActivity
import com.karpuz.karpuz.Activity.ProjectActivity
import com.karpuz.karpuz.Adapter.ProjectsAdapter
import com.karpuz.karpuz.Extensions.shortToast
import com.karpuz.karpuz.Network.KarpuzAPIModels
import com.karpuz.karpuz.Network.KarpuzAPIService

import com.karpuz.karpuz.R
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.fragment_projects.*
import kotlinx.android.synthetic.main.fragment_projects.view.*

class ProjectsFragment : Fragment() {

    companion object {
        private const val TAG = "ProjectsFragment"
    }

    private val disposeBag = CompositeDisposable()

    private var projects = emptyList<KarpuzAPIModels.Project>()
    private var adapter = ProjectsAdapter(emptyList(), { p: KarpuzAPIModels.Project -> projectSelected(p) }, { userId: String? -> userSelected(userId) })

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_projects, container, false)

        view.projects_recycle_view.adapter = adapter
        view.projects_recycle_view.layoutManager = LinearLayoutManager(this.context)

        view.swipe_refresh_layout_projects.setOnRefreshListener {
            refreshProjects()
        }

        view.swipe_refresh_layout_projects.isRefreshing = true
        refreshProjects()

        return view
    }

    override fun onDetach() {
        super.onDetach()
        disposeBag.clear()
    }

    private fun projectsUpdated(projects: List<KarpuzAPIModels.Project>) {
        adapter.setData(projects)
        swipe_refresh_layout_projects.isRefreshing = false
    }

    private fun refreshProjects() {
        Log.v(TAG, "Refreshing projects...")
        disposeBag.add(KarpuzAPIService.instance.getAllProjects()
            .subscribe(
                { result ->
                    if (result.response && result.projects != null) {
                        Log.v(TAG, "Project refresh successful")
                        this.projects = result.projects
                        projectsUpdated(this.projects)
                    } else {
                        Log.e(TAG, "Error when getting projects")
                        swipe_refresh_layout_projects.isRefreshing = false
                        activity?.shortToast("Update error")
                    }
                },
                { error ->
                    Log.e(TAG, "Error when getting projects: {$error}")
                    activity?.runOnUiThread {
                        swipe_refresh_layout_projects.isRefreshing = false
                        activity?.shortToast("Update error")
                    }
                }
            )
        )
    }

    private fun projectSelected(project: KarpuzAPIModels.Project) {
        val intent = Intent(context, ProjectActivity::class.java)
        intent.putExtra("PROJECT_ID", project.project_id)
        startActivity(intent)
    }

    private fun userSelected(userId: String?) {
        Log.v(TAG, "User selected: $userId")
        val profileIntent = Intent(this.context, ProfileActivity::class.java)
        profileIntent.putExtra("USER_ID", userId)
        startActivity(profileIntent)
    }
}
