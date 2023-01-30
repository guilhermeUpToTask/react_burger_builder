import React , { Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
class BurguerBuilder extends Component {
    state = {
        ingredients : {
            salad: 1,
            meat: 2,
            bacon: 1,
            cheese: 2,
        }
    }

    render() {
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <div>Burger Controls</div>
            </Auxiliary>
        )
    }
}

export default BurguerBuilder;