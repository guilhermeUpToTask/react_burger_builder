import React, { Component } from 'react';
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import withRouter from "../../../hoc/withRouter/withRouter";
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        email: '',
        name: '',
        address: {
            street: '',
            postalcode: ''
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            costumer: {
                name: 'bob',
                address: {
                    street: 'av 220 central park new work',
                    zipcode: '44420',
                    country: 'United State'
                },
                email: 'bobthebuilder@gmail.com'
            },
            deliveryMethod: 'fastested'
        }

        axios.post('/orders.json', order)
            .then((response) => {
                this.setState({ loading: false })
                console.log(response);
                this.props.router.navigate('/burger');
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false })
            })

    }

    render() {
        const form = this.state.loading ?
                (<Spinner />)
            : 
                (<form>
                    <input className={classes.Input} name='name' type='text' placeholder="Your name" />
                    <input className={classes.Input} name='email' type='email' placeholder="Your email" />
                    <input className={classes.Input} name='Street' type='text' placeholder="Your street name" />
                    <input className={classes.Input} name='postalCode' type='text' placeholder="Your Postal Code" />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>)

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);