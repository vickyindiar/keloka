import { SET_TAB } from "../types/dataType";

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
      default:
        return state;
    }
  }
  