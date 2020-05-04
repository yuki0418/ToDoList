import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from '../Header/Header';
import TodoList from '../../components/TodoList/TodoList';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import Loader from '../../components/Loader/Loader';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import { onLoad } from '../../redux/actions/auth';

import { connect } from 'react-redux'

import "./Layout.scss";

class Layout extends Component {
  componentDidMount = () => {
    this.props.onLoad();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.auth.token) {
      routes = (
        <Switch>
          <Route exact path="/">
            <div style={{position: 'relative'}}>
              { this.props.isRequest ?
                <Loader /> : null
              }
              <Header />
              <TodoList />
              <main>
                {this.props.selectedTodo ? 
                  <TodoDetail selectedTodo={this.props.selectedTodo} />
                  : null
                }
              </main>
            </div>
          </Route>
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Router>
        {routes}
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedTodo: state.selectedTodo,
    isRequest: state.isRequest,
    auth: state.auth,
  }
}

const mapDispatchToProps = {
  onLoad: () => onLoad(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);