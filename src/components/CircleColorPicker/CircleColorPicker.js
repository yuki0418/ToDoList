import React, { Component } from 'react';
import './CircleColorPicker.scss';

import { CirclePicker } from 'react-color';

class CircleColorPicker extends Component {
  state = {
    selectedColor: '#f44336',
    displayColorPicker: false
  }

  handleChangeComplete = (color) => {
    this.setState({selectedColor: color.hex });
    this.handleClose();
    // Pass color to parent compoment by prop.onColorChange    
    this.props.onColorChange(color.hex);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  onit = (defaultColor) => {
    this.setState({selectedColor: defaultColor });
  }

  render() {
    return (
      <div className="CircleColorPicker">
        <div 
          className="selectedColor" 
          style={this.props.defaultColor ? 
            {'backgroundColor': this.props.defaultColor}:
            {'backgroundColor': this.state.selectedColor}}
          onClick={this.handleClick}>
        </div>
        { this.state.displayColorPicker ?
          <div className="cover popover">
            <CirclePicker
              color={this.props.defaultColor ? this.props.defaultColor : this.state.selectedColor} 
              onChangeComplete={this.handleChangeComplete}/>
          </div>
          : null }
      </div>
    )
  }
}

export default CircleColorPicker;