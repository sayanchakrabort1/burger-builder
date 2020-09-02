import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients  = [];

    for ( let igN in props.ingredients ){
        console.log('lau'+props.ingredients[igN]);
        ingredients.push({
            name: igN,
            amount: props.ingredients[igN]
        });
    }

    const ingredientOutput = ingredients.map( ig => {
        return <span style={{
            textTransform:'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
    }} key={ig.name}>{ig.name} ({ig.amount})</span>;
    })
    return (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <strong>INR {props.price.toFixed(1)}</strong></p>
    </div>
    );
};

export default order;