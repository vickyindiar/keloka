import { SET_TAB } from "../types/dataType";

export const changeTabIndex = tab => dispatch => {
    let data = [];
    let dataBarang = [];
    let dataSupplier = [];
    data = tab === 1 ? dataBarang : dataSupplier;
    return dispatch({
      type: SET_TAB,
      payload: {
        tabActive: tab,
        dataConfig: data
      }
    });
  };
  