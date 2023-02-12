import React from "react";
import classes from "./CheckOutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckOutSummary}>
            <h1>I Hope it tastes Good</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType='Danger' clicked={props.checkoutCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
            </div>

        </div>
    )
}

export default checkoutSummary;