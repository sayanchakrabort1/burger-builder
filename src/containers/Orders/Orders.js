import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withError from '../../withError/withError';
import * as actions from '../../store/actions/actionHead';
import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render () {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
                ))}
                
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
}

export default connect(mapStateToProps , mapDispatchToProps)(withError(Orders , axios));