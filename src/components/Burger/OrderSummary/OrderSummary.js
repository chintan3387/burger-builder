import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return <li key={igKey} style={{listStyle: 'none'}}>
                                        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
                                        </li>
                                })
    return (
        <React.Fragment>
                <h3>Your Order</h3>
                <p>Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: ${props.price}</strong></p>
                <p> Continue to Checkout</p>
                <Button btnType='Danger' clicked={props.clickedCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={props.clickedContinue}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default OrderSummary;