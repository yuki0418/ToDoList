import React, { Component } from 'react';
import "./AddTodoForm.scss";

import CircleColorPicker from '../CircleColorPicker/CircleColorPicker';
import DatePicker from "react-datepicker";
import TextInput from "../TextInput/TextInput";
import TextArea from '../TextArea/TextArea';

import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

class AddTodoForm extends Component {
  state = {
    todo: {
      title: "",
      from: new Date(),
      to: new Date(),
      location: "",
      note: "",
      color: "#f44336", //Default
      // isCompleted: false
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const todo = {...this.state.todo, [name]: value}; 

    this.setState({
      todo: todo
    })
  }

  handleColorChange = (color) => {
    const newColor = color;
    const todo = {...this.state.todo, color: newColor};

    this.setState({
      todo: todo
    }) 
  }

  handleDateFromChange = newDate => {
    const todo = {...this.state.todo, from: newDate};
    this.setState({todo: todo})
  };

  handleDateToChange = newDate => {
    const todo = {...this.state.todo, to: newDate};
    this.setState({todo: todo})
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {...this.state.todo};

    this.setState({todo: {
      title: "",
      from: new Date(),
      to: new Date(),
      location: "",
      note: "",
      color: "#f44336", //Default
    }});

    this.props.addTodo(newTodo, this.props.auth.token);
  }

  setDefaultColor = () => {
    const defaultColor = "#f44336";    
    return defaultColor;
  }

  render() {
    return (
      <div className="AddTodoForm">
        <form onSubmit={this.onSubmit}>
          <div className="col-2">
            <div className="input-container">
              <TextInput
                name="title" 
                id="title"
                value={this.state.todo.title} 
                label="Title"
                placeholder="Title" 
                onChange={this.handleChange} 
                required/>
            </div>
            <CircleColorPicker onColorChange={this.handleColorChange} onit={this.setDefaultColor}/>
          </div>
          <div className="col-2">
            <div className="input-container date">
              <label>From</label>
              <DatePicker 
                className="datePicker"
                name="from" id="from"
                placeholderText="DD/MM/YYYY"
                selected={this.state.todo.from}
                onChange={this.handleDateFromChange} 
                dateFormat="dd/MM/yyyy" />
              <span className="animation-border-bottom"></span>
            </div>
            <div className="input-container date">
              <label>To</label>
              <DatePicker 
                className="datePicker"
                name="to" id="to"
                placeholderText="DD/MM/YYYY"
                selected={this.state.todo.to}
                onChange={this.handleDateToChange} 
                dateFormat="dd/MM/yyyy" />
              <span className="animation-border-bottom"></span>
            </div>
          </div>
          <div className="input-container">
            <TextInput 
              id="location"
              name="location"
              value={this.state.todo.location} 
              label="Location"
              placeholder="Location" 
              onChange={this.handleChange} />
          </div>
          <div className="input-container margin-bottom">
            <TextArea 
              id="note"
              name="note"
              label="Note"
              rows={10}
              placeholder="Enter description"
              value={this.state.todo.note}
              onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo, token) => dispatch(addTodo(todo, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);