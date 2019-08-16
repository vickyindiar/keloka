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
        { id: "name", field: "name", caption: "NAMA", align: "center", disablePadding: true },
        { id: "brand", field: "brand", caption: "MERK", align: "center", disablePadding: false },

        { id: "bprice", field: "bprice", caption: "BELI", align: "center", disablePadding: false },
        { id: "sprice", field: "sprice", caption: "JUAL", align: "center", disablePadding: false },

        { id: "stock", field: "stock", caption: "STOCK", align: "center", disablePadding: false },
        { id: "qtytype", field: "qtytype", caption: "SATUAN", align: "center", disablePadding: false },

        { id: "category", field: "category", caption: "KATEGORI", align: "center", disablePadding: false },
        { id: "color", field: "color", caption: "WARNA", align: "center", disablePadding: false },
        { id: "supplier", field: "supplier", caption: "PEMASOK", align: "center", disablePadding: false },
        { id: "image", field: "image", caption: "GAMBAR", align: "center", disablePadding: false },
        { id: "desc", field: "desc", caption: "KET.", align: "center", disablePadding: false },

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
  