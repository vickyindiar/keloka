import {  CHANGE_TAB,
          OPEN_MODAL, 
          
          GET_PRODUCT,
          GET_SUPPLIER,
          GET_CUSTOMER,
          GET_BRAND,
          GET_CATEGORY,
          GET_QTYTYPE,
          GET_COLOR,

          STORE_PRODUCT,
          STORE_SUPPLIER,
          STORE_CUSTOMER,
          STORE_BRAND,
          STORE_CATEGORY,
          STORE_QTYTYPE,
          STORE_COLOR,
          TOOGLE_LOADING } from "../types/dataType";

const initialState = {
    tabActive: -1,
    columns: [],
    dataProduct : [],
    dataSupplier: [],
    dataCustomer: [],
    dataBrand: [],
    dataCategory: [],
    dataQtytype: [],
    dataColor: [],
    isLoading: false,

    openModal: false,
 };
  export default function(state = initialState, action) {
    switch (action.type) {
      case CHANGE_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
        }
      case OPEN_MODAL:
        return {
          ...state,
          openModal: action.payload
        }
      case GET_PRODUCT:
        return{
          ...state,
          columns: {...action.payload.columns },
          dataProduct: {...action.payload.dataSource },
        }
      case GET_SUPPLIER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataSupplier: {...action.payload.dataSource },
        }
      case GET_CUSTOMER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCustomer: {...action.payload.dataSource },
        }
      case GET_BRAND:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataBrand: {...action.payload.dataSource },
        }
      case GET_CATEGORY: 
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCategory: {...action.payload.dataSource },
        }
      case GET_QTYTYPE:
          return {
            ...state,
            columns: {...action.payload.columns },
            dataQtytype: {...action.payload.dataSource },
          }
      case GET_COLOR:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataColor: {...action.payload.dataSource,  },
        }
      

      case STORE_PRODUCT:
        return{
          ...state,
          dataProduct: Object.assign(state.dataProduct, action.payload)
        }
      case STORE_SUPPLIER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataSupplier: {...action.payload.dataSource },
        }
      case STORE_CUSTOMER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCustomer: {...action.payload.dataSource },
        }
      case STORE_BRAND:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataBrand: {...action.payload.dataSource },
        }
      case STORE_CATEGORY: 
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCategory: {...action.payload.dataSource },
        }
      case STORE_QTYTYPE:
          return {
            ...state,
            columns: {...action.payload.columns },
            dataQtytype: {...action.payload.dataSource },
          }
      case STORE_COLOR:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataColor: {...action.payload.dataSource },
        }

      case TOOGLE_LOADING: 
        return{
            ...state,
            isLoading: action.payload
        }
      default:
        return state;
    }
  }
  