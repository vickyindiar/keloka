import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import authReducer from './reducers/authReducer';

//const reducers = combineReducers({authReducer}); //todo
const store = createStore(authReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;


