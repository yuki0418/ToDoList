import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

// const item = { id: 1, subject: "Mail to boss", detail: "shoud to mail to boss", isComplite: false, deadline: "10/03/2019"}

class TodoTitle extends Component {
  render() {
    return (
      <ListItem button divider
                onClick={() => this.props.onItemClicked(this.props.item.id)}>
        <ListItemText primary={this.props.item.subject} secondary={this.props.item.deadline} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(TodoTitle);