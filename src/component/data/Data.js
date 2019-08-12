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

    handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    handleChangeIndex = index => {
      this.setState({ value: index }, this.props.setTabActive(index));
    };

    componentDidMount = () =>{
      if(this.props.dt.dataReducer.tabActive === -1){
        this.props.setTabActive(0);
      }
    }
    render() {
      const { value } = this.state;
      const { columns, dataSource } = this.props.dt.dataReducer;
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
                  <Tab label="Kategori" id="tab-3" aria-controls="tabpanel-3" />
                  <Tab label="Satuan" id="tab-4" aria-controls="tabpanel-4" />
                </Tabs>
              </AppBar>
              <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
                <div id="tabpanel-0" aria-labelledby="tab-0" value={value}  hidden={value !== 0} index={0}  >
                  <DataTable title={'Data Barang'} columns={columns} dataSource={dataSource} />
                </div>
                <div id="tabpanel-1" aria-labelledby="tab-1"  value={value} hidden={value !== 1} index={1} >
                  {/* <DataTable dataConfig={this.props.data} /> */}
                </div>
                <div id="tabpanel-2" aria-labelledby="tab-2"  value={value} hidden={value !== 2} index={2} >
                  z
                </div>
                <div id="tabpanel-3" aria-labelledby="tab-3"  value={value} hidden={value !== 3} index={3} >
                  a
                </div>
                <div id="tabpanel-4" aria-labelledby="tab-4"  value={value} hidden={value !== 4} index={4} >
                  b
                </div>
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
