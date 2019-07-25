import { SET_AUTH, ERR_AUTH } from '../types/authType';
import setAuthToken from '../helper/setAuthToken';
import axios from 'axios';

export const setAuthentication = (decode) => {
    return { 
        type: SET_AUTH,
        payload : decode 
    }
}

export const register = (data, history) => dispatch => {
    let config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
    }
    let paramaters = {
        "name" : data.username,
        "email": data.email,
        "password": data.password,
        "role_id": 2,
        "address": 'bekasi',
        "phone": '08123456789'
    }
    axios.post('http://127.0.0.1:8000/api/register', paramaters, config)
    .then(res => {
        if(res.data.status){
            let token = `Bearer ${res.data.data.token}`;
            localStorage.setItem('jwt', token);
            localStorage.setItem('jwt', res.data.user);
            setAuthToken(token);
            dispatch(setAuthentication(res.data.user));
            history.push('/');
        }
        else{
            dispatch({ type: ERR_AUTH, payload: res.data.msg });
        }
    })
    .catch(err => {
        dispatch({ type: ERR_AUTH, payload: err });
    });
}

export const login = (data, history) => dispatch =>{
    let config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
          },
    }
    let paramaters = {
        "email": data.email,
        "password": data.password,
    }
    axios.post('http://127.0.0.1:8000/api/login', paramaters, config)
    .then(res =>{
        if(res.data.status){
            let token = `Bearer ${res.data.token}`;
            localStorage.setItem('jwt', token);
            localStorage.setItem('user', res.data.user);
            setAuthToken(token);
            dispatch(setAuthentication(res.data.user));
            history.push('/');
        }
        else{
            dispatch({ type: ERR_AUTH, payload: res.data.msg });
        }
    })
    .catch(err => {  
          dispatch({ type: ERR_AUTH, payload: err });
    });
}

export const logout = (history) => dispatch =>{
    try {
        axios.post('http://127.0.0.1:8000/api/logout')
        .then(res =>{
            if(res.data.status){
                localStorage.removeItem('jwt');
                setAuthToken();
                dispatch(setAuthentication({}));
                history.push('/login');
            }else{
                dispatch({ type: ERR_AUTH, payload: res.data.msg });
            }
        })
        .catch(err => {
            dispatch({ type: ERR_AUTH, payload: err });
        });
    } catch (err) {
        dispatch({ type: ERR_AUTH, payload: err.message });
    }
}