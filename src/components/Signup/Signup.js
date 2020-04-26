import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Signup.scss'

import TextInput from '../../components/TextInput/TextInput';
import { Link } from "react-router-dom";
import { signup } from '../../redux/actions/auth';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPw: '',
    isConfirm: null,
    name: ''
  }

  onChange = (e) => {
    const target = e.target;
    let val = target.value;
    let id = target.id;
    this.setState({
      [id]: val
    }, () => {
      this.handleMatchConfrmPw();
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.isConfirm)
      return null
    
    // If isConfrim is true -> signup
    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.name;
    this.props.onSignup(email, password, name);
  }

  handleMatchConfrmPw = () => {
    if(this.state.confirmPw === this.state.password) {
      this.setState({
        isConfirm: true
      })
    } else {
      this.setState({
        isConfirm: false
      })
    }
  }

  render() {
    return (
      <div className="Signup">
        <div className="container">
          <h1>Create new account</h1>
          <form onSubmit={this.handleSubmit}>
            <TextInput 
              value={this.state.email}
              type="email"
              name="E-mail"
              id='email'
              placeholder="simpleTodoApp@email.com"
              label="E-mail"
              onChange={this.onChange}
              className="email"
              required/>

            <TextInput
              value={this.state.name}
              name="name"
              id='name'
              placeholder="Name"
              label="Name"
              onChange={this.onChange}
              className="name"
              required/>
            
            <TextInput 
              value={this.state.password}
              type="password"
              name="Password"
              id='password'
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
              label="Password"
              onChange={this.onChange}
              className="password"
              onInvalid="At least one number, one lowercase and one uppercase letter"
              required/>

            <TextInput 
              value={this.state.confirmPw}
              type="password"
              name="confirmPw"
              id='confirmPw'
              placeholder="Confirm password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
              label="Confirm password"
              onChange={this.onChange}
              className="confirmPw"
              required/>

            {
              !this.state.isConfirm && this.state.confirmPw ?
                <div className="error">
                  <p>Password is NOT mutch</p>
                </div>
              : null
            }

            {
              this.props.auth.error ?
                <div className="error">
                  <p>{this.props.auth.error.message}</p>
                </div>
              : null
            }

            <button 
              type="submit" 
              className="btn-regi"
              disabled={ this.props.isRequest ? true : false}>
              { this.props.isRequest ? 
                <div className="spinnerCircle"></div> : 'Create'}
            </button>
            <Link to="/" className="btn-backToLogin">Back to login</Link>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isRequest: state.isRequest,
  auth: state.auth
})

const mapDispatchToProps = {
  onSignup: (email, password, name) => signup(email, password, name)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
