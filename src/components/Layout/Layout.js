

import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        'showSideDrawer': false
    }

    sideDrawerHandler = () => {

        this.setState( (prevState) => {
            return {'showSideDrawer': false}
        })
    };

    sideDrawerHandlerToggle = () => {
        this.setState( (prevState) => {
            return {'showSideDrawer': !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Auxillary>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        drawerToggleclicked={this.sideDrawerHandlerToggle}>
                    </Toolbar>
                    <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    clicked={this.sideDrawerHandler}>
                        SideDrawer
                    </SideDrawer>
                    <main className={classes.content}>
                        {this.props.children}
                    </main>
                </div>
            </Auxillary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);