import React, { Component, useState } from 'react';
import './GameOverAlertBox.css';

class GameOverAlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalClassName: ''
    };
  }

  onClose = () => {
    this.setState({
      modalClassName: 'game-over-modal-hide' // TODO: change this for real
    });
  };

  componentDidMount() {
    this.setState({
      modalClassName: 'game-over-modal' // TODO: change this for real
    });
  }

  render() {
    const { imageUrl, message } = this.props;
    const { modalClassName } = this.state;

    const parseMessage = message => {
      let lines = [];
      for (let i = 0; i < Object.entries(message).length; i++) {
        lines.push(`${Object.keys(message)[i]}: ${Object.values(message)[i]}`);
      }

      return lines.map(line => {
        return (
          <div>
            {line}
            <br />
          </div>
        );
      });
    };

    return (
      <>
        <div id="myModal" class={modalClassName}>
          <div class="game-over-modal-content w3-animate-zoom">
            <div class="game-over-modal-header">
              <span class="game-over-close" onClick={this.onClose}>
                &times;
              </span>
              <h2>GAME OVER!!!</h2>
            </div>
            <div class="game-over-modal-body">
              <div class="game-over-modal-body-top">
                <img src={imageUrl} alt="Avatar" />
                <br />
                <br />
                <div className="game-over-message-body">{parseMessage(message)}</div>
                <br />
                <button className="game-over-action-button" onClick={this.onClose} style={{ padding: '6% 20%' }}>
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GameOverAlertBox;
