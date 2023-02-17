import React, {Component} from "react";
import classes from "./CheckOut.css";
import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import withRouter from "../../hoc/withRouter/withRouter";
import ContactData from "./ContactData/ContactData";
import { Route, Routes } from "react-router-dom";

class CheckOut extends Component {
    state = {
        ingredients : {},
        totalPrice: 0     
        }

    componentWillMount(){
        const query = new URLSearchParams(this.props.router.location.search);
        const ingredients = {};
        let totalPrice= 0;
        for (let param of query.entries()){
            if(param[0] === 'price'){
                totalPrice= param[1];
            }
            else{
                ingredients[param[0]] = +param[1]; 
            }
        }

        this.setState({ingredients: ingredients, totalPrice: totalPrice});
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

                <Routes>
                    <Route path="/contact-data" element={<ContactData ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}/>}/>
                </Routes>                
            </div>
        )
    }
}

export default withRouter(CheckOut);