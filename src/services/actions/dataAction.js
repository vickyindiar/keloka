import { SET_TAB } from "../types/dataType";
import axios from 'axios';

const productsTable =  {
    url : 'http://127.0.0.1:8000/api/product', 
    columns : [
      { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
      { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
      { id: "brand", field: "brand", caption: "Merk", align: "center", disablePadding: false },
      { id: "bprice", field: "bprice", caption: "Beli", align: "center", disablePadding: false },
      { id: "sprice", field: "sprice", caption: "Jual", align: "center", disablePadding: false },
      { id: "stock", field: "stock", caption: "Stock", align: "center", disablePadding: false },
      { id: "qtytype", field: "qtytype", caption: "Satuan", align: "center", disablePadding: false },
      { id: "category", field: "category", caption: "Kategori", align: "center", disablePadding: false },
      { id: "color", field: "color", caption: "Warna", align: "center", disablePadding: false },
      { id: "supplier", field: "supplier", caption: "Pemasok", align: "center", disablePadding: false },
      { id: "image", field: "image", caption: "Gambar", align: "center", disablePadding: false },
      { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
    ]
}

const suppliersTable =  {
  url : 'http://127.0.0.1:8000/api/supplier',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "address", field: "address", caption: "Alamat", align: "center", disablePadding: false },
    { id: "city", field: "city", caption: "Kota", align: "center", disablePadding: false },
    { id: "province", field: "province", caption: "Provinsi", align: "center", disablePadding: false },
    { id: "phone", field: "phone", caption: "Telp.", align: "center", disablePadding: false },
    { id: "phone2", field: "phone2", caption: "Telp2", align: "center", disablePadding: false },
    { id: "store", field: "store", caption: "Toko", align: "center", disablePadding: false },
    { id: "photo", field: "photo", caption: "Foto", align: "center", disablePadding: false },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}

const customersTable =  {
  url : 'http://127.0.0.1:8000/api/customer',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "address", field: "address", caption: "Alamat", align: "center", disablePadding: false },
    { id: "city", field: "city", caption: "Kota", align: "center", disablePadding: false },
    { id: "province", field: "province", caption: "Provinsi", align: "center", disablePadding: false },
    { id: "phone", field: "phone", caption: "Telp.", align: "center", disablePadding: false },
    { id: "phone2", field: "phone2", caption: "Telp2", align: "center", disablePadding: false },
    { id: "store", field: "store", caption: "Toko", align: "center", disablePadding: false },
    { id: "photo", field: "photo", caption: "Foto", align: "center", disablePadding: false },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}

const brandsTable =  {
  url : 'http://127.0.0.1:8000/api/brand',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}

const categoriesTable =  {
  url : 'http://127.0.0.1:8000/api/category',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "code", field: "code", caption: "Kode", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}

const qtytypesTable =  {
  url : 'http://127.0.0.1:8000/api/qtytype',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "code", field: "code", caption: "Kode", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}


const generateNumber = (dataSource) => {
  let number = 1;
  dataSource.forEach(d => { d.number = number++; });  
  return dataSource;
}

export const changeTabIndex = tab => dispatch => {
    let columns = [];
    let url = '';
    let token = localStorage.getItem('jwt');
    let config = {
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          Authorization: token
        },
     }
    if(tab === 0) { 
<<<<<<< HEAD
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
=======
       url  = productsTable.url;
       columns = productsTable.columns;
    } 
    else if(tab === 1) { 
      url  = suppliersTable.url;
      columns = suppliersTable.columns;
>>>>>>> 4dc1a10ff713194a5489b742b8b232b5f8380a71
    } 
    else if(tab === 2){
       url  = customersTable.url;
       columns = customersTable.columns;
    }
    else if(tab === 3){
     url  = brandsTable.url;
     columns = brandsTable.columns;
    }
    else if(tab === 4){
     url  = categoriesTable.url;
     columns = categoriesTable.columns;
    }
    else if(tab === 5){
     url  = qtytypesTable.url;
     columns = qtytypesTable.columns;
    }

    axios.get(url, config).then(res =>{
        if(res.status === 200){
          dispatch({
            type: SET_TAB,
            payload: {  tabActive: tab, columns:columns, dataSource: generateNumber(res.data.data), isLoading: false  }
          });
        }else{
            dispatch({ type: SET_TAB, payload: { tabActive: tab, columns: {}, dataSource: {}, isLoading: false }});
        }
    })
    .catch(err => {
      dispatch({ type: SET_TAB, payload: {  tabActive: tab, columns: {}, dataSource: {}, isLoading: false }});
    });
  };
  