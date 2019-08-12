import { SET_TAB } from "../types/dataType";
import axios from 'axios';

export const changeTabIndex = tab => dispatch => {
    let url = '';
    let columns;
    let token = localStorage.getItem('jwt');
    let config = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        },
     }

    if(tab === 0) { 
      url = 'http://127.0.0.1:8000/api/product'; 
      columns = [
        { id: "name", field: "name", caption: "Name", align: "center", disablePadding: true },
        { id: "brand", field: "brand", caption: "Brand", align: "center", disablePadding: false },
        { id: "price", field: "price", caption: "Price", align: "center", disablePadding: false },
        { id: "stock", field: "stock", caption: "Stock", align: "center", disablePadding: false },
        { id: "supplier", field: "supplier", caption: "Supplier", align: "center", disablePadding: false }
      ];
    } 
    axios.get(url, config).then(res =>{
        if(res.status === 200){
          dispatch({
            type: SET_TAB,
            payload: {  tabActive: tab, columns:columns, dataSource: res.data.data  }
          });
        }else{
            dispatch({ type: SET_TAB, payload: {  tabActive: tab, columns: {}, dataSource: {} }});
        }
    })
    .catch(err => {
      dispatch({ type: SET_TAB, payload: {  tabActive: tab, columns: {}, dataSource: {} }});
    });
  };
  