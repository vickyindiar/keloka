import { SET_AUTH, ERR_AUTH } from '../types/authType';
import setAuthToken from '../helper/setAuthToken';
import axios from 'axios';
//import {getErrorAuth} from '../helper/authValidation';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import isEmpty from '../helper/isEmpty';


export const setAuthentication = (decode) => {
    return {
        type: SET_AUTH,
        payload : decode 
    }
}

export const login = (user, history) => dispatch =>{
    let errMessage = '';
    let config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
    }
    axios.post('/api/login', user, config)
    .then(res =>{
            if(isEmpty(res.data)){
                errMessage = 'Data yang anda masukan tidak terdaftar !';
                dispatch({
                    type: ERR_AUTH,
                    payload: errMessage
                })
            }
            else{
                if(res.data.error === 'invalid_credentials'){
                    errMessage = 'Email Atau Password Salah !!';
                    dispatch({
                        type: ERR_AUTH,
                        payload: errMessage
                    })
                }
                else{
                    let token = `Bearer ${res.data.token}`;
                    let config = {
                        headers: {
                          Authorization: token
                          },
                    };
                   axios.get('/api/profile', config)
                    .then(d =>{
                        localStorage.setItem('jwt', token);
                        setAuthToken(token);
                        dispatch(setAuthentication(d.data.user));
                        history.push('/');
                    });
                }
            }
    })
    .catch(err => {
            dispatch({
                type: ERR_AUTH,
                payload: errMessage
            })
    });
}

export const logout = (history) => dispatch =>{
    try {
        localStorage.removeItem('jwt');
        setAuthToken();
        dispatch(setAuthentication({}));
        history.push('/');
    } catch (err) {
        dispatch({
            type: ERR_AUTH,
            payload: err
        })
    }
}