import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./Header.scss";
import { onLogout } from '../../redux/actions/auth';

class Header extends Component {
  handleLogout = () => {
    this.props.onLogout();
  }

  render() {
    return(
      <header className="Header">
        <div></div>
        <div className="title">
          {this.props.title ? this.props.title : "ToDo List"}
        </div>
        <div className="right">
          <div className="userName">{this.props.auth.currentUser.userName}</div>
          <button className="btnLogout" onClick={this.handleLogout}>Logout</button>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  onLogout: () => onLogout()
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)