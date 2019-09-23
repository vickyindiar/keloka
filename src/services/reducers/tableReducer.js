import { 
          TOOGLE_LOADING, LOAD_DATA, SELECT_ALL, 
          CHANGE_SORT, CHANGE_PAGE, CHANGE_ROW_PAGE, 
          CHANGE_FILTER, ROW_CLICK } from '../types/tableType';

const initialState = {
    title: '',
    originDataSource: [],
    dataSource: [],
    columns: [],
    order: "asc",
    orderBy: "",
    selected: [],
    selectedAll: false,
    page: 0,
    rowsPerPage: 10,
    valueSearch:'',
    selectTable: false,
    showFilter: true,
    isLoading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
      case LOAD_DATA:
        return {
          ...state, 
          columns: {...action.payload.columns },
          originDataSource: {...action.payload.data },
          dataSource: {...action.payload.data }
        }
      case SELECT_ALL:
          if (action.checked) {
              return {
                ...state,
                selected: Object.values(state.dataSource).map(n => n.id),
                selectedAll: !state.selectedAll
              }
          }
          else{
            return {
              ...state,
              selected: [],
              selectedAll: false
            }
        }
      case CHANGE_SORT: 
        const orderBy = action.payload;
        let order = "desc";
        if (state.orderBy === orderBy && state.order === order) {
          order = "asc";
        }
        return{
          ...state,
          order,
          orderBy
        }
      case CHANGE_PAGE: 
        return{
          ...state,
          page : action.payload
        }
      case CHANGE_ROW_PAGE:
          return {
            ...state,
            rowsPerPage: action.payload
        }
      case CHANGE_FILTER:
          let filtered = [];
          let cols = [];

          for(var prop in state.columns){ 
            cols.push(state.columns[prop].field);
          }
          if ( Object.values(state.originDataSource).length > 0) {
            filtered = Object.values(state.originDataSource).filter(e => {
              return Object.keys(e).some(s => {
                if (cols.includes(s)) {
                  if(e[s] === undefined || e[s] === null){  return false;  }
                  else if(typeof(e[s]) === 'object'){return e[s].name.toString().toUpperCase().includes(action.payload.toString().toUpperCase()); }
                  else{ return e[s].toString().toUpperCase().includes(action.payload.toString().toUpperCase()); }
                } else {
                  return false;
                }
              });
            });
          } else {
            filtered = [];
          }

        if(state.selectedAll){
            return{
              ...state,
              valueSearch: action.payload,
              dataSource: filtered,
              selected: Object.values(filtered).map(n => n.id)
            } 
          }
        else{
            return{
              ...state,
              valueSearch: action.payload,
              dataSource: filtered
            }
        }
      case ROW_CLICK:
          const sIndex = state.selected.indexOf(action.payload);
          let newSelected = [];
          if (sIndex === -1) newSelected = newSelected.concat(state.selected, action.payload);
          else if (sIndex === 0) newSelected = newSelected.concat(state.selected.slice(1));
          else if (sIndex === state.selected.length - 1) newSelected = newSelected.concat(state.selected.slice(0, -1));
          else if (sIndex > 0) {
            newSelected = newSelected.concat( state.selected.slice(0, sIndex), state.selected.slice(sIndex + 1) );
          }
        return {
            ...state,
            selected: [...newSelected] 
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