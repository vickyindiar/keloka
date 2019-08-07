import React, { Component } from 'react';
import M from 'materialize-css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './component/nav/PrivateRoute';
import {setAuthenticatedUser} from './services/actions/authAction';
import isEmpty from './services/helper/isEmpty';
import { withRouter } from 'react-router-dom';

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
  }
  render() {
    const { isAuthenticated, loading } = this.props.authState.authReducer;
    return (
      <div className="App">
          { loading && <Spinner /> }
          { isAuthenticated && <Nav /> }
          <main>
            <section className="cd-section cd-selected">
              <PrivateRoute exact path='/' authenticed={isAuthenticated} component={Home}/>
              <Route path='/login' component={Auth}></Route>
              <Route path='/data' component={Data}></Route>
              <Route path='/report' component={Report}></Route>
              <Route path='/sales' component={Sales}></Route>
              <Route path='/purchase' component={Purchase}></Route>
              <Route path='/return' component={Return}></Route>
              <Route path='/setting' component={Setting}></Route>
            </section>
          </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authState : state
});
const mapDispatchToProps = (dispatch) => ({
  setAuth: (token, history) => dispatch(setAuthenticatedUser(token, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
