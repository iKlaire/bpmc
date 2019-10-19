import React, { Component } from 'react';
import './AlertBox.css';
import '../../App.css';

class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalClassName: ''
    };
  }

  generateButtons = buttons => {
    return buttons.map(button => {
      let func = '';
      if (button.function) {
        func = button.function;
      } else {
        func = this.onClose;
      }
      return (
        <button className="action-button" onClick={func}>
          {button.label}
        </button>
      );
    });
  };

  onClose = () => {
    this.setState({
      modalClassName: 'modal-hide' // TODO: change this for real
    });
  };

  componentDidMount() {
    this.setState({
      modalClassName: 'modal' // TODO: change this for real
    });
  }

  render() {
    const { title, imageUrl, message, buttons } = this.props;
    const { modalClassName } = this.state;
    return (
      <div id="myModal" class={modalClassName}>
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={this.onClose}>
              &times;
            </span>
            <h2>{title}</h2>
          </div>
          <div class="modal-body">
            <div class="modal-body-top">
              <img src={imageUrl} alt="Avatar" />
              <br />
              {message}
              <br />
              <br />
            </div>
            <div class="modal-body-buttons">{this.generateButtons(buttons)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertBox;
