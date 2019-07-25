import React, { Component } from 'react';
import M from 'materialize-css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './component/nav/PrivateRoute';
import {setAuthentication} from './services/actions/authAction';

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


class App extends Component {
  constructor(props){
    super(props);
    let token = localStorage.getItem('jwt');
    this.props.setAuth(token);
  }
  render() {
    const isAuthenticated = (localStorage.getItem('jwt'));
    return (
      <div className="App">
          { isAuthenticated && <Nav /> }
          <main>
              <section className="cd-section cd-selected">
                <PrivateRoute exact path='/' component={Home}/>
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
  setAuth: user => dispatch(setAuthentication(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
