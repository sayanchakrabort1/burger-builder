import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actionHead';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        let summary = <Redirect to="/" />;

        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        console.log(this.props.purchased);
        if(this.props.ingredients){
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinueHandler}></CheckoutSummary>

                <Route path={this.props.match.path+'/contact-data'}
                component={ContactData} />
            </div>);
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);