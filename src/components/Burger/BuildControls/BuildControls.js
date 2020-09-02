import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad' , type: 'salad'},
    { label: 'Bacon' , type: 'bacon'},
    { label: 'Cheese' , type: 'cheese'},
    { label: 'Meat' , type: 'meat'},
];

const BuildControls = (props) => (
        <div className={classes.BuildControls}>
            <p>Current Price: Rs.{props.totalPrice}</p>
            {controls.map(ctr => (
                    <BuildControl 
                        key={ctr.label} 
                        label={ctr.label} 
                        ingredientAdded={() => props.ingredientAdded(ctr.type)} 
                        ingredientRemoved={ () => props.ingredientRemoved(ctr.type) }
                        disable={props.disabledInfo[ctr.type]}
                        >
                    </BuildControl>
                ))}
            <button className={classes.OrderButton} disabled={!props.purchasble} onClick={props.purchasing}>Order Now</button>
        </div>
);

export default BuildControls;