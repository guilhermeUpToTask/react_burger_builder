import React, { Component } from 'react';
import axios from '../../../src/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


const IGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurguerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => this.setState({ ingredients: res.data }))
            .catch(error => this.setState({error : error}));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIgredients = {
            ...this.state.ingredients
        }
        updateIgredients[type] = updateCount;

        const priceAddition = IGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updateIgredients, totalPrice: newPrice });
        this.updatePurchaseState(updateIgredients);
    }

    removeIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;

        const updateCount = oldCount - 1;
        const updateIgredients = {
            ...this.state.ingredients
        }
        updateIgredients[type] = updateCount;

        const priceDecrement = IGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDecrement;
        this.setState({ ingredients: updateIgredients, totalPrice: newPrice });
        this.updatePurchaseState(updateIgredients);
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHander = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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

        axios.post('/order.json', order)
            .then((response) => {
                this.setState({ purchasing: false, loading: false })
            })
            .catch((error) => {
                console.log(error);
                this.setState({ purchasing: false, loading: false })
            })
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> :<Spinner/>;

        if (this.state.ingredients) {
            orderSummary =
                <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHander}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice} />
            burger =
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIgredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchasingHandler} />
                </Auxiliary>
        }

        if (this.state.loading)
            orderSummary = <Spinner />

        return (
            <Auxiliary>

                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>

            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurguerBuilder, axios);