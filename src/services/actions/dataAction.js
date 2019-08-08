import { SET_TAB } from "../types/dataType";
import axios from 'axios';

export const changeTabIndex = tab => dispatch => {
    let data = [];
    let url = '';
    let token = localStorage.getItem('jwt');
    if(tab === 0){
      url = 'http://127.0.0.1:8000/api/product';
    }

    let config = {
      headers: {
         'Accept' : 'application/json',
         'Content-Type': 'application/json',
          Authorization: token
        }
    }

    axios.get(url, config)
    .then(res =>{
        console.log(res);
      
        // dispatch({
        //   type: SET_TAB,
        //   payload: {
        //     tabActive: tab,
        //     dataConfig: data
        //   }
        // });
    });
  };
  