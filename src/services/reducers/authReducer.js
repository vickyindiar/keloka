import { SET_AUTH, ERR_AUTH, TOOGLE_LOADING, STOP_SPNNER } from '../types/authType';
import isEmpty from '../helper/isEmpty';

const initialState = {
    isAuthenticated : false,
    errAuthMessage:'',
    loading: false,
    spinner: true,
    user: ''
};
export default function(state = initialState, action){
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user: action.payload,
                spinner: false,
            }
        case ERR_AUTH:
            return {
                ...state, 
                isAuthenticated: false,
                errAuthMessage: action.payload,
                spinner: false
            }
        case TOOGLE_LOADING: 
            return{
                ...state,
                loading: action.payload
            }
        case STOP_SPNNER:
            return {
                ...state,
                spinner: false
            }
        default:
            return state;
    }
}
