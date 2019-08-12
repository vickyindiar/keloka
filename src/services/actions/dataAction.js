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
        { id: "name", field: "name", caption: "Dessert (100g serving)", align: "left", disablePadding: true },
        { id: "brand", field: "brand", caption: "Brand", align: "left", disablePadding: false },
        { id: "price", field: "price", caption: "Price", align: "right", disablePadding: false },
        { id: "stock", field: "stock", caption: "Stock", align: "right", disablePadding: false },
        { id: "supplier", field: "supplier", caption: "Supplier", align: "left", disablePadding: false }
      ];
    } 
    axios.get(url, config).then(res =>{
        if(res.status === 200){
          dispatch({
            type: SET_TAB,
            payload: {  tabActive: tab, columns:columns, dataSource: res.data.data  }
          });

          // dispatch({
          //   type: SET_TAB,
          //   payload: {  tabActive: tab, columns: res.data.columns, dataSource: res.data.data  }
          // });
        }else{
            dispatch({ type: SET_TAB, payload: {  tabActive: tab, columns: {}, dataSource: {} }});
        }
    })
    .catch(err => {
      dispatch({ type: SET_TAB, payload: {  tabActive: tab, columns: {}, dataSource: {} }});
    });
  };
  