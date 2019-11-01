import { LOAD_DATA, SELECT_ALL, CHANGE_SORT, 
         CHANGE_PAGE, CHANGE_ROW_PAGE, CHANGE_FILTER,
         ROW_CLICK, RESELECT, UPDATE_FORM 
        } from '../types/tableType'

export const setDataTable = (data, columns) => dispatch => {
    return dispatch({type: LOAD_DATA, payload: { data, columns }});
}

export const selectAll = (checked) => dispatch => {
    return dispatch({type: SELECT_ALL, checked });
}

export const reSelect = (checked) => dispatch => {
    return dispatch({type: RESELECT, checked});
}

export const handleSort = (p) => dispatch => {
    return dispatch({type: CHANGE_SORT, payload: p});
}

export const handlePage = (p) => dispatch => {
    return dispatch({type: CHANGE_PAGE, payload: p});
}

export const handleRowPage = (p) => dispatch => {
    return dispatch({type: CHANGE_ROW_PAGE, payload: p});
}

export const handleFilter = (p) => dispatch => {
    return dispatch({type: CHANGE_FILTER, payload: p});
}

export const handleRowClick = (p) => dispatch => {
    return dispatch({type: ROW_CLICK, payload: p});
}

export const updateForm = (p) => dispatch => {
    return dispatch({type: UPDATE_FORM, payload: p });
}

