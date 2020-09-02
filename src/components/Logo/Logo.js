import React from 'react';
import burgetLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} 
    style={{height: props.height}}>
        <img src={burgetLogo} alt='burger'/>
    </div>
);

export default logo;