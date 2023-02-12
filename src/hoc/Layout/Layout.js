import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css"
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { Outlet } from "react-router-dom";

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
                <Outlet/>
            </main>
        </Auxiliary>
    )}
};

export default Layout;