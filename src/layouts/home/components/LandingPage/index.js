import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import {HashRouter  as Router, Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'

// import components
import CreateRequest from '../../components/CreateRequest'
import MyAccount from '../../components/MyAccount'
import Administration from '../../components/Administration'

const dialogStyles = {
  style: {
    backgroundColor: 'transparent',
    padding: 5,
    boxShadow:'none',
  }
}

class LandingPage extends Component { 
  constructor(props, context) {
    super(props)
    
    this.contracts = context.drizzle.contracts    

    this.handleCreateButton = this.handleCreateButton.bind(this)   
    this.handleCreateRequestDialogClose = this.handleCreateRequestDialogClose.bind(this);
    this.handleMyAccountButton = this.handleMyAccountButton.bind(this)   
    this.handleMyAccountDialogClose = this.handleMyAccountDialogClose.bind(this);
    this.handleAdminButton = this.handleAdminButton.bind(this)   
    this.handleAdminDialogClose = this.handleAdminDialogClose.bind(this);
    this.showMenu = this.showMenu.bind(this);

    this.state = {
      dataKeyMemberKeys: null,
      foundationMembers: [],
      dataKeyOwner: null,
      owner: null,
      isFoundationMember: false,
      dialogCreateRequest: false,
      dialogMyAccount: false,
      dialogAdmin: false,
      anchorEl: null,
      alertText: '',
      showMenu: false
    }
  }

  componentDidMount() {
    const dataKeyMemberKeys = this.contracts.ServiceRequest.methods.getFoundationMemberKeys.cacheCall();
    this.setState({dataKeyMemberKeys})
    this.setFoundationMembers(this.props.ServiceRequest)

    const dataKeyOwner  = this.contracts.ServiceRequest.methods.owner.cacheCall();
    this.setState({dataKeyOwner})
    this.setOwner(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyMemberKeys !== prevState.dataKeyMemberKeys) {
        this.setFoundationMembers(this.props.ServiceRequest)
    }
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyOwner !== prevState.dataKeyOwner) {
      this.setOwner(this.props.ServiceRequest)
    }
  }

  setFoundationMembers(contract) {
    if (contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys] !== undefined && this.state.dataKeyMemberKeys !== null) {
      this.setState({
        foundationMembers: contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value
      }, () => {
        const exists = this.state.foundationMembers.some(m => m === this.props.accounts[0])
        if(exists) {
          this.setState({isFoundationMember : exists});
          //if(this.state.selectedTab !== 0) this.setState ({selectedTab : 0})  
        }          
      });
    }
  }

  setOwner(contract) {
    if (contract.owner[this.state.dataKeyOwner] !== undefined && this.state.dataKeyOwner !== null) {
      this.setState({
        owner: contract.owner[this.state.dataKeyOwner].value
      }, () => {
        if( this.state.owner === this.props.accounts[0]) {
          this.setState({isFoundationMember : true});
          //if(this.state.selectedTab !== 0) this.setState ({selectedTab : 0})
        }          
      });
    }
  }

  showMenu(){
    this.setState({
      showMenu: !this.state.showMenu
    })
  }


  handleCreateButton() {
      this.setState({ dialogCreateRequest: true })
  }

  handleCreateRequestDialogClose() {
      this.setState({ dialogCreateRequest: false })
  }

  handleMyAccountButton() {
      this.setState({ anchorEl: null });
      this.setState({ dialogMyAccount: true })
  }

  handleMyAccountDialogClose() {
      this.setState({ dialogMyAccount: false })
  }

  handleAdminButton() {
      this.setState({ anchorEl: null });
      this.setState({ dialogAdmin: true })
  }

  handleAdminDialogClose() {
      this.setState({ dialogAdmin: false })
  }

  handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
  handleClose = () => {
      this.setState({ anchorEl: null });
  };
    
  render() {
  //handleCreateRequest={this.handleCreateRequest} handleAdmin={this.handleAdmin} handleAccount={this.handleAccount} handlerViewPage={this.handleViewRequest

  // const menuList = 
  //   <ul>
  //     {this.state.isFoundationMember === true && <li><a href="#" onClick = {this.props.handleAdmin} alt="Admin">Admin</a></li> }
  //     <li><a href="#" onClick = {this.props.handleCreateRequest} alt="Create">Create</a></li>
  //     <li><a href="#" onClick = {this.props.handleAccount} alt="Account">Account</a></li>
  //     <li><a href="#" onClick = {this.props.handlerViewPage} alt="Account">View Requests</a></li>
  //   </ul>

  const menuList = 
  <Router>
  <ul>
    {this.state.isFoundationMember === true && <li><a href="#" onClick = {this.props.handleAdmin} alt="Admin">Admin</a></li> }
    <li><Link to={"/createrequest"} alt="Create">Create</Link></li>
    <li><Link to={"/myaccount"}>Account</Link></li>
    <li><Link to={"/viewrequests"} alt="View Requests">View Requests</Link></li>
  </ul>
  </Router>

  const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <div>
          <div className="top-fold">
          <div id="roadmap-row" data-midnight="light" data-bg-mobile-hidden="" className="wpb_row vc_row-fluid vc_row full-width-section standard_section" style={{ visibility: "visible"}} data-top-percent="4%" data-bottom-percent="4%">
          <div className="row-bg-wrap instance-2">
              <div className="inner-wrap"> 
                <div className="row-bg" data-color_overlay="#40ceff" data-color_overlay_2="#5a2ff1" data-gradient_direction="left_to_right" data-overlay_strength="1" data-enable_gradient="true"></div>
              </div> 
            </div>
            <div className="nectar-shape-divider-wrap no-color" data-front="" data-style="mountains" data-position="bottom">
                <svg className="nectar-shape-divider" fill="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none">  
                <path d="M 1014 264 v 122 h -808 l -172 -86 s 310.42 -22.84 402 -79 c 106 -65 154 -61 268 -12 c 107 46 195.11 5.94 275 137 z"></path>   
                <path d="M -302 55 s 235.27 208.25 352 159 c 128 -54 233 -98 303 -73 c 92.68 33.1 181.28 115.19 235 108 c 104.9 -14 176.52 -173.06 267 -118 c 85.61 52.09 145 123 145 123 v 74 l -1306 10 z"></path>  
                <path d="M -286 255 s 214 -103 338 -129 s 203 29 384 101 c 145.57 57.91 178.7 50.79 272 0 c 79 -43 301 -224 385 -63 c 53 101.63 -62 129 -62 129 l -107 84 l -1212 12 z"></path>  
                <path d="M -24 69 s 299.68 301.66 413 245 c 8 -4 233 2 284 42 c 17.47 13.7 172 -132 217 -174 c 54.8 -51.15 128 -90 188 -39 c 76.12 64.7 118 99 118 99 l -12 132 l -1212 12 z"></path>  
                <path d="M -12 201 s 70 83 194 57 s 160.29 -36.77 274 6 c 109 41 184.82 24.36 265 -15 c 55 -27 116.5 -57.69 214 4 c 49 31 95 26 95 26 l -6 151 l -1036 10 z"></path> 
                </svg>
            </div>
          <div className="row logo-nav">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-6 logo">
            {
              (typeof web3 !== 'undefined') ?
                <Router>
                  <Link to={"/viewrequests"} alt="View Requests">
                    <h1><span className="icon-logo"></span></h1>
                  </Link>
                </Router>
              :
                <a href="singularitynet.io" target="_new">
                  <h1><span className="icon-logo"></span></h1>
                </a>
            }
            </div>
            <div className="col-xs-4 col-sm-9 col-md-9 col-lg-6 menu-bar">
              <nav className="navbar-singularity">
                <div className="col-md-12 header-menu">
                  {menuList}
                </div>
                <div className="col-xs-2 col-sm-2 hamburger-menu">
                  <button className="bars" onClick={this.showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>           
                  {
                    this.state.showMenu ? 
                      <div className="hamburger-header-menu">
                        {menuList}
                      </div>
                    : 
                      null  
                  }                  
                </div>
              </nav>
            </div>
            </div>
            </div>        
            <div className="main">
              <div className="row">
                <div className="col-12">
                </div>
              </div>
              </div> 
            </div>
          </div>

          <Dialog PaperProps={dialogStyles} open={this.state.dialogCreateRequest} >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Create Request</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleCreateRequestDialogClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="clear"></div><br/>
                </div>
                <div className="modal-body">
                  <CreateRequest />
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog PaperProps={dialogStyles} open={this.state.dialogMyAccount} >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">My Account</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleMyAccountDialogClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="clear"></div><br/>
                </div>
                <div className="modal-body">
                  <MyAccount />
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog PaperProps={dialogStyles} open={this.state.dialogAdmin} >
            <div role="document"> {/* className="modal-dialog" */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">RFAI Contract Administration</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleAdminDialogClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="clear"></div><br/>
                </div>
                <div className="modal-body">
                  <Administration />
                </div>
              </div>
            </div>
          </Dialog>

        </React.Fragment>

    )
  }
}

LandingPage.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SingularityNetToken: state.contracts.SingularityNetToken,
    ServiceRequest: state.contracts.ServiceRequest,
    drizzleStatus: state.drizzleStatus,
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}

export default drizzleConnect(LandingPage, mapStateToProps)