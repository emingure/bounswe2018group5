import React, {Component} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Messages from "views/UserProfile/Messages.jsx";
import ProjectPage from "views/ProjectPage/ProjectPage.jsx";
import ProjectsPage from "views/ProjectsPage/ProjectsPage.jsx";
import SearchProjectsPage from "views/ProjectsPage/SearchProjectsPage.jsx";
import HomePage from "views/HomePage/HomePage.jsx";
import OtherUserProfile from "views/UserProfile/OtherUserProfile.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import Person from "@material-ui/icons/Person";
import Group from "@material-ui/icons/Group";
import Home from "@material-ui/icons/Home";
import Layers from "@material-ui/icons/Layers";
import Message from "@material-ui/icons/Message";

//import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// core components
import Header from "components/Header/LoggedInHeader.jsx";
import Footer from "components/Footer/LoggedInFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardStyle from "material-dashboard-react/dist/assets/jss/material-dashboard-react/layouts/dashboardStyle";

const dashboardRoutes = [
    {
        path: "/home/index",
        sidebarName: "Home",
        navbarName: "Home",
        icon: Home,
        component: HomePage
    },
    {
        path: "/home/index/:query",
        sidebarName: "Result Projects",
        navbarName: "Projects",
        active: false,
        icon: Home,
        component: SearchProjectsPage
    },
    {
        path: "/home/profile",
        sidebarName: "User Profile",
        navbarName: "Profile",
        icon: Person,
        component: UserProfile
    },
    {
        path: "/home/messages",
        sidebarName: "Messages",
        navbarName: "Messages",
        icon: Message,
        component: Messages
    },
    {
        path: "/home/projects",
        sidebarName: "Projects",
        navbarName: "Projects",
        icon: Layers,
        component: ProjectsPage
    },
    {
        path: "/home/projects/:project_id",
        sidebarName: "Projects",
        navbarName: "Projects",
        active: false,
        icon: Layers,
        component: ProjectPage
    },
    {
        path: "/home/users",
        sidebarName: "Users",
        navbarName: "Users",
        icon: Group,
        component: OtherUserProfile
    },
    {
        path: "/home/users/:user_id",
        sidebarName: "User Profile",
        navbarName: "User Profile",
        icon: Group,
        active: false,
        component: OtherUserProfile
    },
    { redirect: true, path: "/home", to: "/home/index", navbarName: "Redirect" }
];

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} exact={true} component={prop.component} key={key}/>;
        })}
    </Switch>
);

class HomeLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            //const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, ...rest} = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={dashboardRoutes}
                    logoText={"Karpuz"}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    history={this.props.history}
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        routes={dashboardRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

HomeLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(HomeLayout);