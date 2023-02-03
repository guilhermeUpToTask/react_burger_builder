import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.css"
import ToolBar from "../Navigation/ToolBar/ToolBar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state={
        showSideDrawer: false
    }

    ToggleSideDrawerHandler= () =>{
        this.setState((prevState) => {
        return {showSideDrawer:!prevState.showSideDrawer}});
    }

    render() {
        return(
        <Auxiliary>
            <ToolBar toggleDrawer={this.ToggleSideDrawerHandler}/>
            <SideDrawer showDrawer={this.state.showSideDrawer} toggleDrawer={this.ToggleSideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
    )}
};

export default Layout;