import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import PropTypes from 'prop-types';

const burger = (props) => {
    let ingredientsArr = Object.keys(props.ingredients)
                            .map((igKey) => {
                                return [...Array(props.ingredients[igKey])]
                                        .map((_, i) => {
                                             return <BurgerIngredients key={igKey + i} type={igKey} />
                                        });
                        })
                        .reduce((prev, curr) => {
                            return prev.concat(curr);
                        }, []);

    if(ingredientsArr.length === 0) {
        ingredientsArr= <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {ingredientsArr}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

burger.propTypes = {
    ingredients: PropTypes.shape({}).isRequired
}

export default burger;
