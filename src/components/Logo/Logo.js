import React from "react";
import classes from "./Logo.css";
import LogoImage from "../../../src/assets/images/burger-logo.png";

const logo  = (props) => (
    <div className={classes.Logo}>
        <img src={LogoImage} alt="MyBurger"></img>
    </div>
);

export default logo;
