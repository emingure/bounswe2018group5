package com.karpuz.karpuz.Adapter

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.karpuz.karpuz.Network.Config
import com.karpuz.karpuz.Network.KarpuzAPIModels
import com.karpuz.karpuz.R
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.project_cell.view.*
import java.text.SimpleDateFormat

class ProjectsAdapter(var projects: List<KarpuzAPIModels.Project>,
                      val projectClickListener: (KarpuzAPIModels.Project) -> Unit,
                      val userClickListener: (String?) -> Unit): RecyclerView.Adapter<ProjectsAdapter.ProjectsViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProjectsViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.project_cell, parent, false)
        return ProjectsViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProjectsViewHolder, position: Int) {
        val item = projects.get(position)
        holder.bind(item, projectClickListener, userClickListener)
    }

    override fun getItemCount(): Int {
        return projects.size
    }

    fun setData(projects: List<KarpuzAPIModels.Project>) {
        this.projects = projects
        notifyDataSetChanged()
    }

    class ProjectsViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        fun bind(item: KarpuzAPIModels.Project, projectClickListener: (KarpuzAPIModels.Project) -> Unit, userClickListener: (String?) -> Unit) {
            itemView.project_cell_user_full_name.text = item.owner.full_name
            itemView.project_cell_title.text = item.title
            itemView.project_cell_description.text = item.description
            itemView.project_cell_budget.text = item.budget.toString() + "$"
            itemView.project_cell_deadline.text = item.deadline.subSequence(0, item.deadline.indexOf("T"))
            itemView.project_cell_created_at.text = item.created_at
            if (item.owner.profile_image != null) {
                Picasso.get().load(Config.baseProfileImageUrl+item.owner.profile_image).into(itemView.project_cell_user_image)
            } else {
                Picasso.get().load(R.drawable.profile_icon).into(itemView.project_cell_user_image)
            }

            itemView.project_header.setOnClickListener { userClickListener(item.owner.id) }
            itemView.project_body.setOnClickListener { projectClickListener(item) }
            itemView.project_details.setOnClickListener { projectClickListener(item) }
        }
    }
}