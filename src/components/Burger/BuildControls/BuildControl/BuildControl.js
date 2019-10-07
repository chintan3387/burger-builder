import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Add} onClick={props.addIngredient}>Add</button>
        <button className={classes.Remove} onClick={props.removeIngredient} disabled={props.disableBtn}>Remove</button>
    </div>
    )
}

export default buildControl;