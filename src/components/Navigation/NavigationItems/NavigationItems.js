import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/checkout">
            Checkout
        </NavigationItem>
    </ul>
);

export default NavigationItems;