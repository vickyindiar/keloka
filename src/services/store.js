import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import dataReducer from './reducers/dataReducer';

const reducers = combineReducers({authReducer, dataReducer}); //todo
const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;


