import {  CHANGE_TAB, 
          GET_PRODUCT,
          GET_SUPPLIER,
          GET_CUSTOMER,
          GET_BRAND,
          GET_CATEGORY,
          GET_QTYTYPE,
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
    isLoading: true
 };
  export default function(state = initialState, action) {
    switch (action.type) {
      case CHANGE_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
          isLoading: action.payload.isLoading
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
      case TOOGLE_LOADING: 
        return{
            ...state,
            isLoading: action.payload
        }
      default:
        return state;
    }
  }
  