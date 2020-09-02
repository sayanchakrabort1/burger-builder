import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Auxillary from '../HOC/Auxillary';
import Axios from '../axios-orders';

const withError = (WrappedComponent , axios) => {
    return class extends Component {

        state = {
            error: null
        }

        errorConfirmHandler = () => {
            this.setState({
                error: null
            });   
        }

        componentWillMount () {
            Axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;   
            });
            Axios.interceptors.response.use(res => res , error => {
                this.setState({
                    error: error
                });
            });
        }

        render () {
            return (
                <Auxillary>
                    <Modal show={this.state.error}
                    clicked={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            )
        }
        
    };
}

export default withError;