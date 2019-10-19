import React, { useState } from "react";
import "./App.css";
import Town from "./temp.jpg";

function App() {
  const [money] = useState(10);
  const [energy] = useState(100);
  const [energyCap] = useState(100);
  const [cow] = useState(0);
  const [beef] = useState(0);
  const [patty] = useState(0);
  const [actions] = useState([
    {
      label: "Buy Cow",
      description: "You buy a cow. Bow.",
      energy: 3,
      money: 3
    },
    {
      label: "Process Cow",
      description: "You process a cow. Wow.",
      energy: 5,
      money: 5
    },
    {
      label: "Buy Cow",
      description: "You buy a cow. Bow.",
      energy: 3,
      money: 3
    },
    {
      label: "Process Cow",
      description: "You process a cow. Wow.",
      energy: 5,
      money: 5
    },
    {
      label: "Buy Cow",
      description: "You buy a cow. Bow.",
      energy: 3,
      money: 3
    },
    {
      label: "Process Cow",
      description: "You process a cow. Wow.",
      energy: 5,
      money: 5
    },
    {
      label: "Buy Cow",
      description: "You buy a cow. Bow.",
      energy: 3,
      money: 3
    },
    {
      label: "Process Cow",
      description: "You process a cow. Wow.",
      energy: 5,
      money: 5
    }
  ]);
  return (
    <div className="container">
      <div className="game-container">
        <div className="header-container">
          <div className="money-container">
            <span className="money-icon">💲</span>
            <span className="money-count">{money}</span>
          </div>
          <div className="energy-container">
            <span className="energy-icon">🔋</span>
            <span className="energy-count">
              {energy}/{energyCap}
            </span>
          </div>
        </div>
        <div className="stats-container">stats</div>
        <div className="visual-container">
          <div className="town-image-container">
            <img className="town-image" src={Town}></img>
          </div>
        </div>
        <div className="actions-container">
          <div className="sell-bar">
            <div className="products-count">
              <div className="cow">
                <span className="cow-icon">🐮</span>
                <span>{cow}</span>
              </div>
              <div className="beef">
                <span className="beef-icon">🥩</span>
                <span>{beef}</span>
              </div>
              <div className="patty">
                <span className="patty-icon">🍔</span>
                <span>{patty}</span>
              </div>
            </div>
            <div className="sell-button-container">
              <button className="sell-button">SELL</button>
            </div>
          </div>
          <div className="actions-list">
            <div className="actions-card">
              {actions.map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">🈳</div>
                  <div className="action-content">
                    <span className="action-label">{action.label}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button">
                      🔋 {action.energy} 💲 {action.money}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
