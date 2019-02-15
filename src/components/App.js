import React, { Component } from 'react';
import './App.css';

import Appbar from './AppBar';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import todolist from '../testData';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  body: {
      display: 'flex',
      margin: '60px 0 0 0'
  }
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {selectedId: null};

    this.setSelectedId = this.setSelectedId.bind(this);
  }

  selectedTodo(){
    var item;
    if(this.state.selectedId){
      todolist.forEach(i => {
        if(i.id === this.state.selectedId)
          item = i;
      });
      return <TodoDetail todo={item}/>
    }
  }

  setSelectedId(id){
    this.setState({
      selectedId: id
    })
  }

  render() {
    return (
      <div className="App">
        <Appbar />
        <div className={this.props.classes.body}>
          <TodoList todolist={todolist} handleItemClicked={this.setSelectedId}/>
          {this.selectedTodo()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
