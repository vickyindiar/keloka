import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../services/actions/authAction';
import $ from 'jquery';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: ''
        }
    }
    componentDidMount = () => {
        const { isAuthenticated } = this.props.authState;
        if(isAuthenticated){
            this.props.history.push('/');
        }
    }
    
    handleOnSubmit = (e) =>{
        e.preventDefault();
        this.props.doLogin({...this.state}, this.props.history);
    }

    handleOnChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    toogleFormInfo = (e) => {
            $(".form-auth").toggleClass("signup"); 
    }
  render() {

    const {email, password } = this.state;
    return (
        <React.Fragment>
           <div className="container-auth">

                <div className="form-auth">
                    <div className="cont-info">
                        <div className="info-auth info-sign">
                            <div className="content">
                                <p> Have an Account</p>
                                <a className="btn waves-effect" onClick={this.toogleFormInfo}>Login</a>
                            </div>
                        </div>
                        <div className="info-auth info-signup">
                            <div className="content">
                                <p> Don't Have an Account</p>
                                <a className="btn waves-effect" onClick={this.toogleFormInfo}>Sign Up</a>   
                            </div>
                        </div>
                    </div> 
                    <div className="cont-form">
                        <p className="title-form title-login-form"> LOGIN </p>
                        <div className="form-login">
                         
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">person</i>
                                    <input id="username" type="text" className="outlined" />
                                    <label htmlFor="usernmae">Username</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="outlined" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <a className="btn waves-effect">Login</a>
                            </div>
                        </div>
                        <div className="form-signup">
                        <p className="title-form title-signup-form"> SIGN UP </p>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" type="text" className="outlined" />
                                    <label htmlFor="usernmae">Username</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="outlined" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="password-verify" type="password" className="outlined" />
                                    <label htmlFor="password-verify">Verrify Password</label>
                                </div>
                                <a className="btn waves-effect">SIGN UP</a>
                            </div>
                        </div>
                    </div> 
                </div>


            {/* <div className="card z-depth-2 login-form hoverable">
                <div className="card-title align-center">
                 <span>Login</span>
                </div>
                <div className="card-content">
                    <form onSubmit={this.handleOnSubmit}>
                        <div className="row">
                            <div className="col s12">
                                <div className="input-field">
                                    <i className="prefix">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" width="30" height="30">
                                        <title>Identity</title>
                                        <desc>A color styled icon from Orion Icon Library.</desc>
                                        <path data-name="layer3" fill="#fff" d="M54 10v6h-8v-6H18v6h-8v-6H2v50h60V10h-8z"></path>
                                        <path data-name="layer2" d="M34 46.9c4-.9 4-2.3 4-3.3v-1.5a9.3 9.3 0 0 1-2.9-6.9v-4.5a7 7 0 0 1 13.9 0v4.5a9.3 9.3 0 0 1-3 6.9v1.5c0 .9 0 2.4 4.1 3.3S54 52 54 52H30a5.1 5.1 0 0 1 4-5.1z"
                                        fill="#a5d0ec"></path>
                                        <path data-name="layer1" fill="#f27e7c" d="M10 4h8v12h-8zm36 0h8v12h-8z"></path>
                                        <path fill="#000064" d="M50 16v3h-7v-9h3v6h4zm-36 0v4H8v37h54v3H2V10h8v6h4z" data-name="opacity" opacity=".15"></path>
                                        <path data-name="stroke" d="M34 46.9c4-.9 4-2.3 4-3.3v-1.5a9.3 9.3 0 0 1-2.9-6.9v-4.5a7 7 0 0 1 13.9 0v4.5a9.3 9.3 0 0 1-3 6.9v1.5c0 .9 0 2.4 4.1 3.3S54 52 54 52H30a5.1 5.1 0 0 1 4-5.1z"
                                        fill="none" stroke="#2e4369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        <path data-name="stroke" fill="none" stroke="#2e4369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 10H2v50h60V10h-8m-36 0h28"></path>
                                        <path data-name="stroke" fill="none" stroke="#2e4369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 4h8v12h-8zm36 0h8v12h-8zM26 25H10m10 8H10m14 8H10"></path>
                                    </svg>
                                    </i>
                                    <input type="email" id="input-email" name="email" value={email} onChange={this.handleOnChange}/>
                                    <label htmlhtmlFor="input-email"> Email </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className="input-field">
                                    <i className="prefix">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" width="30" height="30">
                                            <title>Password</title>
                                            <desc>A color styled icon from Orion Icon Library.</desc>
                                            <path data-name="layer2" d="M62 53.5a8.5 8.5 0 0 1-8.6 8.5H10.5A8.5 8.5 0 0 1 2 53.5v-43A8.5 8.5 0 0 1 10.5 2h42.9a8.5 8.5 0 0 1 8.6 8.5z" fill="#96abd1"></path>
                                            <path data-name="opacity" d="M53.4 2H10.5a8.5 8.5 0 0 0-8.4 6.9A8.5 8.5 0 0 1 8.5 6h42.9a8.5 8.5 0 0 1 8.5 8.5v43a8.6 8.6 0 0 1-.2 1.6 8.5 8.5 0 0 0 2.2-5.7v-43A8.5 8.5 0 0 0 53.4 2z" fill="#fff" opacity=".5"></path>
                                            <path data-name="layer1" d="M38.5 48h-13l2.2-17.1a9 9 0 1 1 8.7 0z" fill="#4768a3"></path>
                                            <path data-name="opacity" d="M41 23a9 9 0 0 0-15.4-6.3A9 9 0 0 1 38 25c0 3.4-.9 4.5-3.7 6l.9 17h3.3l-2.2-17.1A9 9 0 0 0 41 23z" fill="#000028" opacity=".25"></path>
                                            <path data-name="stroke" d="M38.5 48l-2.2-17.1a9 9 0 1 0-8.7 0L25.5 48z" fill="none" stroke="#2e4369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            <path data-name="stroke" d="M62 53.5a8.5 8.5 0 0 1-8.5 8.5H10.6A8.5 8.5 0 0 1 2 53.5v-43A8.5 8.5 0 0 1 10.6 2h42.9a8.5 8.5 0 0 1 8.5 8.5z" fill="none" stroke="#2e4369" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </i>
                                    <input type="password" id="input-password" name="password" value={password} onChange={this.handleOnChange}/>
                                    <label htmlhtmlFor="input-password"> Password </label>
                                </div>
                            </div>
                        </div>
                        { this.props.authState.errAuthMessage && 
                            <div className="row">
                                <span>{this.props.authState.errAuthMessage}</span>
                            </div>
                        }
                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect waves-light btn-submit-login" type="submit" name="action">
                                    Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                   </form>
                </div>
            </div> */}
        </div>
        </React.Fragment>
    )
  }
}
const mapState = (state) => ({
    authState: state
  });
  
  const mapDispatch = (dispatch) => ({
    doLogin: (user, history) => dispatch(login(user, history))
  });
  
  export default connect(mapState, mapDispatch)(Login)
