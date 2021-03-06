import React from "react";
import Helmet from "react-helmet";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import ProjectCard from "components/Card/ProjectCard";
import AddProjectModal from 'components/Modal/AddProjectModal.jsx';
import GridItem from "material-dashboard-react/dist/components/Grid/GridItem";
import GridContainer from "material-dashboard-react/dist/components/Grid/GridContainer";
import CustomTabs from "material-dashboard-react/dist/components/CustomTabs/CustomTabs";

import Assignment from "@material-ui/icons/Assignment";
import AssignmentInd from "@material-ui/icons/AssignmentInd";

import ProjectsPageStyle from "material-dashboard-react/dist/assets/jss/material-dashboard-react/views/dashboardStyle";
import connect from "react-redux/es/connect/connect";
import {tryGetOwnProjects, getOwnProjectsReset} from "redux/project/Actions.js";

class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            projects_client: [], 
            projects_freelancer: [],
        };
    }

    componentDidMount() {
        this.props.tryGetOwnProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        const { getOwnProjectsInProgress, getOwnProjectsHasError, getOwnProjectsCompleted, projects} = this.props.project;

        if (!getOwnProjectsInProgress && !getOwnProjectsHasError && getOwnProjectsCompleted) {
            this.setState({ projects_client: projects.client, projects_freelancer: projects.freelancer });
            this.props.getOwnProjectsReset();
        }
    }

    handleToUpdate(project) {
        var { projects_client} = this.state;
        projects_client.push(project);
        this.setState({
            projects_client: projects_client,
        });
    }

    handleToManageProject(project, type) {
        var { projects_client } = this.state;
        let new_projects_client;
        if (type === 'edit') {
            new_projects_client = projects_client.map((prop, key) => {
                return project.project_id === prop.project_id ? project : prop;
            })
        } else if (type === 'delete') {
            new_projects_client = projects_client.filter(function (elem, index, portfolios) {
                return project.project_id !== elem.project_id;
            })
        }
        this.setState({
            projects_client: new_projects_client,
        });
    }
    

    render() {
        const { projects_client, projects_freelancer } = this.state;
        var project_grid_client = (
            <GridContainer>
                {projects_client.map((prop, key) => {
                    return (
                        <GridItem xs={12} sm={12} md={4} key={key}>
                            <ProjectCard
                                title={prop.title}
                                description={prop.description}
                                budget={prop.budget}
                                project_deadline={prop.deadline}
                                created_at={prop.created_at}
                                owner={prop.owner}
                                owner_id={prop.owner_id}
                                project_id={prop.project_id}
                                owned={true}
                                status={prop.status}
                                handleToUpdate={this.handleToManageProject.bind(this)}
                                milestones={prop.milestones}
                                tags={[]}
                            />
                        </GridItem>
                    );
                })}
            </GridContainer>
        );
        var project_grid_freelancer = (
            <GridContainer>
                {projects_freelancer.map((prop, key) => {
                    return (
                        <GridItem xs={12} sm={12} md={4} key={key}>
                            <ProjectCard
                                title={prop.title}
                                description={prop.description}
                                budget={prop.budget}
                                project_deadline={prop.deadline}
                                created_at={prop.created_at}
                                owner={prop.owner}
                                status={prop.status}
                                is_freelancer={true}
                                owner_id={prop.owner_id}
                                project_id={prop.project_id}
                                milestones={prop.milestones}
                                tags={[]}
                            />
                        </GridItem>
                    );
                })}
            </GridContainer>
        );
        return (
            <div>
                <Helmet
                    title='Projects Page'
                    meta={[
                        {property: 'og:title', content: 'Projects Page'},
                    ]}/>
                <div style={{
                    position: "fixed",
                    bottom: "32px",
                    right: "32px",
                    zIndex: "200"
                }}>
                    <AddProjectModal handleToUpdate={this.handleToUpdate.bind(this)}/>
                </div>
                <CustomTabs
                    title="Your Projects:"
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "Client",
                            tabIcon: Assignment,
                            tabContent: (
                                project_grid_client
                            )
                        },
                        {
                            tabName: "Freelancer",
                            tabIcon: AssignmentInd,
                            tabContent: (
                                project_grid_freelancer
                            )
                        },

                    ]}
                />
            </div>
        );
    }
}

function bindAction(dispatch) {
    return {
        tryGetOwnProjects: () => dispatch(tryGetOwnProjects()),
        getOwnProjectsReset: () => dispatch(getOwnProjectsReset())
    };
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(
    mapStateToProps,
    bindAction
)(withStyles(ProjectsPageStyle)(ProjectsPage));