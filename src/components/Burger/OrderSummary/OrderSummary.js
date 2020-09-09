import React from 'react';
import Auxillary from '../../../HOC/Auxillary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const igS = Object.keys(props.ingredients).map( igKey => {
        return <li key={igKey}><span style={{testTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    });

    return (
        <Auxillary>
            <h3>Order Summmary</h3>
            <p>Your burger has following Ingredients</p>
            <ul>
                {igS}
            </ul>
            <p>Continue to checkout!</p>
            <h4>Total Price: Rs. {props.totalPrice}</h4>
            <Button clicked={props.clicked}btnType="Danger">Cancel</Button>
            <Button clicked={props.goClicked}btnType="Success">Go!</Button>
        </Auxillary>
    )
}

export default orderSummary;