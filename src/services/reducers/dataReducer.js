import { SET_TAB, TOOGLE_LOADING } from "../types/dataType";

const initialState = {
    tabActive: -1,
    columns: [],
    dataSource: [],
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
        };
      case TOOGLE_LOADING: 
        return{
            ...state,
            isLoading: action.payload
        }
      default:
        return state;
    }
  }
  