import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '40%',
        margin: '10px'
    }
};

class TodoList extends Component {
  
  render() {
    return (
      <div className={this.props.classes.root}>
        <div>{this.props.todo.subject}</div>
      </div>
    );
  }
}

export default withStyles(styles)(TodoList);