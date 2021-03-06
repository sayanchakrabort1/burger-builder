import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleclicked}></DrawerToggle>
        <Logo height='80%'></Logo>
        <nav className={classes.DesktopOnly}>
            <NavigationItems 
            isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
);

export default toolbar;