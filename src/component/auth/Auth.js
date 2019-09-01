import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import LoadingDot from '../_lib/_spinner/LoadingDot';
import '../../styles/sass/component/_auth.scss';

import Login from './Login';
import Register from './Register';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state ={
            isShowLogin: true
        }
    }
    componentDidMount = () => {
        const { isAuthenticated } = this.props.authState;
        if(isAuthenticated){
            this.props.history.push('/');
        }
    }

    toogleFormInfo = (e) => {
      $(".form-auth").toggleClass("signup"); 
      this.setState( {isShowLogin: !this.state.isShowLogin} );
    }
  render() {
    const { loading } = this.props.authState;
    return (
        <React.Fragment>
           <div className="container-auth">
                <div className="form-auth">
                    <div className="cont-info">
                        {
                            loading ? 
                            <div className="info-auth info-sign">
                                <div className="content">
                                    <LoadingDot nclass="auth"/>
                                </div>
                            </div>
                            :
                            <div className="info-auth info-sign">
                                <div className="content">
                                    <p> Have an Account</p>
                                    <a role="button" className="btn waves-effect light-blue darken-4" onClick={this.toogleFormInfo}>Login</a>
                                </div>
                             </div>
                        }
                        {
                            loading ? 
                            <div className="info-auth info-signup">
                                <div className="content">
                                   <LoadingDot nclass="auth"/>
                                </div>
                            </div>
                            :
                            <div className="info-auth info-signup">
                                <div className="content">
                                    <p> Don't Have an Account</p>
                                    <a className="btn waves-effect light-blue darken-4" onClick={this.toogleFormInfo}>Sign Up</a>   
                                </div>
                            </div>
                        }
                    </div> 
                    <div className="cont-form">
                        {
                            this.state.isShowLogin ? 
                            (
                                <div className="form-login">
                                    <Login />
                                </div>
                            )
                            :
                            (
                                <div className="form-signup">
                                    <Register />
                                </div>
                            )
                        }
                    </div> 
                </div>
             </div>
        </React.Fragment>
    )
  }
}

const mapState = (state) => ({
    authState: state.authReducer
});
  
export default connect(mapState, {})(Auth)
