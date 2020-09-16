import React from 'react';
import Logo from  '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../HOC/Auxillary';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];

    if(props.show){
        attachedClasses = [classes.SideDrawer , classes.Open];
    }

    return (
        <Auxillary>
            <Backdrop show={props.show} clicked={props.clicked}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <Logo height='25%' />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Auxillary>
    );
}

export default sideDrawer;