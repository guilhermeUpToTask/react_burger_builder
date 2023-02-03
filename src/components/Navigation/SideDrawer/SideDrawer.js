import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItens from "../NavigationItens/NavigationItens";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
    //...
    let attachedClasses = [classes.SideDrawer, props.showDrawer ? classes.Open : classes.Close];

    return (
        <Auxiliary>
            <BackDrop show={props.showDrawer} clicked={props.toggleDrawer}/>

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItens />
                </nav>

            </div>
        </Auxiliary>
    );
}

export default sideDrawer;

