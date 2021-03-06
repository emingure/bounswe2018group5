import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./LoggedInHeaderLinks.jsx";
import Button from "material-dashboard-react/dist/components/CustomButtons/Button";

import headerStyle from "material-dashboard-react/dist/assets/jss/material-dashboard-react/components/headerStyle";

function LoggedInHeader({ ...props }) {
    function makeBrand() {
        var name;
        props.routes.map((prop, key) => {
            var splited = props.location.pathname.split("/");
            var result;
            if (splited.length > 3) {
                result = "/" + splited[1] + "/" + splited[2];
            } else {
                result = props.location.pathname;
            }
            if (prop.path === result) {
                name = prop.navbarName;
            }
            return null;
        });
        return name;
    }
    const { classes, color, history } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div>
                    {/* Here we create navbar brand, based on route name */}
                    <Button color="transparent" className={classes.title}>
                        {makeBrand()}
                    </Button>
                </div>
                <Hidden mdDown implementation="css">
                    <HeaderLinks history={history} />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

LoggedInHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(LoggedInHeader);