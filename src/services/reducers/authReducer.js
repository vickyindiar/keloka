import { SET_AUTH, ERR_AUTH, STOP_SPNNER } from '../types/authType';
import isEmpty from '../helper/isEmpty';

const initialState = {
    isAuthenticated : false,
    errAuthMessage:'',
    loading: true,
    user: ''
};
export default function(state = initialState, action){
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }
        case ERR_AUTH:
            return {
                ...state, 
                isAuthenticated: false,
                errAuthMessage: action.payload,
                loading: false
            }
        case STOP_SPNNER:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
