const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const produce = require('immer').produce;
const applyMiddleware = redux.applyMiddleware;
const logger = require('redux-logger').createLogger();
const axios = require('axios');

const state = {
    loading: false,
    data: [],
    error:'',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';

const fetchUsersRequest = (url) => {
    //fetch user
    return {
        type: FETCH_USERS_REQUESTED
    }
}
const fetchUsersSuccess = (url) => {
    //fetch user
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}
const fetchUsersError = (url) => {
    //fetch user
    return {
        type: FETCH_USERS_REJECTED,
        payload: error,
    }
}

const usersReducer = (state, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return produce((state, draft) => {
                draft.loading = true;
        })
        case FETCH_USERS_REJECTED:
            return produce((state, draft) => {
                draft.loading = false;
                draft.error = draft.error;
        })
        case FETCH_USERS_SUCCEEDED:
            return produce((state, draft) => {
                draft.loading = false;
                draft.data = payload.data;
        })
    }
}