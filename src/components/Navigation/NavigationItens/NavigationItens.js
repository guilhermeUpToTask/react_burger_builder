import React from "react";
import classes from "./NavigationItens.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItens = (props) =>(
    <ul className={classes.NavigationItens}>
        <NavigationItem link="/burger">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
)

 export default navigationItens;