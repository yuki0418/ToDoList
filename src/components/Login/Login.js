import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';

import TextInput from '../TextInput/TextInput';
import { Link } from "react-router-dom";
import { login } from '../../redux/actions/auth';


class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  
  onChange = (e) => {
    const target = e.target;
    let val = target.value;
    let id = target.id;
    this.setState({
      [id]: val
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    this.props.onSubmit(email, password);
  }

  render() {
    return (
      <div className="Login">
        <div className="container">
          <h1>Welcome<br />Simple Todo App</h1>
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
              required />

            { 
              this.props.auth.error ?
                <div className="error">
                  <p>{this.props.auth.error.message}</p>
                </div>
              : null
            }

            <button 
              type="submit" 
              className="btn-login"
              disabled={ this.props.isRequest ? true : false}>
              { this.props.isRequest ? 
                <div className="spinnerCircle"></div> : 'Login'}
            </button>
            <Link to="/signup" className="btn-regi">Create account</Link>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isRequest: state.isRequest,
})

const mapDispatchToProps = {
  onSubmit: (email, password) => login(email, password)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
