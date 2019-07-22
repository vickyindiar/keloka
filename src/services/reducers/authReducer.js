import { SET_AUTH, ERR_AUTH } from '../types/authType';
import isEmpty from '../helper/isEmpty';

const initialState = {
    isAuthenticated : false,
    errAuthMessage:'',
    user: ""
};
export default function(state = initialState, action){
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user: action.payload,
            }
        case ERR_AUTH:
            return {
                ...state, 
                errAuthMessage: action.payload
            }

        default:
            return state;
    }
}
