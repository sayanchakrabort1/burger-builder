import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.ingredientAdded}>MORE!</button>
        <button className={classes.More} onClick={props.ingredientRemoved} disabled={props.disable}>NO NO!</button>
    </div>
);

export default buildControl;