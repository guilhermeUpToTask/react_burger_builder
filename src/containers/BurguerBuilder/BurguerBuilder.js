import React , { Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
class BurguerBuilder extends Component {
    render() {
        return(
            <Auxiliary>
                <Burger/>
                <div>Burger Controls</div>
            </Auxiliary>
        )
    }
}

export default BurguerBuilder;