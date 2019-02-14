import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AppBar.scss';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Appbar extends Component {
  render() {
    return (
      <div className="Appbar felxgrow1">
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography color="inherit" variant="h6" className="felxgrow1">
                    To DO List
                </Typography>
                <Button color="inherit" className="btnLogin">Login</Button>
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Appbar;
