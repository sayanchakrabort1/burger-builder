import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state ={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render () {

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                <form>
                    <input className={classes.Input}type="text" name="name" placeholder="your name"/>
                    <Button btnType="Success">Go!</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;