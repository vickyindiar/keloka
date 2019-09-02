import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import $ from 'jquery';
import '../../styles/sass/component/_auth.scss';
import LoadingDot from '../_lib/_spinner/LoadingDot';
import Login from './Login';
import Register from './Register';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        background: '#012A56',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
});

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
    const { classes } = this.props;
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
                                    <p> Have an Account ?</p>
                                    <Button className={classes.button} onClick={this.toogleFormInfo}>
                                        Login
                                    </Button>
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
                                    <p> Don't Have an Account ?</p>
                                    <Button className={classes.button} onClick={this.toogleFormInfo}>
                                       Sign Up
                                    </Button>
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
  
export default withStyles(styles)(connect(mapState, {})(Auth))
