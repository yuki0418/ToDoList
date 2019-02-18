import React, { Component } from 'react';
import ToDoTitle from './ToDoTitle';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '40%',
        height: '91vh',
        display: "inline-block",
        borderRight: '1px solid #e0e0e0'
    },
    txtTitle: {
        marginTop: 20,
        marginLeft: 16,
        width: '80%'
    },
    btnSave: {
        marginTop: 20,
        height: 55
    }
};

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {txtTitle: ''};

        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }  
  
    passSelectedId = (id) => {
        this.props.handleItemClicked(id);
    }

    handleChange(e){
        this.setState({ txtTitle: e.target.value });
    }

    onSaveClick(){
        console.log(this.state.txtTitle);
    }

    render() {
        return (
        <div className={this.props.classes.root}>
            <div>
                <TextField
                    label="Title"
                    variant="outlined"
                    className={this.props.classes.txtTitle}
                    onChange={this.handleChange}
                />
                <Button variant="contained" 
                        color="primary" 
                        className={this.props.classes.btnSave} 
                        onClick={this.onSaveClick} >
                    Save
                </Button>
            </div>
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