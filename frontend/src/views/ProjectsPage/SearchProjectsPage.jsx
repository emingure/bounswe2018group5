import React from "react";
import Helmet from "react-helmet";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import ProjectCard from "components/Card/ProjectCard";
import GridItem from "material-dashboard-react/dist/components/Grid/GridItem";
import GridContainer from "material-dashboard-react/dist/components/Grid/GridContainer";


import homePageStyle from "material-dashboard-react/dist/assets/jss/material-dashboard-react/views/dashboardStyle";
import connect from "react-redux/es/connect/connect";
import { trySearchProjects, searchProjectsReset} from "redux/project/Actions.js";

class SearchProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        const { query } = this.props.match.params;
        this.props.trySearchProjects(query);
    }

    componentDidUpdate(prevProps, prevState) {
        const {searchProjectsInProgress, searchProjectsHasError, searchProjectsCompleted, projects, response} = this.props.project;

        if (!searchProjectsInProgress && !searchProjectsHasError && searchProjectsCompleted) {
            if (response) {
                this.setState({projects: projects});
                this.props.searchProjectsReset();
            }
        }
    }

    render() {
        const { projects } = this.state;
        var project_grid = (
            <GridContainer>
                {projects.map((prop, key) => {
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
                                milestones={prop.milestones}
                                tags={prop.tags}
                            />
                        </GridItem>
                    );
                })}
            </GridContainer>
        );
        return (
            <div>
                <Helmet
                    title='Home Page'
                    meta={[
                        {property: 'og:title', content: 'Home Page'},
                    ]}/>
                <h1>Results Projects</h1>
                {project_grid}
            </div>
        )
            ;
    }
}

function bindAction(dispatch) {
    return {
        trySearchProjects: (query) => dispatch(trySearchProjects(query)),
        searchProjectsReset: () => dispatch(searchProjectsReset())
    };
}

const mapStateToProps = state => ({
    project: state.project
});

export default connect(
    mapStateToProps,
    bindAction
)(withStyles(homePageStyle)(SearchProjectsPage));