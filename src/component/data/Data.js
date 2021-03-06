import React, { Component } from 'react';
import '../../styles/sass/component/_data.scss';
import Header from '../template/Header';
import SwipeableViews from "react-swipeable-views";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { connect } from "react-redux";
import { changeTabIndex, getData, deleteData } from "../../services/actions/dataAction";
import { TOOGLE_LOADING } from '../../services/types/dataType';

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
      if(this.props.dt.tabActive === -1){
        this.props.setTabActive(0);
        this.props.setDataSource(0);
      }
    }

    handleChange = (event, newValue) => {
      this.props.showLoading(); 
      this.setState({ value: newValue }, this.props.setTabActive(newValue), this.props.setDataSource(newValue)); 
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
      const { columns, dataProduct, dataSupplier, dataCustomer, dataBrand, dataCategory, dataQtytype, isLoading } = this.props.dt;
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
                <div id="tabpanel-0" aria-labelledby="tab-0" value={value}  hidden={value !== 0} index={0} key={0}  >
                  <DataTable title="Data Barang" columns={columns}  dataSource={dataProduct} isLoading={isLoading} doDelete={(selected) => { this.doDelete(selected) }}  key={0} >
                      <FormProduct title="Barang" />
                   </DataTable>
                </div>
                <div id="tabpanel-1" aria-labelledby="tab-1" value={value}  hidden={value !== 1} index={1} key={1}  >
                  <DataTable title="Data Supplier" columns={columns} dataSource={dataSupplier} isLoading={isLoading} key={1}>
                   <FormSupplier />
                  </DataTable>
                </div>
                <div id="tabpanel-2" aria-labelledby="tab-2" value={value}  hidden={value !== 2} index={2} key={2}  >
                  <DataTable title="Data Pelanggan" columns={columns} dataSource={dataCustomer} isLoading={isLoading} key={2}  />
                </div>
                <div id="tabpanel-3" aria-labelledby="tab-3" value={value}  hidden={value !== 3} index={3} key={3}  >
                  <DataTable title="Data Merk" columns={columns} dataSource={dataBrand} isLoading={isLoading} key={3}  />
                </div>
                <div id="tabpanel-4" aria-labelledby="tab-4" value={value}  hidden={value !== 4} index={4} key={4}  >
                  <DataTable title="Data Kategori" columns={columns} dataSource={dataCategory} isLoading={isLoading} key={4}  />
                </div>
                <div id="tabpanel-5" aria-labelledby="tab-5" value={value}  hidden={value !== 5} index={5} key={5}  >
                  <DataTable title="Data Satuan" columns={columns} dataSource={dataQtytype} isLoading={isLoading} key={5}  />
                </div>
              </SwipeableViews>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

const propsState = state => ({ dt : state.dataReducer });

const propsAction = dispatch => ({
 setTabActive: tab => dispatch(changeTabIndex(tab)),
 setDataSource: tab => dispatch(getData(tab)), 
 deleteDataSource: (tab, data) => dispatch(deleteData(tab, data)), 
 showLoading: () => dispatch({type: TOOGLE_LOADING, payload: true}) 
});

export default connect( propsState, propsAction )(Data);
