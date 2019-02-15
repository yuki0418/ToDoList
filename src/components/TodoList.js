import React, { Component } from 'react';
import ToDoTitle from './ToDoTitle';

import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '40%',
        height: '91vh',
        display: "inline-block",
        borderRight: '1px solid #e0e0e0'
    }
};

class TodoList extends Component {
  
  passSelectedId = (id) => {
      this.props.handleItemClicked(id);
  } 

  render() {
    return (
      <div className={this.props.classes.root}>
        <List>
            {Object.keys(this.props.todolist).map(key => 
                <ToDoTitle key={key} item={this.props.todolist[key]} onItemClicked={this.passSelectedId} />
            )}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(TodoList);