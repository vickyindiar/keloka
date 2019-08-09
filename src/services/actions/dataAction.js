import { SET_TAB } from "../types/dataType";
import axios from 'axios';


export const changeTabIndex = tab => dispatch => {
    let data = [];
    let url = '';
    let token = localStorage.getItem('jwt');
    let config = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        },
     }

    if(tab === 0) { url = 'http://127.0.0.1:8000/api/product'; } 
    axios.get(tab, config).then(res =>{
        if(res.data.status === true){
          dispatch({
            type: SET_TAB,
            payload: {  tabActive: tab, dataConfig: data  }
          });
        }else{
            dispatch({ type: SET_TAB, payload: {  tabActive: tab, dataConfig: []  }});
        }
    })
    .catch(err => {
      dispatch({ type: SET_TAB, payload: {  tabActive: tab, dataConfig: []  }});
    });

 
  };
  