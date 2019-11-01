import { CHANGE_TAB, 
  OPEN_MODAL,
  GET_PRODUCT,
  GET_SUPPLIER,
  GET_CUSTOMER,
  GET_BRAND,
  GET_CATEGORY,
  GET_QTYTYPE,
  GET_COLOR,
  TOOGLE_LOADING
} from "../types/dataType";
import { setDataTable } from '../actions/tableAction'
import axios from 'axios';

const productsTable =  {
    url : 'http://127.0.0.1:8000/api/product', 
    urlDeleteAll : 'http://127.0.0.1:8000/api/productDeleteAll', 
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

const colorTable =  {
  url : 'http://127.0.0.1:8000/api/color',
  columns : [
    { id: "number", field: "number", caption: "No.", align: "center", disablePadding: false },
    { id: "name", field: "name", caption: "Nama", align: "center", disablePadding: true },
    { id: "desc", field: "desc", caption: "Ket.", align: "center", disablePadding: false },
  ]
}


export const changeTabIndex = tab => dispatch => {
  dispatch({ type: CHANGE_TAB, payload: { tabActive: tab } });
};

const generateNumber = (dataSource) => {
  let number = 1;
  dataSource.forEach(d => { d.number = number++; });  
  return dataSource;
}

const getAction = (index, res, columns) => {
    if(index === 0)      { return { type: GET_PRODUCT, payload: { dataSource: generateNumber(res.data.data),  columns: columns, isLoading: false  } }; } 
    else if(index === 1) { return { type: GET_SUPPLIER, payload: { dataSource: generateNumber(res.data.data), columns: columns, isLoading: false  } }; } 
    else if(index === 2) { return { type: GET_CUSTOMER, payload: { dataSource: generateNumber(res.data.data), columns: columns, isLoading: false  } }; }
    else if(index === 3) { return { type: GET_BRAND, payload: { dataSource: generateNumber(res.data.data),    columns: columns, isLoading: false  } }; }
    else if(index === 4) { return { type: GET_CATEGORY, payload: { dataSource: generateNumber(res.data.data), columns: columns, isLoading: false  } }; }
    else if(index === 5) { return { type: GET_QTYTYPE, payload: { dataSource: generateNumber(res.data.data),  columns: columns, isLoading: false  } }; }
    else if(index === 6) { return { type: GET_COLOR, payload:  { dataSource: generateNumber(res.data.data),   columns: columns, isLoading: false  } }; }
    else return {}
}

export const getData = (tab, callback) => (dispatch, getState) => {
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
     if(tab === 0) {      url = productsTable.url; columns = productsTable.columns;   } 
     else if(tab === 1) { url = suppliersTable.url; columns = suppliersTable.columns; } 
     else if(tab === 2) { url = customersTable.url; columns = customersTable.columns; }
     else if(tab === 3) { url = brandsTable.url; columns = brandsTable.columns; }
     else if(tab === 4) { url = categoriesTable.url; columns = categoriesTable.columns; }
     else if(tab === 5) { url = qtytypesTable.url; columns = qtytypesTable.columns; }
     else if(tab === 6) { url = colorTable.url; columns = colorTable.columns; }
     else { url = productsTable.url; columns = productsTable.columns; }
    axios.get(url, config).then(res =>{
        if(res.status === 200){
          dispatch({type: TOOGLE_LOADING, payload: false})
          dispatch(getAction(tab, res, columns))
          .then(callback(generateNumber(res.data.data), columns))
        }else{
          console.log('error get data !');
        }
    })
    .catch(err => {
      console.log('error get data !');
    });
}


export const storeData = (tab, param) => dispatch => {
  let url = '';
  let token = localStorage.getItem('jwt');
  let config = { headers: { Authorization: token } };
  let x = [];

  if(tab === 0) {      url = productsTable.url;  } 
  else if(tab === 1) { url = suppliersTable.url; } 
  else if(tab === 2) { url = customersTable.url; }
  else if(tab === 3) { url = brandsTable.url;    }
  else if(tab === 4) { url = categoriesTable.url;}
  else if(tab === 5) { url = qtytypesTable.url;  }
  else if(tab === 6) { url = colorTable.url;     }
  else {               url = productsTable.url;  }

   if(param.length > 0){
    for (let index = 0; index < param.length; index++) {
      x.push(axios.post(url, param[index], config));
    }
    debugger;
    axios.all(x)
    .then(
      axios.spread(function (acct, perms) {
        dispatch(getData(tab, (d, c) => setDataTable(d, c) ));
      })
    )
    .catch(err => {
      console.log('error store data !');
    })
   }
   else
   {
    axios.post(url, param, config).then(res => {
      if(res.status === 201){
        dispatch(getData(tab, (d, c) => setDataTable(d, c) ));
      }else{
        console.log('error store data !');
      }
    })
    .catch(err => {
      console.log('error store data !');
    })
   }
}


export const deleteData = (tab, param, callback ) => dispatch => {
  let url = '';
  let token = localStorage.getItem('jwt');
  let config = {
    headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
   }
   if(tab === 0) {      url = productsTable.url;  } 
   else if(tab === 1) { url = suppliersTable.url; } 
   else if(tab === 2) { url = customersTable.url; }
   else if(tab === 3) { url = brandsTable.url;    }
   else if(tab === 4) { url = categoriesTable.url;}
   else if(tab === 5) { url = qtytypesTable.url;  }
   else if(tab === 6) { url = colorTable.url;     }
   else {               url = productsTable.url;  }
   dispatch({type: TOOGLE_LOADING, payload: true})
   const deleteOne = () => {
    axios.delete(url+'/'+param[0], config).then(res => {
      if(res.status === 200){
        dispatch(getData(tab, callback));
      }else{
        console.log('error delete data !');
      }
    })
    .catch(err => {
      console.log('error delete data !');
    })
   }

   const deleteAll = () => {
    let cUrl = `${url}Deletemany`;
    axios.delete(cUrl, config).then(res => {
      if(res.status === 200){
        dispatch(getData(tab, callback));
      }else{
        console.log('error delete data !');
      }
    })
    .catch(err => {
      console.log('error delete data !');
    })
   }

   if(typeof(param) === 'object' && param.length > 1){
     config.data = param;
     deleteAll();
   }
   else{
     deleteOne();
   }   
}

export const handleOpenModal = (v) => dispatch => {
  return dispatch({ type: OPEN_MODAL, payload: v})
}


  
  