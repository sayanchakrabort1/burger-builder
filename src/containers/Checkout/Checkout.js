import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let p;

        for ( let param of query.entries() ){

            

            if( param[0] !== 'price'){
                ingredients[param[0]] = +param[1];
            } else {
                p = +param[1];
            }
        }
        
        this.setState({
            ingredients: ingredients,
            price: p
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinueHandler}></CheckoutSummary>

                <Route path={this.props.match.path+'/contact-data'}
                render={ (props) => (
                    <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>
                )} />
            </div>
        );
    }
}

export default Checkout;