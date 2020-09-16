import React , {Component} from 'react';
import Auxillary from '../../HOC/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../withError/withError';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/actionHead';

// const IG_PRICES = {
//     salad: 20,
//     bacon: 70,
//     cheese: 40,
//     meat:   60
// }

// const BASE_PRICE = 40;

class BurgerBuilder extends Component {

    state = {
        totalPrice: 0,
        purchasble: true,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        this.props.onInItIngredients()
    }

    // addIngredientHandler = (type) => {

    //     let oldCount    = this.state.ingredients[type];
    //     let newCount    = Number(oldCount) + 1;
    //     const imState   = { ...this.state.ingredients };
    //     imState[type]   = newCount;

    //     let price       = IG_PRICES[type]
    //     let oPrice      = this.state.totalPrice;
    //     let nPrice      = oPrice + price;

    //     this.setState({
    //         ingredients: imState,
    //         totalPrice: nPrice
    //     });

    //     this.updatePurchasble(imState);
    
    // };

    // removeIngredientHandler= (type) => {

    //     let oldCount    = this.state.ingredients[type];
    //     let newCount    = Number(oldCount) - 1;

    //     if( newCount < 0 )
    //     return '';

    //     const imState   = { ...this.state.ingredients };
    //     imState[type]   = newCount;

    //     let price       = IG_PRICES[type];
    //     let oPrice      = this.state.totalPrice;
    //     let nPrice      = oPrice - price;

    //     this.setState({
    //         ingredients: imState,
    //         totalPrice: nPrice
    //     });

    //     this.updatePurchasble(imState);
    // }

    updatePurchasble = (imState) => {
        const ig = {...imState};
        
        let sum  = Object.keys(ig).map( igKey => {
            return ig[igKey];
        }).reduce( (sum , el) => {
            return sum + el;
        });

        console.log(sum);
        this.setState({
            purchasble: sum > 0
        })
    }

    purchaseHandler = (type = true) => {

        if( this.props.isAuthenticated ){
            if(type){
                this.setState({purchasing: true});
            } else {
                this.setState({purchasing: false});
            }
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchasingHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render () {
        console.log(this.props.ingredients);
        const disabledInfo = {
            ...this.props.ingredients
        };

        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; 
        let burger = <Spinner></Spinner>;

        if(this.props.ingredients) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        totalPrice          = {this.props.price}
                        ingredientAdded     = {this.props.onIngredientAdded} 
                        ingredientRemoved   = {this.props.onIngredientRemoved}
                        disabledInfo        = {disabledInfo}
                        purchasble          = {this.state.purchasble}
                        purchasing          = {this.purchaseHandler}
                        isAuth              = {this.props.isAuthenticated}
                    />
                </Auxillary>
            );

            orderSummary = <OrderSummary clicked={ () => this.purchaseHandler(false) } goClicked={this.purchasingHandler} ingredients={this.props.ingredients} totalPrice   = {this.props.price}></OrderSummary>;
        }

        if(this.state.loading){
            orderSummary = <Spinner></Spinner>;
        }


        return (
        <Auxillary>
            <Modal show={this.state.purchasing} clicked={ () => {this.purchaseHandler(false)}}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxillary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInItIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withError(BurgerBuilder, axios));