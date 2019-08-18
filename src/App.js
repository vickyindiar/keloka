import React, { Component } from 'react';
import M from 'materialize-css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './component/nav/PrivateRoute';
import {setAuthenticatedUser} from './services/actions/authAction';
import isEmpty from './services/helper/isEmpty';
import { withRouter } from 'react-router-dom';
import { STOP_SPNNER } from './services/types/authType';

//components
import Home from './component/home/Home';
import Data from './component/data/Data';
import Report from './component/report/Report';
import Sales from './component/sales/Sales';
import Purchase  from './component/purchase/Purchase';
import Return  from './component/return/Return';
import Setting  from './component/setting/Setting';
import Auth from './component/auth/Auth';
import Nav from './component/nav/Nav';
import Spinner from './component/_lib/_spinner/Spinner';


class App extends Component {
  constructor(props){
    super(props);
    let token = localStorage.getItem('jwt');
    if(token){
      if(isEmpty(props.authState.user)){
        props.setAuth(token, props.history);
      }
    }
    else{
      props.stopSpinner();
    }
  }
  render() {
    const { isAuthenticated, spinner } = this.props.authState;
    return (
      <div className="App">
          { spinner && <Spinner /> }
          { isAuthenticated && <Nav /> }
          <main>
            <section className="cd-section cd-selected">
              <PrivateRoute exact path='/' authenticed={isAuthenticated} component={Home}/>
              <Route path='/login' component={Auth}></Route>
              <PrivateRoute authenticed={isAuthenticated} path='/data' component={Data}></PrivateRoute>
              <PrivateRoute authenticed={isAuthenticated} path='/report' component={Report}></PrivateRoute>
              <PrivateRoute authenticed={isAuthenticated} path='/sales' component={Sales}></PrivateRoute>
              <PrivateRoute authenticed={isAuthenticated} path='/purchase' component={Purchase}></PrivateRoute>
              <PrivateRoute authenticed={isAuthenticated} path='/return' component={Return}></PrivateRoute>
              <PrivateRoute authenticed={isAuthenticated} path='/setting' component={Setting}></PrivateRoute>
            </section>
          </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authState : state.authReducer
});
const mapDispatchToProps = (dispatch) => ({
  setAuth: (token, history) => dispatch(setAuthenticatedUser(token, history)),
  stopSpinner: () => dispatch({type: STOP_SPNNER, payload: false})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
