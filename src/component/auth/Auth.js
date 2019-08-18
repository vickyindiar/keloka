import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, register } from '../../services/actions/authAction';
import $ from 'jquery';
import { TOOGLE_LOADING } from '../../services/types/authType';
import LoadingDot from '../_lib/_spinner/LoadingDot';
import '../../styles/sass/component/_auth.scss';

export class Auth extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            email: '',
            password: '',
            role: '',
        }
    }
    componentDidMount = () => {
        const { isAuthenticated } = this.props.authState;
        if(isAuthenticated){
            this.props.history.push('/');
        }
    }
    
    handleOnSubmitLogin = (e) =>{
      e.preventDefault();
      this.props.showLoading();
      this.props.doLogin({...this.state}, this.props.history);
    }

    handleOnSubmitRegister = (e) => {
        e.preventDefault();
        this.props.showLoading();
        this.props.doRegister({...this.state}, this.props.history)
    }

    handleOnChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    toogleFormInfo = (e) => {
            $(".form-auth").toggleClass("signup"); 
    }
  render() {
    const {loading} = this.props.authState;
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
                        <div className="form-login">
                            <form onSubmit={this.handleOnSubmitLogin}>
                                <p className="title-form title-login-form"> LOGIN </p>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">person</i>
                                        <input id="email-login" type="email" name="email" className="outlined" onChange={this.handleOnChange}/>
                                        <label htmlFor="email-login">email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">lock</i>
                                        <input id="password-login" type="password" name="password" className="outlined" onChange={this.handleOnChange} />
                                        <label htmlFor="password-login">Password</label>
                                    </div>
                                    <button className="btn waves-effect light-blue darken-4" type="submit" >Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="form-signup">
                            <form onSubmit={this.handleOnSubmitRegister}>
                                <p className="title-form title-signup-form"> SIGN UP </p>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">person</i>
                                        <input id="username-signup" type="text" name="username" className="outlined" onChange={this.handleOnChange} />
                                        <label htmlFor="username-signup">Username</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">mail</i>
                                        <input id="email-signup" type="email" name="email" className="outlined"  onChange={this.handleOnChange} />
                                        <label htmlFor="email-signup">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">lock</i>
                                        <input id="password-signup" type="password" name="password" className="outlined" onChange={this.handleOnChange}/>
                                        <label htmlFor="password-signup">Password</label>
                                    </div>
                                    <input type="hidden" name="role_id" id="role_id" value="2"/>
                                    <button className="btn waves-effect light-blue darken-4" type="submit">SIGN UP</button>
                                </div>
                            </form>
                        </div>
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
  
  const mapDispatch = (dispatch) => ({
    doLogin: (user, history) => dispatch(login(user, history)),
    doRegister: (data, history) => dispatch(register(data, history)),
    showLoading: () => dispatch({type: TOOGLE_LOADING, payload: true}) 
  });
  
  export default connect(mapState, mapDispatch)(Auth)
