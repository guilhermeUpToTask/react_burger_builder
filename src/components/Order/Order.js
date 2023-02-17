import React from "react";
import classes from './Order.css';

const order = (props) => {
    let ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({name: ingName, ammount: props.ingredients[ingName]});
    }

    const ingredientsOutPut = ingredients.map((ig) => 
        <span  key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',

        }}>
            {ig.name} ({ig.ammount})
        </span>
    )
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutPut}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )

}

export default order;