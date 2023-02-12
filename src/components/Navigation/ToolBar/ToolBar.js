import React from "react";
import classes from "./ToolBar.css";
import Logo from "../../Logo/Logo";
import NavigationItens from "../NavigationItens/NavigationItens";
import ToggleSideDrawer from "../SideDrawer/ToggleSideDrawer/ToggleSideDrawer";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const toolBar = (props) => (
    <Auxiliary>
    <header className={classes.ToolBar}>
        <ToggleSideDrawer clicked={props.toggleDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItens/>
        </nav>
    </header>
    </Auxiliary>
)

export default toolBar;