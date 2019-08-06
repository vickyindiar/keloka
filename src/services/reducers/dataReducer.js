import { SET_TAB } from "../types/dataType";

const initialState = {
    tabActive: -1,
    dataConfig: []
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TAB:
        return {
          ...state,
          tabActive: action.payload.tabActive,
          dataConfig: action.payload.dataConfig
        };
      default:
        return state;
    }
  }
  