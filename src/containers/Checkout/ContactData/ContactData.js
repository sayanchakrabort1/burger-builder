import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state ={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        console.log(this.props.price);
        const order = {
            ingredients: this.props.ingredients,
            price      : this.props.price,
            customer   : {
                name: 'Sayan',
                email: 'sayan@kk.com',
                address: {
                    country: 'India'
                },
                deliveryMethod: 'fastest'
            }
        };

        axios.post('/orders.json' , order).then(response => {
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        }).catch(
            error => {
                this.setState({
                    loading: true
                });
            }
        );
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input}type="text" name="name" placeholder="your name"/>
                <Button btnType="Success" clicked={this.orderHandler}>Go!</Button>
            </form>
        );

        if(this.state.loading){
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

export default ContactData;