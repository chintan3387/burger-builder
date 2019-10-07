import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends React.Component {
    state = {
       ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
       },
       totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log(`query is: ${query}`);

        const ingredients = {};
        let price = 0;

        for(let param of query.entries()) {
            if (param[0] === 'price') {
                 price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }

        this.setState({ ingredients, totalPrice: price });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelHandler}
                checkoutContinued={ this.checkoutContinueHandler}
                ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + "/contact-data"} render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />}  />
            </div>
        );
    }
}