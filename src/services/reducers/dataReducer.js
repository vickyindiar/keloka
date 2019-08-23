import {  SET_TAB, 
          UPDATE_PRODUCT,
          UPDATE_SUPPLIER,
          UPDATE_CUSTOMER,
          UPDATE_BRAND,
          UPDATE_CATEGORY,
          UPDATE_QTYTYPE,
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
      case SET_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
          columns: {...action.payload.columns },
          dataSource: {...action.payload.dataSource },
          isLoading: action.payload.isLoading
        }
      case UPDATE_PRODUCT:
        return{

        }
      case UPDATE_SUPPLIER:
        return {

        }
      case UPDATE_CUSTOMER:
        return {

        }
      case UPDATE_BRAND:
        return {

        }
      case UPDATE_CATEGORY: 
        return {

        }
      case UPDATE_QTYTYPE:
          return {

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
  