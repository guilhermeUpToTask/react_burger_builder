import React, {Component} from "react";
import classes from "./CheckOut.css";
import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import withRouter from "../../hoc/withRouter/withRouter";

class CheckOut extends Component {
    state = {
        ingredients : {
            salad : 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.router.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1]; 
        }

        this.setState({ingredients: ingredients});

    }

    componentDidUpdate(){
        if (this.props.router.location.search === "")
            this.props.router.navigate('/burger');
    }

    checkoutContinuedHandler = () =>{
        const currentPath = this.props.router.location.pathname;
        this.props.router.navigate(currentPath +'/contact-data');
    }
    checkoutCancelledHandler = () =>{
        this.props.router.navigate(-1);
    }

    render(){
        return(
            <div className={classes.CheckOut}>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutContinued={this.checkoutContinuedHandler}
                checkoutCancelled={this.checkoutCancelledHandler}/>
            </div>
        )
    }
}

export default withRouter(CheckOut);