import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withError from '../../../withError/withError';
import * as actions from '../../../store/actions/actionHead';

class ContactData extends Component {
    state ={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest' , displayValue: 'Fastest'},
                        {value: 'normal' , displayValue: 'Normal'},
                ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            },
        },
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        
        const formData = {};

        for(let formElementIndentifier in this.state.orderForm) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price      : this.props.price,
            customer   : formData,
            userId     : this.props.userId
        };

        this.props.onOrderBurger(order , this.props.token);

    }

    inputChangedHandler = (e , inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for( let inputIdentifier in updatedOrderForm ) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    checkValidity(value, rules) {

        let isValid = true;

        if( rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength ){
            isValid = value.length >= rules.minLength  && isValid;
        }

        if( rules.maxLength ){
            isValid = value.length <= rules.maxLength  && isValid;
        }

        return isValid;
    }

    render () {

        const formElem = [];

        for( let key in this.state.orderForm) {
            formElem.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElem.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed={(e) => this.inputChangedHandler(e, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}clicked={this.orderHandler}>Go!</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    let t = {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
    return t;
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps , mapDispatchToProps)(withError(ContactData, axios));