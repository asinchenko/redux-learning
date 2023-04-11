const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const produce = require('immer').produce;
const applyMiddleware = redux.applyMiddleware;
const logger = require('redux-logger').createLogger();
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;



const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';

const fetchUsersRequest = () => {
    //fetch user
    //jsonplaceholder.typicode.com/users
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSuccess = (users) => {
    //fetch user
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}
const fetchUsersError = (error) => {
    //fetch user
    return {
        type: FETCH_USERS_REJECTED,
        payload: error,
    }
}

const initialState = {
    loading: false,
    data: [],
    error:'',
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return produce(state, (draft) => {
                draft.loading = true;
        })
        case FETCH_USERS_REJECTED:
            return produce(state, (draft) => {
                draft.loading = false;
                draft.error = action.payload;
        })
        case FETCH_USERS_SUCCEEDED:
            return produce(state, (draft) => {
                draft.loading = false;
                draft.data = action.payload;
        })
        default:
            return state
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map((user) => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch((error) => {
                dispatch(fetchUsersError(error.message))
            })
    }
}

const store = createStore(usersReducer, applyMiddleware(thunkMiddleware, logger))

store.subscribe(() => {})

store.dispatch(fetchUsers())