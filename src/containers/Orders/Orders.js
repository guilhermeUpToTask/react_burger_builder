import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state= {
        orders: [],
        loading: true,
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then((res) =>{
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key,
                })
            }
            this.setState({orders: fetchedOrders, loading: false});
        }).catch((err) => {
            this.setState({loading: false});
        });

    }

    render() {
        const orders = this.state.loading? <Spinner/> 
        : this.state.orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>)
        return (
            <div>
                {orders}
            </div>
        )
    };
}

export default withErrorHandler(Orders, axios);