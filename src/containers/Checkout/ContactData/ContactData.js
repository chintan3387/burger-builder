import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
    state = {
        username: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHanlder = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            .then(response =>  {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                })
            }); 
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street Name" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHanlder}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData }>
                <h4>Enter your Contact Information</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);