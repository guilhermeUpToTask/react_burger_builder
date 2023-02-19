import React, { Component } from 'react';
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import withRouter from "../../../hoc/withRouter/withRouter";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',

                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name',

                },
                value: '',
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode',

                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country Name',

                },
                value: '',
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
            },
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice
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

    inputChangedHandler = (event, inputIdentifer) =>{
        const updateOrderForm = {...this.state.orderForm};
        const updateFormElement = {...updateOrderForm[inputIdentifer]};
        updateFormElement.value = event.target.value;
        updateOrderForm[inputIdentifer] = updateFormElement;

        this.setState({orderForm: updateOrderForm});
    }


    render() {

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        const form = this.state.loading ?
            (<Spinner />)
            :
            (<form>

                {formElementsArray.map(element => 
                    <Input elementType={element.config.elementType}
                        name={element.id}
                        key={element.id}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} 
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
                )}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>)

        return (
            <div className={classes.ContactData}>
                <h2>Enter Your Contact Data</h2>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);