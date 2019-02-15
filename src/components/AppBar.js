import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Appbar extends Component {
  
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="fixed">
            <Toolbar>
                <IconButton color="inherit" className={this.props.classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography color="inherit" variant="h6" className={this.props.classes.grow}>
                    To DO List
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Appbar);
