const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK';

function orderCake(payload) {
    return {
        type: CAKE_ORDERED,
        payload,
    }
}

function restockCake(payload) {
    return {
        type: CAKE_RESTOCK,
        payload,
    }
}

function orderIceCream(payload) {
    return {
        type: ICECREAM_ORDERED,
        payload,
    }
}

function restockIceCream(payload) {
    return {
        type: ICECREAM_RESTOCK,
        payload,
    }
}

const initialCakeState = {
    numOfCakes: 10,
}
const initialIceCreamState = {
    numOfIcecream: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload,
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream - action.payload,
            }
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer,
})
const store = createStore(rootReducer);
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log('updated cake state', store.getState()))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

actions.orderCake(1)
actions.orderIceCream(5)
actions.orderCake(1)
actions.restockCake(3)

unsubscribe()