

import React, { Component } from 'react';
import Auxillary from '../../HOC/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                    <Toolbar drawerToggleclicked={this.sideDrawerHandlerToggle}></Toolbar>
                    <SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerHandler}>SideDrawer</SideDrawer>
                    <main className={classes.content}>
                        {this.props.children}
                    </main>
                </div>
            </Auxillary>
        );
    }
}

export default Layout;