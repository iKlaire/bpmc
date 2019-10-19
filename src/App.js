import React, { useState } from 'react';
import './App.css';
import Town from './temp.jpg';
import Cow from './cow.png';
import Beef from './meat.png';
import Energy from './energy.png';
import Money from './money.png';
import Patty from './patty.png';
import Sell from './sell.png';
import Employees from './employee.png';
import Thermometer from './thermo.png';
import GGPerDay from './ggpd.png';

import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

function App() {
  const [money] = useState(10);
  const [energy] = useState(100);
  const [energyCap] = useState(100);
  const [employees] = useState(0);
  const [ggPerDay] = useState(500);
  const [temperature] = useState(15);
  const [cow] = useState(0);
  const [beef] = useState(0);
  const [patty] = useState(0);
  const [actions] = useState([
    {
      label: 'Buy Cow',
      description: 'You buy a cow. Bow.',
      energy: 3,
      money: 3
    },
    {
      label: 'Process Cow',
      description: 'You process a cow. Wow.',
      energy: 5,
      money: 5
    },
    {
      label: 'Buy Cow',
      description: 'You buy a cow. Bow.',
      energy: 3,
      money: 3
    },
    {
      label: 'Process Cow',
      description: 'You process a cow. Wow.',
      energy: 5,
      money: 5
    },
    {
      label: 'Buy Cow',
      description: 'You buy a cow. Bow.',
      energy: 3,
      money: 3
    },
    {
      label: 'Process Cow',
      description: 'You process a cow. Wow.',
      energy: 5,
      money: 5
    },
    {
      label: 'Buy Cow',
      description: 'You buy a cow. Bow.',
      energy: 3,
      money: 3
    },
    {
      label: 'Process Cow',
      description: 'You process a cow. Wow.',
      energy: 5,
      money: 5
    }
  ]);
  const data = [
    { name: 'Page A', uv: 1, amt: 2400 },
    { name: 'Page B', uv: 2, amt: 12 },
    { name: 'Page C', uv: 88, amt: 678 },
    { name: 'Page D', uv: 777, amt: 3 },
    { name: 'Page E', uv: 1800, amt: 137 },
    { name: 'Page F', uv: 6000, amt: 888 }
  ];
  return (
    <div className="container">
      <div className="game-container">
        <div className="header-container">
          <div className="money-container">
            <span className="money-icon">
              <img src={Money} />
            </span>
            <span className="money-count">{money}</span>
          </div>
          <div className="energy-container">
            <span className="energy-icon">
              <img src={Energy} />
            </span>
            <span className="energy-count">
              {energy}/{energyCap}
            </span>
          </div>
          <div className="employees-container">
            <span className="employees-icon">
              <img src={Employees} />
            </span>
            <span className="employees-count">{employees}</span>
          </div>
        </div>
        <div className="stats-container">
          <div className="stats">
            <div className="ggpd">
              <img src={GGPerDay} />
              {ggPerDay}/day
            </div>
            <div className="temperature">
              <img src={Thermometer} />
              {temperature}°c
            </div>
          </div>
          <div className="charts">
            <div className="chart-card">
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-title">GG Level</div>
            </div>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-title">Water Level</div>
            </div>
          </div>
        </div>
        <div className="visual-container">
          <div className="town-image-container">
            <img className="town-image" src={Town}></img>
          </div>
        </div>
        <div className="actions-container">
          <div className="sell-bar">
            <div className="products-count">
              <div className="cow">
                <span className="cow-icon">
                  <img src={Cow} />
                </span>
                <span>{cow}</span>
              </div>
              <div className="beef">
                <span className="beef-icon">
                  <img src={Beef} />
                </span>
                <span>{beef}</span>
              </div>
              <div className="patty">
                <span className="patty-icon">
                  <img src={Patty} />
                </span>
                <span>{patty}</span>
              </div>
            </div>
            <div className="sell-button-container">
              <button className="sell-button">
                <img src={Sell} />
              </button>
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
