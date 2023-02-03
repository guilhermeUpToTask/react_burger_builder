import React from "react";
import classes from "./NavigationItens.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItens = (props) =>(
    <ul className={classes.NavigationItens}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >CheckOut</NavigationItem>
    </ul>
)

 export default navigationItens;