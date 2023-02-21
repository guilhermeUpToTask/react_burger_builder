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
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name',

                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: '',
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode',

                },
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country Name',

                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                value: '',
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',

                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
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
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for ( let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; 
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
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
    checkValidity(value, rules){
        let isValid = true;

        if(rules.required)
            isValid = value.trim() !== '' && isValid;
        if(rules.minLength)    
            isValid = value.length >= rules.minLength && isValid;
        if(rules.maxLength)    
            isValid = value.length <= rules.maxLength && isValid; 
            
        return isValid;    
    }

    inputChangedHandler = (event, inputIdentifer) =>{
        const updateOrderForm = {...this.state.orderForm};
        const updateFormElement = {...updateOrderForm[inputIdentifer]};
        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateOrderForm[inputIdentifer] = updateFormElement;

        let formIsValid = true;
        for(let inputID in updateOrderForm){
            formIsValid = updateOrderForm[inputID].valid && formIsValid; 
        }
        console.log(formIsValid);
        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});
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
            (<form onSubmit={this.orderHandler}>
                {formElementsArray.map(element => 
                    <Input elementType={element.config.elementType}
                        name={element.id}
                        key={element.id}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched= {element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
                )}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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