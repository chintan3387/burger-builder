import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => {
    console.log(`show prop is: ${props.show}`)
    return props.show ? (<div className={classes.Backdrop}
        onClick={props.clicked}
    ></div>) : <React.Fragment />
}

export default Backdrop