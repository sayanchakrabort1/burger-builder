import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {

    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map( (_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
        });
    }).reduce( (arr , el) => {
        return arr.concat(el);
    }, []);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ingredients.length === 0 ? 'Add few items!' : ingredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default Burger;