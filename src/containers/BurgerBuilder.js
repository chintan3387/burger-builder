import React, { Component } from 'react';
import withErrorHandler from '../hoc/WithErrorHandler/withErrorHandler';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import axios from '../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
}

class BurgerBuilder extends Component {
/*     constructor(props) {
        super(props);
        this.state = {}
    } */

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-cd.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => this.setState({error: true}));
    }

    updatePurchaseState () {
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey]
        })
        .reduce((prev, curr) => {
            return prev + curr;
        }, 0)

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newTotalPrice = this.state.totalPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        }, this.updatePurchaseState);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const priceDeduction= INGREDIENT_PRICES[type];
        const updatedIngredients =  {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newTotalPrice = this.state.totalPrice  - priceDeduction
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        }, this.updatePurchaseState);
    }

    orderHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    orderCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    orderContinueHandler = () => {
       /*  const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chintan Desai',
                address: {
                    street: 'TestStreet',
                    pinCode: 'L5M34M',
                    country: 'Canada'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'standard'
        }
        this.setState({
            loading: true
        });
        axios.post('/orders.json', order)
            .then(response =>  this.setState({ loading: false, purchasing: false }))
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    purchasing: false
                })
            }); */
        const queryParams = [];
        
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingredients[i]))
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:  `?${queryString}`
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be fetched!!!</p> : <Spinner />;
        
        if(this.state.loading ) {
            orderSummary = <Spinner />;
        }
        if(this.state.ingredients !== null) {
            burger =(
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addHandler={this.addIngredientHandler}
                    removeHandler={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    orderHandler={this.orderHandler}
                    purchasable={this.state.purchasable} />
            </React.Fragment>
            );

            orderSummary = (<OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            clickedCancel={this.orderCancelHandler}
            clickedContinue={this.orderContinueHandler}/>);

        }
        return (
            <React.Fragment>
                <Modal 
                modalClosed={this.orderCancelHandler}
                show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);