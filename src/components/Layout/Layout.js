import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.css"
import ToolBar from "../UI/ToolBar/ToolBar";

const layout = (props) => (
    <Auxiliary>
        <ToolBar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;