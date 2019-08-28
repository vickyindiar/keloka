import {  CHANGE_TAB, 
          OPEN_PRODUCT,
          OPEN_SUPPLIER,
          OPEN_CUSTOMER,
          OPEN_BRAND,
          OPEN_CATEGORY,
          OPEN_QTYTYPE,
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
      case OPEN_PRODUCT:
        return{
          ...state,
          columns: {...action.payload.columns },
          dataProduct: {...action.payload.dataSource },
        }
      case OPEN_SUPPLIER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataSupplier: {...action.payload.dataSource },
        }
      case OPEN_CUSTOMER:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCustomer: {...action.payload.dataSource },
        }
      case OPEN_BRAND:
        return {
          ...state,
          columns: {...action.payload.columns },
          dataBrand: {...action.payload.dataSource },
        }
      case OPEN_CATEGORY: 
        return {
          ...state,
          columns: {...action.payload.columns },
          dataCategory: {...action.payload.dataSource },
        }
      case OPEN_QTYTYPE:
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
  