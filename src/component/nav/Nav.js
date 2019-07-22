import React, { Component } from 'react';
import { logout } from '../../services/actions/authAction';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

export class Nav extends Component {
  handleLogout = () =>{
      this.toggleNav(false);
      this.props.doLogout(this.props.history);
  }

  handleNavClick = (e) => {
    let { className } = e.currentTarget;
    if(className === 'cd-nav-trigger'){
      e.preventDefault();
      this.toggleNav(true);
    }
    else if( className === 'cd-close-nav' || className.includes('cd-overlay')) {
      e.preventDefault();
      this.toggleNav(false);
    }
    else if(className === 'cd-selected' || className === "a-nav"){
        this.toggleNav(false);
    }

  }

  toggleNav = (bool) => {
    $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
    $('main').toggleClass('scale-down', bool);
  }

  render() {
    return (
      <React.Fragment>
          <a href="#cd-nav" className="cd-nav-trigger" onClick={this.handleNavClick}>
            Menu<span className="nav-icon"></span>
          </a>
          <div className="cd-nav-container" id="cd-nav">
              <header>
                <h3>Navigation</h3>
                <a href="#0" className="cd-close-nav" onClick={this.handleNavClick} > Close</a>
              </header>
                <ul className="cd-nav" >
                   
                    <li className="nav-li nav-index">
                      <NavLink exact to='/' className="a-nav" activeClassName="cd-selected"  onClick={this.handleNavClick}>
                        <span>
                          <svg className="nc-icon outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px">
                              <title>House</title>
                              <desc>A flat styled icon from Orion Icon Library.</desc>
                              <path data-name="layer1" d="M54 25.267l7.555 7.3a.25.25 0 0 1-.174.43H54V61H40V43H24v18H10V33H2.618a.25.25 0 0 1-.174-.43L32 4l13 12.567V11h9z" fill="#929fbd"></path>
                              <path data-name="opacity" d="M33 4.966L32 4 2.445 32.57a.25.25 0 0 0 .174.43H10v28h14V43h9z" fill="#000064" opacity=".15"></path>
                            </svg>
                        </span>
                        <em>Beranda</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-data" >
                      <NavLink to='/data' className="a-nav" activeClassName="cd-selected" onClick={this.handleNavClick}>
                            <span>
                              <svg className="nc-icon outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px">
                                <title>Error Server</title>
                                <desc>A flat styled icon from Orion Icon Library.</desc>
                                <path data-name="layer4" d="M2 38a2 2 0 0 0 2 2h48a2 2 0 0 0 2-2V20H2z" fill="#adc4ea"></path>
                                <path data-name="opacity" d="M2 38a2 2 0 0 0 2 2h48a2 2 0 0 0 2-2V20H2z" fill="#000064" opacity=".15"></path>
                                <path data-name="layer4" d="M2 50a2.07 2.07 0 0 0 2 2h48a2.151 2.151 0 0 0 2-2V36H2z" fill="#adc4ea"></path>
                                <path data-name="opacity" d="M2 50a2.07 2.07 0 0 0 2 2h48a2.151 2.151 0 0 0 2-2V36H2z"  fill="#000064" opacity=".3"></path>
                                <path data-name="layer4" d="M54 6a2.07 2.07 0 0 0-2-2H4a2.151 2.151 0 0 0-2 2v14h52z"  fill="#adc4ea"></path>
                                <circle data-name="layer3" cx="11" cy="12" r="2" fill="#536895"></circle>
                                <circle data-name="layer3" cx="11" cy="28" r="2" fill="#536895"></circle>
                                <circle data-name="layer3" cx="11" cy="44" r="2" fill="#536895"></circle>
                                <path data-name="layer3" d="M46 29H30a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0-16H30a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm-9 32h-7a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2z" fill="#536895"></path>
                                <path data-name="opacity" d="M41.708 52c3.187 0 1.458-2.588 1.458-3.969 0-5.937 3.577-11.823 2.827-16.031-1.156 1.156-18.713 18.516-20.307 20z" fill="#000064" opacity=".18"></path>
                                <path data-name="layer2" fill="#fc6" d="M29.994 62l16-30 16 30h-32z"></path>
                                <path data-name="layer1" d="M45.988 51a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zM46 58a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-2zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0z" fill="#2e4369"></path>
                              </svg>
                            </span>
                            <em>Data</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-laporan">
                      <NavLink to='/laporan' className="a-nav" activeClassName="cd-selected" onClick={this.handleNavClick}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon outline" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64" height="64">
                            <title>Document</title>
                            <desc>A flat styled icon from Orion Icon Library.</desc>
                            <path data-name="layer2"
                            fill="#cbe1f0" d="M27 18V2h26v60H11V18h16z"></path>
                            <path data-name="layer2" fill="#cbe1f0" d="M11 18L27 2v16H11z"></path>
                            <path data-name="opacity" fill="#fff" opacity=".5" d="M11 18L27 2v16H11z"></path>
                            <path data-name="opacity" fill="#000064" opacity=".12" d="M11 34V18h16L11 34z"></path>
                            <path data-name="layer1" d="M29 27h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2zm14 8H21a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2zm0 8H21a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2zm-4 8H21a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" fill="#7b8baf"></path>
                          </svg>
                        </span>
                        <em>Laporan</em>
                      </NavLink>
                    </li>
                    
                    <li className="nav-li nav-sales" >
                      <NavLink to='/sales' className="a-nav" activeClassName="cd-selected" onClick={this.handleNavClick}>
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon outline" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" width="64" height="64">
                                  <title>Stock</title>
                                  <desc>A flat styled icon from Orion Icon Library.</desc>
                                  <path data-name="layer4" fill="#a7c5f2" d="M24 10h16v32H24z"></path>
                                  <circle data-name="layer3" cx="24" cy="54" r="4" fill="#7b8baf"></circle>
                                  <circle data-name="layer3" cx="50" cy="54" r="4" fill="#7b8baf"></circle>
                                  <path data-name="layer2" fill="#c8daf8" d="M40 26h16v16H40z"></path>
                                  <path data-name="layer1" fill="#8fa9d8" d="M40 18h12v8H40zm20 25H18a1 1 0 0 1-.976-.783L9.2 7H4a1 1 0 0 1 0-2h6a1 1 0 0 1 .976.783L18.8 41H60a1 1 0 0 1 0 2z"></path>
                                  <path data-name="opacity" fill="#000064" opacity=".1" d="M24 41h16V26L24 41z"></path>
                               </svg>
                            </span>
                            <em>Penjualan</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-purchase" >
                      <NavLink to='/purchase' className="a-nav"  activeClassName="cd-selected" onClick={this.handleNavClick}>
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon outline" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" width="64" height="64">
                                  <title>Add Item To Cart</title>
                                  <desc>A flat styled icon from Orion Icon Library.</desc>
                                  <circle data-name="layer5"cx="46" cy="22" r="16" fill="#496aa6"></circle>
                                  <path data-name="layer4" d="M13 23a1 1 0 0 1-.97-.758L8.22 7H3a1 1 0 1 1 0-2h6a1 1 0 0 1 .971.759l4 16a1 1 0 0 1-.728 1.212A.971.971 0 0 1 13 23z" fill="#96abd1"></path>
                                  <circle data-name="layer3" cx="20.001" cy="54" r="4" fill="#6c8abe"></circle>
                                  <circle data-name="layer3" cx="46.001" cy="54" r="4" fill="#6c8abe"></circle>
                                  <path data-name="layer2" d="M29.993 22H12l5.992 24h32l3.244-9.732-.012-.006A15.982 15.982 0 0 1 29.993 22z"fill="#b9c7e0"></path>
                                  <path data-name="opacity" d="M15.6 36.4L18 46h32l3.244-9.732-.012-.006a15.982 15.982 0 0 1-23.239-14.254z"  fill="#000064" opacity=".1"></path>
                                  <path data-name="layer1" d="M52.715 23.29a1 1 0 0 0-1.414 0l-4.3 4.3V14a1 1 0 0 0-2 0v13.587l-4.3-4.3a1 1 0 1 0-1.416 1.413l6.008 6a1 1 0 0 0 1.414 0l6.008-6a1 1 0 0 0 0-1.41z"
                                  fill="#f8f8f8"></path>
                              </svg>
                            </span>
                            <em>Pembelian</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-return">
                      <NavLink to='/return' className="a-nav" activeClassName="cd-selected" onClick={this.handleNavClick}>
                        <span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon outline" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64" height="64">
                                  <title>Update Shopping Cart</title>
                                  <desc>A flat styled icon from Orion Icon Library.</desc>
                                  <path data-name="layer4" fill="#a7c5f2" d="M38.033 52.001H12.051L6.101 22h51.933l-2.261 11.31-4.74 18.691h-13z"></path>
                                  <path data-name="layer3" d="M8.1 23a1 1 0 0 1-.744-1.668l17.934-20a1 1 0 0 1 1.489 1.335l-17.934 20A1 1 0 0 1 8.1 23zm47.934 0a1 1 0 0 1-.744-.332l-18-20a1 1 0 0 1 1.486-1.338l18 20a1 1 0 0 1-.742 1.67z" fill="#7b8baf"></path>
                                  <path data-name="layer2" d="M60.033 23h-56a1 1 0 0 1 0-2h56a1 1 0 1 1 0 2z" fill="#c3d6f9"></path>
                                  <path data-name="layer1" d="M62.707 49.292a1 1 0 0 0-1.414 0l-3.523 3.524a13.156 13.156 0 0 0-3.457-12 12.869 12.869 0 0 0-15.241-2.249 1 1 0 1 0 .958 1.755 10.861 10.861 0 0 1 12.861 1.9 11.142 11.142 0 0 1 2.952 10.046l-2.7-2.941a1 1 0 1 0-1.473 1.354l4.6 5a1 1 0 0 0 .715.323H57a1 1 0 0 0 .707-.294l5-5a1 1 0 0 0 0-1.418zM50.376 59.681a10.867 10.867 0 0 1-12.864-1.9 11.141 11.141 0 0 1-2.986-9.847l2.774 2.773a1 1 0 1 0 1.413-1.415l-3.916-3.913a.936.936 0 0 0-.2-.2l-.884-.884a.986.986 0 0 0-.734-.295 1 1 0 0 0-.714.323l-4.6 5a1 1 0 0 0 1.472 1.354l3.6-3.911a13.157 13.157 0 0 0 3.353 12.425 12.879 12.879 0 0 0 9.146 3.794 12.7 12.7 0 0 0 6.1-1.55 1 1 0 1 0-.959-1.754z" fill="#556685"></path>
                              </svg>
                        </span>
                        <em>Retur</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-settings">
                      <NavLink to='/settings' className="a-nav" activeClassName="cd-selected" onClick={this.handleNavClick}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon outline" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" width="64" height="64">
                              <title>Config</title>
                              <desc>A flat styled icon from Orion Icon Library.</desc>
                              <path data-name="layer2" d="M48.5 34H48v.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-2.861a12.943 12.943 0 0 1-3.96-1.672l-2 2a1.5 1.5 0 0 1-2.121 0l-1.886-1.887a1.5 1.5 0 0 1 0-2.121l2-2A12.9 12.9 0 0 1 32.362 22H29.5a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h.5v-.5a1.5 1.5 0 0 0-1.5-1.5h-5a1.5 1.5 0 0 0-1.5 1.5v3.931a18.855 18.855 0 0 0-6.3 2.615l-2.785-2.785a1.5 1.5 0 0 0-2.122 0L7.262 22.8a1.5 1.5 0 0 0 0 2.12l2.785 2.78A18.884 18.884 0 0 0 7.43 34H3.5A1.5 1.5 0 0 0 2 35.5v5A1.5 1.5 0 0 0 3.5 42h3.93a18.881 18.881 0 0 0 2.617 6.3l-2.785 2.782a1.5 1.5 0 0 0 0 2.122l3.538 3.534a1.5 1.5 0 0 0 2.122 0l2.778-2.784A18.881 18.881 0 0 0 22 56.57v3.93a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-3.93a18.881 18.881 0 0 0 6.3-2.617l2.785 2.785a1.5 1.5 0 0 0 2.122 0l3.531-3.538a1.5 1.5 0 0 0 0-2.122L41.954 48.3A18.881 18.881 0 0 0 44.57 42h3.93a1.5 1.5 0 0 0 1.5-1.5v-5a1.5 1.5 0 0 0-1.5-1.5zM26 47a9 9 0 1 1 9-9 9 9 0 0 1-9 9z" fill="#7b8baf"></path>
                              <path data-name="layer1" d="M60.5 16h-2.862a12.9 12.9 0 0 0-1.671-3.96l2-2a1.5 1.5 0 0 0 0-2.122l-1.889-1.881a1.5 1.5 0 0 0-2.121 0l-2 2A12.916 12.916 0 0 0 48 6.362V3.5A1.5 1.5 0 0 0 46.5 2h-3A1.5 1.5 0 0 0 42 3.5v2.862a12.916 12.916 0 0 0-3.96 1.671l-2-2a1.5 1.5 0 0 0-2.121 0l-1.883 1.889a1.5 1.5 0 0 0 0 2.122l2 2A12.9 12.9 0 0 0 32.362 16H29.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h2.862a12.9 12.9 0 0 0 1.671 3.96l-2 2a1.5 1.5 0 0 0 0 2.121l1.886 1.887a1.5 1.5 0 0 0 2.121 0l2-2A12.943 12.943 0 0 0 42 31.639V34.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-2.861a12.943 12.943 0 0 0 3.96-1.672l2 2a1.5 1.5 0 0 0 2.121 0l1.886-1.887a1.5 1.5 0 0 0 0-2.121l-2-2A12.9 12.9 0 0 0 57.638 22H60.5a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5zM45 25a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" fill="#8fa9d8"></path>
                              <path data-name="opacity" d="M26 47a9 9 0 0 1 0-18V14h-2.5a1.5 1.5 0 0 0-1.5 1.5v3.931a18.855 18.855 0 0 0-6.3 2.615l-2.785-2.785a1.5 1.5 0 0 0-2.122 0L7.262 22.8a1.5 1.5 0 0 0 0 2.12l2.785 2.78A18.884 18.884 0 0 0 7.43 34H3.5A1.5 1.5 0 0 0 2 35.5v5A1.5 1.5 0 0 0 3.5 42h3.93a18.881 18.881 0 0 0 2.617 6.3l-2.785 2.782a1.5 1.5 0 0 0 0 2.122l3.538 3.534a1.5 1.5 0 0 0 2.122 0l2.778-2.784A18.881 18.881 0 0 0 22 56.57v3.93a1.5 1.5 0 0 0 1.5 1.5H26zm19-22a6 6 0 0 1 0-12V2h-1.5A1.5 1.5 0 0 0 42 3.5v2.862a12.916 12.916 0 0 0-3.96 1.671l-2-2a1.5 1.5 0 0 0-2.121 0l-1.883 1.889a1.5 1.5 0 0 0 0 2.122l2 2A12.9 12.9 0 0 0 32.362 16H29.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h2.862a12.9 12.9 0 0 0 1.671 3.96l-2 2a1.5 1.5 0 0 0 0 2.121l1.886 1.887a1.5 1.5 0 0 0 2.121 0l2-2A12.943 12.943 0 0 0 42 31.639V34.5a1.5 1.5 0 0 0 1.5 1.5H45z" fill="#000064" opacity=".15"></path>
                            </svg>
                        </span>
                        <em>Pengaturan</em>
                      </NavLink>
                    </li>

                    <li className="nav-li nav-logout">
                      <a href="#" className="a-nav" onClick={this.handleLogout}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg"  className="nc-icon outline"  viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64" height="64">
                            <title>Shutdown</title>
                            <desc>A flat styled icon from Orion Icon Library.</desc>
                            <path data-name="layer1" d="M45.513 6.62a3 3 0 0 0-3.006 5.192 21 21 0 1 1-21.006 0A3 3 0 0 0 18.5 6.616a27 27 0 1 0 27.018 0z"  fill="#7b8baf"></path>
                            <path data-name="layer1" d="M32 31a3 3 0 0 0 3-3V4a3 3 0 0 0-6 0v24a3 3 0 0 0 3 3z"  fill="#7b8baf"></path>
                          </svg>
                        </span>
                        <em>Keluar</em>
                      </a>
                    </li>

                </ul> 

          </div>
          <div className="cd-overlay" onClick={this.handleNavClick} ></div>
      </React.Fragment>
    )
  }
}

const mapAction = dispatch => ({
    doLogout : (history) => dispatch(logout(history))
});


export default connect(null, mapAction)(withRouter(Nav))
