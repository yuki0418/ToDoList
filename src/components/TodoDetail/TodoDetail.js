import React, { Component } from 'react';
import './TodoDetail.scss';

import { connect } from 'react-redux';
import { 
  editTodo,
  editSelectedTodo,
  saveSelectedTodo
} from '../../redux/actions';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import CircleColorPicker from '../CircleColorPicker/CircleColorPicker';
import TextInput from "../TextInput/TextInput";
import TextArea from '../TextArea/TextArea';

class TodoDetail extends Component {

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    const newSelectedTodo = {...this.props.selectedTodo, [name]: value};
    
    this.props.editSelectedTodo(newSelectedTodo);
  }

  handleColorChange = (color) => {
    const newSelectedTodo = {...this.props.selectedTodo, color: color};
    this.props.editSelectedTodo(newSelectedTodo);
  }

  handleFromDateChange = (date) => {
    const formatedDate = new Date(date);
    const newSelectedTodo = {...this.props.selectedTodo, from: formatedDate};
    this.props.editSelectedTodo(newSelectedTodo);
  }

  handleToDateChange = (date) => {
    const formatedDate = new Date(date);
    const newSelectedTodo = {...this.props.selectedTodo, to: formatedDate};
    this.props.editSelectedTodo(newSelectedTodo);
  }

  saveClicked = (e) => {
    e.preventDefault();
    const newSelectedTodo = this.props.selectedTodo;
    this.props.saveSelectedTodo(newSelectedTodo, this.props.auth.token);
  }

  showDetailComponent = () => {
    return (
      <form onSubmit={this.saveClicked}>
        <div className="cal-2">
          <div className="input-container">
            <TextInput
              name="title" 
              id="title"
              value={this.props.selectedTodo.title} 
              label="Title"
              placeholder="Title"
              onChange={this.handleChange} 
              required/>
          </div>
          <div>
            <CircleColorPicker 
              onColorChange={this.handleColorChange} 
              defaultColor={this.props.selectedTodo.color}/>
          </div>
        </div>
        <div className="cal-2">
          <div className="input-container date">
            <label>From</label>
            <DatePicker 
              className="datePicker"
              name="from" id="from"
              placeholderText="DD/MM/YYYY"
              selected={new Date(this.props.selectedTodo.from)}
              onChange={this.handleFromDateChange} 
              dateFormat="dd/MM/yyyy" />
            <span className="animation-border-bottom"></span>
          </div>
          <div className="input-container date">
            <label>To</label>
            <DatePicker 
              className="datePicker"
              name="to" id="to"
              placeholderText="DD/MM/YYYY"
              selected={new Date(this.props.selectedTodo.to)}
              onChange={this.handleToDateChange} 
              dateFormat="dd/MM/yyyy" />
            <span className="animation-border-bottom"></span>
          </div>
        </div>
        <div className="input-container">
          <TextInput 
            id="location"
            name="location"
            value={this.props.selectedTodo.location} 
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
            value={this.props.selectedTodo.note}
            onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn full-width">SAVE</button>
      </form>
    )
  }

  render() {
    return (
      <div className="TodoDetail">
        { this.props.selectedTodo ? this.showDetailComponent() : null }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedTodo: state.selectedTodo,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editSelectedTodo: newSelectedTodo => dispatch(editSelectedTodo(newSelectedTodo)),
    editTodo: updatedTodo => dispatch(editTodo(updatedTodo)),
    saveSelectedTodo: (newSelectedTodo, token) => dispatch(saveSelectedTodo(newSelectedTodo, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetail);