import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat:   0
    },
    totalPrice: 40
};

const IG_PRICES = {
    salad: 20,
    bacon: 70,
    cheese: 40,
    meat:   60
}

const reducer = (state = initialState, action) => {

    let ingName = action.ingredient;

    if(ingName === undefined)
        return state;

    switch( action.type ){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingName]: state.ingredients.[ingName] + 1
                },
                totalPrice: state.totalPrice + IG_PRICES[ingName]
            };
        
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingName]: state.ingredients.[ingName] - 1
                },
                totalPrice: state.totalPrice - IG_PRICES[ingName]
            };

        default:
            return state;
    }
};

export default reducer;