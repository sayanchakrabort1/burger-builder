import React , {Component} from 'react';
import Auxillary from '../../HOC/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../withError/withError';

const IG_PRICES = {
    salad: 20,
    bacon: 70,
    cheese: 40,
    meat:   60
}

const BASE_PRICE = 40;

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasble: true,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-be310.firebaseio.com/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            });
            this.updatePriceHandler(response.data);
        }).catch( error => error);
    }

    addIngredientHandler = (type) => {

        let oldCount    = this.state.ingredients[type];
        let newCount    = Number(oldCount) + 1;
        const imState   = { ...this.state.ingredients };
        imState[type]   = newCount;

        let price       = IG_PRICES[type]
        let oPrice      = this.state.totalPrice;
        let nPrice      = oPrice + price;

        this.setState({
            ingredients: imState,
            totalPrice: nPrice
        });

        this.updatePurchasble(imState);
    
    };

    removeIngredientHandler= (type) => {

        let oldCount    = this.state.ingredients[type];
        let newCount    = Number(oldCount) - 1;

        if( newCount < 0 )
        return '';

        const imState   = { ...this.state.ingredients };
        imState[type]   = newCount;

        let price       = IG_PRICES[type];
        let oPrice      = this.state.totalPrice;
        let nPrice      = oPrice - price;

        this.setState({
            ingredients: imState,
            totalPrice: nPrice
        });

        this.updatePurchasble(imState);
    }

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
        if(type){
            this.setState({purchasing: true});
        } else {
            this.setState({purchasing: false});
        }
    }

    purchasingHandler = () => {
        let queryParams = [];

        for( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams
        });
        // this.setState({
        //     loading: true
        // });
        // // setTimeout( () => {
        // //     alert('Order Placed');
        // // }, 500);

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price      : this.state.totalPrice,
        //     customer   : {
        //         name: 'Sayan',
        //         email: 'sayan@kk.com',
        //         address: {
        //             country: 'India'
        //         },
        //         deliveryMethod: 'fastest'
        //     }
        // };

        // axios.post('/orders.json' , order).then(response => {
        //     this.setState({
        //         loading: true,
        //         purchasing: false
        //     });
        // }).catch(
        //     error => {
        //         this.setState({
        //             loading: true,
        //             purchasing: false
        //         });
        //     }
        // );
    }

    updatePriceHandler = (ing) => {
        let price = BASE_PRICE;

        Object.keys(ing).forEach(function (key) {
            price = price + (IG_PRICES[key] * ing[key]);
        });

        this.setState({
            totalPrice: price
        })
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; 
        let burger = <Spinner></Spinner>;

        if(this.state.ingredients) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice          = {this.state.totalPrice}
                        ingredientAdded     = {this.addIngredientHandler} 
                        ingredientRemoved   = {this.removeIngredientHandler}
                        disabledInfo        = {disabledInfo}
                        purchasble          = {this.state.purchasble}
                        purchasing          = {this.purchaseHandler}
                    />
                </Auxillary>
            );

            orderSummary = <OrderSummary clicked={ () => this.purchaseHandler(false) } goClicked={this.purchasingHandler} ingredients={this.state.ingredients} totalPrice   = {this.state.totalPrice}></OrderSummary>;
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

export default withError(BurgerBuilder, axios);