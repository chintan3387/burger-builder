import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
     { label: 'Salad', type: 'salad' },
     { label: 'Bacon', type: 'bacon' },
     { label: 'Cheese', type: 'cheese' },
     { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <h5>Current Price: ${props.price}</h5>
            {
                controls.map((control) => {
                    return <BuildControl
                    key={control.label}
                    label={control.label}
                    disableBtn={props.disabled[control.type]}
                    addIngredient={() => props.addHandler(control.type)}
                    removeIngredient={() => props.removeHandler(control.type)} />
                })
            }
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderHandler}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;