import { SET_TAB } from "../types/dataType";

const initialState = {
    tabActive: -1,
    columns: [],
    dataSource: []
 };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
          columns: {...state.columns, ...action.payload.columns },
          dataSource: {...state.dataSource, ...action.payload.dataSource }
        };
      default:
        return state;
    }
  }
  