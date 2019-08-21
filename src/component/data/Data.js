import React, { Component } from 'react';
import '../../styles/sass/component/_data.scss';
import Header from '../template/Header';
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { changeTabIndex } from "../../services/actions/dataAction";
import DataTable from "../_lib/_table/DataTable";

export class Data extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
      };
    }

    componentDidMount = () =>{
      if(this.props.dt.dataReducer.tabActive === -1){
        this.props.setTabActive(0);
      }
    }

    handleChange = (event, newValue) => {
      this.setState({ value: newValue }, this.props.setTabActive(newValue));
    };

    handleChangeIndex = index => {
      this.setState({ value: index });
    };

    createTabList = (value, columns, dataSource, isLoading) => {
      let title = ['Barang', 'Supplier', 'Pelanggan', 'Merk', 'Kategori', 'Satuan']
      let tab = [];
      for (let index = 0; index < 6; index++) {
        if(value === index){
          tab.push( 
            <div id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} value={value}  hidden={value !== index} index={index} key={index}  >
              <DataTable title={`Data ${title[index]}`} columns={columns} dataSource={dataSource} isLoading={isLoading} key={index}  />
            </div>
          );
        }
        else
        {
          tab.push( 
            <div id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} value={value}  hidden={value !== index} index={index} key={index}  >
              <DataTable title={`Data ${title[index]}`} columns={[]} dataSource={[]} isLoading={isLoading} key={index}  />
            </div>
          );
        }
     }
      return tab;
    }

    render() {
      const { value } = this.state;
      const { columns, dataSource, isLoading } = this.props.dt.dataReducer;
    return (
      <React.Fragment>
        <div className="content-container data">
        <Header />
        <div className="content-data">
          <div  className="tab-data">
              <AppBar position="static" color="default">
                <Tabs value={value} onChange={this.handleChange} variant="fullWidth" >
                  <Tab label="Barang" id="tab-0" aria-controls="tabpanel-0" />
                  <Tab label="Supplier" id="tab-1" aria-controls="tabpanel-1" />
                  <Tab label="Pelanggan" id="tab-2" aria-controls="tabpanel-2" />
                  <Tab label="Merk" id="tab-3" aria-controls="tabpanel-3" />
                  <Tab label="Kategori" id="tab-4" aria-controls="tabpanel-4" />
                  <Tab label="Satuan" id="tab-5" aria-controls="tabpanel-5" />
                </Tabs>
              </AppBar>
              <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
                {
                    this.createTabList(value, columns, dataSource, isLoading)
                }
              </SwipeableViews>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

const propsState = state => ({ dt : state });

const propsAction = dispatch => ({
 setTabActive: tab => dispatch(changeTabIndex(tab))
});

export default connect( propsState, propsAction )(Data);
