import * as actionTypes from '../actions/actionTypes';

const BASE_PRICE = 40;

const initialState = {
    ingredients: null,
    totalPrice: BASE_PRICE,
    error: false,
    building: false
};

const IG_PRICES = {
    salad: 20,
    bacon: 70,
    cheese: 40,
    meat:   60
}

const reducer = (state = initialState, action) => {
    console.log('[reducer]',action);
    let ingName = action.ingredientName;

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingName]: state.ingredients.[ingName] + 1
                },
                totalPrice: state.totalPrice + IG_PRICES[ingName],
                building: true
            };
        
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingName]: state.ingredients.[ingName] - 1
                },
                totalPrice: state.totalPrice - IG_PRICES[ingName],
                building: true
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: BASE_PRICE,
                error: false,
                building: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }
        

        default:
            return state;
    }
};

export default reducer;