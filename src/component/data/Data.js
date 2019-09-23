import React, { Component } from 'react';
import '../../styles/sass/component/_data.scss';
import Header from '../template/Header';
import SwipeableViews from "react-swipeable-views";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { connect } from "react-redux";
import { changeTabIndex, getData, deleteData } from "../../services/actions/dataAction";
import { setDataTable } from '../../services/actions/tableAction';

import { TOOGLE_LOADING } from '../../services/types/dataType';
import LoadingDot from "../_lib/_spinner/LoadingDot";
import DataTable from "../_lib/_table/DataTable";
import FormProduct from './FormProduct';
import FormSupplier from './FormSupplier';

export class Data extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
      };
    }

    componentDidMount = () =>{
      if(this.props.dR.tabActive === -1){
        this.props.showLoading();
        this.props.setTabActive(0);
        this.props.getData(0, (d, c) => this.props.setDataTable(d, c) );
      }
    }

    handleChange = (event, newValue) => {
      this.props.showLoading(); 
      this.setState({ value: newValue }, 
        this.props.setTabActive(newValue),
        this.props.getData(newValue, (d, c) => this.props.setDataTable(d, c))
      ); 
    };

    handleChangeIndex = index => { this.setState({ value: index }); };

    doDelete = (selected) => {
      let paramater = '';
      if(selected.length === 1){ paramater = Number(selected[0]); } //delete One
      else if(selected.length > 1) { //delete all
        paramater = {
          id: [...selected]
        }
      }
      this.props.deleteDataSource(this.props.dt.tabActive, paramater);
    }



    render() {
      const { value } = this.state;
      const { isLoading } = this.props.dR;

      const loadElement = (load, value, tab) =>{
        if(load){
          return ( <LoadingDot nclass="data-table"/> )
        }
        else{
          if(tab === 0){
            return (value === tab) && ( 
              <DataTable title="Data Barang" key={tab} >
                <FormProduct />
              </DataTable>
               )
          }
          else{
            return (value === tab) && ( 
              <DataTable title="Data Barang" key={tab} >
                <FormProduct />
              </DataTable>
               )
          }
        }
      }


    return (
      <React.Fragment>
      <div className="content-container data">
        <Header />
        <div className="content-data">
          <div  className="tab-data">
              <AppBar position="static" color="default">
                <Tabs value={value} onChange={this.handleChange.bind(this)} variant="fullWidth" >
                  <Tab label="Barang" id="tab-0" aria-controls="tabpanel-0" />
                  <Tab label="Supplier" id="tab-1" aria-controls="tabpanel-1" />
                  <Tab label="Pelanggan" id="tab-2" aria-controls="tabpanel-2" />
                  <Tab label="Merk" id="tab-3" aria-controls="tabpanel-3" />
                  <Tab label="Kategori" id="tab-4" aria-controls="tabpanel-4" />
                  <Tab label="Satuan" id="tab-5" aria-controls="tabpanel-5" />
                </Tabs>
              </AppBar>
              <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
                <div id="tabpanel-0" aria-labelledby="tab-0" value={value}  hidden={value !== 0} index={0} key={0} >
                  {
                    loadElement(isLoading, value, 0)
                  }
                </div>
                <div id="tabpanel-1" aria-labelledby="tab-1" value={value}  hidden={value !== 1} index={1} key={1}  >
                  {
                    loadElement(isLoading, value, 1)
                  }
                </div>
                <div id="tabpanel-2" aria-labelledby="tab-2" value={value}  hidden={value !== 2} index={2} key={2}  >
                  {
                    loadElement(isLoading, value, 2)
                  }
                </div>
                <div id="tabpanel-3" aria-labelledby="tab-3" value={value}  hidden={value !== 3} index={3} key={3}  >
                  {
                    loadElement(isLoading, value, 3)
                  }
                </div>
                <div id="tabpanel-4" aria-labelledby="tab-4" value={value}  hidden={value !== 4} index={4} key={4}  >
                  {
                    loadElement(isLoading, value, 4)
                  }
                </div>
                <div id="tabpanel-5" aria-labelledby="tab-5" value={value}  hidden={value !== 5} index={5} key={5}  >
                  {
                    loadElement(isLoading, value, 5)
                  }
                </div>
              </SwipeableViews>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

const propsState = state => ({ 
  dR: state.dataReducer,
  tR: state.tableReducer 
});

const propsAction = dispatch => ({
 setTabActive: tab => dispatch(changeTabIndex(tab)),
 getData: (tab, callback) => dispatch(getData(tab, callback)), 
 setDataTable: (data, columns) => dispatch(setDataTable(data, columns)),
 deleteDataSource: (tab, data) => dispatch(deleteData(tab, data)), 
 showLoading: () => dispatch({type: TOOGLE_LOADING, payload: true}) 
});

export default connect( propsState, propsAction )(Data);
