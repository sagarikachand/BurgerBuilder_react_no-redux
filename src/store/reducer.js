import * as actionTypes from './action'


const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const INGREDIENTS_PRICE = {
        salad: 0.5,
        meat: 0.7,
        bacon: 0.6,
        cheese: 0.6
    }

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]

            }
            break;

        case actionTypes.REMOVE_INGREDIENT:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }

            }
            break;

        default:

            return {
                  ...state
            }
            break;
    }

}


export default reducer;