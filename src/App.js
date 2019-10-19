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
import AlertBox from './components/AlertBox/AlertBox';

const onTest = () => {
  // TODO: Do custom function name here
  console.log('Check your console!!!');
  // TODO: Do custom function here
};

const App = () => {
  const [energyCap, setEnergyCap] = useState(100);
  const [pricePerPatty, setPricePerPatty] = useState(1.5);

  const [resourcesState, setResourcesState] = useState({
    cow: 0,
    beef: 0,
    patty: 0,
    money: 10000,
    energy: energyCap,
    employee: 0,
    gg: 1,
    seaLevel: 0,
    temperature: 10
  });

  const actions = {
    one: [
      {
        label: 'Buy Cow',
        description: 'You buy a cow. A dead cow.',
        energy: 10,
        money: 0.5,
        onClick: () => handleAction('buyCow')
      },
      {
        label: 'Process Cow',
        description: 'You process the dead cow. Into beef.',
        energy: 10,
        money: 0.3,
        onClick: () => handleAction('processCow')
      },
      {
        label: 'Package Patty',
        description: 'You patty the beef. Then package it.',
        energy: 10,
        money: 0.2,
        onClick: () => handleAction('packagePatty')
      }
    ],
    two: [
      {
        label: 'Improve Meat Quality',
        description: 'RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 1000,
        updateResourceMultiplier: function() {
          const { buyCow } = resourceMultipliers;
          const newState = resourcesState;

          console.log(this.money);

          buyCow.money = buyCow.money * 1.01;
          buyCow.energy = buyCow.energy * 1.01;
          buyCow.gg = buyCow.gg * 1.01;
          setPricePerPatty(pricePerPatty * 1.01);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      }
    ]
  };
  const data = [
    { name: 'Page A', uv: 1, amt: 2400 },
    { name: 'Page B', uv: 2, amt: 12 },
    { name: 'Page C', uv: 88, amt: 678 },
    { name: 'Page D', uv: 777, amt: 3 },
    { name: 'Page E', uv: 1800, amt: 137 },
    { name: 'Page F', uv: 6000, amt: 888 }
  ];

  const handleStageProgression = props => {
    const { stage, statistics, resources, achievements } = props;
    switch (stage) {
      case 1:
        return resources.money > 1000;
      case 2:
        return achievements.openCompany;
      case 3:
        return achievements.ipo;
      case 4:
        return achievements.ipo;
      default:
        return false;
    }
  };

  const resourceMultipliers = {
    buyCow: {
      cow: 1,
      money: -0.5,
      energy: -10,
      gg: 1
    },
    processCow: {
      cow: -1,
      beef: 1,
      money: -0.3,
      energy: -10,
      gg: 1
    },
    packagePatty: {
      beef: -1,
      patty: 1,
      money: -0.2,
      energy: -10,
      gg: 1
    }
  };

  const updateEnvironmentalChanges = () => {
    const newState = { ...resourcesState };
    newState.temperature = newState.gg / 20000 + 10;
    newState.seaLevel = (newState.temperature - 10) * 5;

    setResourcesState(newState);
  };

  const handleAction = actionName => {
    const newState = { ...resourcesState };

    if (
      newState.energy >= Math.abs(resourceMultipliers[actionName].energy) &&
      ((actionName === 'processCow' && newState.cow >= Math.abs(resourceMultipliers.processCow.cow)) ||
        (actionName === 'packagePatty' && newState.beef >= Math.abs(resourceMultipliers.packagePatty.beef)) ||
        actionName === 'buyCow')
    ) {
      const resources = Object.keys(resourceMultipliers[actionName]);
      for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        newState[resource] = newState[resource] + resourceMultipliers[actionName][resource];
      }

      setResourcesState(newState);
    }
  };

  const handleSellButton = () => {
    const newState = { ...resourcesState };

    newState.money = newState.money + newState.patty * pricePerPatty;
    newState.patty = 0;
    newState.energy = energyCap;

    if (Math.random() < 0.2 && newState.gg > 1) {
      newState.gg = newState.gg - 1;
    } else {
      newState.gg = newState.gg + 1;
    }

    updateEnvironmentalChanges();
    setResourcesState(newState);
  };

  const upgrades = {
    two: [
      {
        label: 'Improve meat quality',
        description: 'RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 1000,
        updateResourceMultiplier: function() {
          const { buyCow } = resourceMultipliers;
          const newState = resourcesState;

          buyCow.money = buyCow.money * 1.01;
          buyCow.energy = buyCow.energy * 1.01;
          buyCow.gg = buyCow.gg * 1.01;
          setPricePerPatty(pricePerPatty * 1.01);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      },
      {
        label: 'Reduce Process Cost',
        description: 'RM 2000++ each, reduce Process Cow price, increase energy usage, increase GG impact (a)',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 2000,
        updateResourceMultiplier: function() {
          const { processCow } = resourceMultipliers;
          const newState = resourcesState;

          processCow.money = processCow.money * 0.99;
          processCow.energy = processCow.energy - 2;
          processCow.gg = processCow.gg * 1.1;

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      },
      {
        label: 'Red Bull',
        description: 'RM 5000++ each, increase energy by 5',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 5000,
        updateResourceMultiplier: function() {
          const { packagePatty } = resourceMultipliers;
          const newState = resourcesState;

          packagePatty.money = packagePatty.money * 0.99;
          setPricePerPatty(pricePerPatty * 0.01);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      },
      {
        label: 'Strike A Deal',
        description: 'RM5,000, increase Buy Cow price by 1.8, get 2 cows each time, single usage',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 2000,
        updateResourceMultiplier: function() {
          const { packagePatty } = resourceMultipliers;
          const newState = resourcesState;

          packagePatty.money = packagePatty.money * 0.99;
          setPricePerPatty(pricePerPatty * 0.01);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      },
      {
        label: 'Build Workshop',
        description: 'RM 10,000, halve Process and Package costs, energy usage, single purchase, increase GG impact (m)',
        stage: 2,
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 2000,
        updateResourceMultiplier: function() {
          const { packagePatty } = resourceMultipliers;
          const newState = resourcesState;

          packagePatty.money = packagePatty.money * 0.99;
          setPricePerPatty(pricePerPatty * 0.01);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money * this.costMultiplier;

          setResourcesState(newState);
        }
      }
    ],
    three: [
      {
        label: 'Golden Grass',
        description: 'Increase price of beef patties by 10%, at the cost of environmental impact',
        stage: 3,
        actionUsed: 0,
        costMultiplier: 1.9,
        money: 100000,
        updateResourceMultiplier: function() {
          const { buyCow } = resourceMultipliers;
          const newState = resourcesState;

          buyCow.gg = buyCow.gg + 2;
          setPricePerPatty(pricePerPatty * 1.1);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money + this.costMultiplier;

          setResourcesState(newState);
        }
      },
      {
        label: 'Hire Worker',
        description: 'Reduce energy usage of Actions by 2.',
        stage: 3,
        actionUsed: 0,
        costMultiplier: 1.9,
        money: 35000,
        updateResourceMultiplier: function() {
          const { buyCow } = resourceMultipliers;
          const newState = resourcesState;

          buyCow.gg = buyCow.gg + 2;
          setPricePerPatty(pricePerPatty * 1.1);

          newState.money = newState.money - this.money;

          this.actionUsed++;
          this.money = this.money + this.costMultiplier;

          setResourcesState(newState);
        }
      }
    ]
  };

  // Purchase Advertisements - RM 30,000, increase Sell Patty price by 50% additively, single purchase
  // Set up Company - RM 20,000, requires Build Workshop, unlock Public Relations, third stage
  // Hire Employee - RM 10,000++ each, reduce energy usage, max 10

  return (
    <div className="container">
      <AlertBox
        title="Congratulations"
        imageUrl="https://developers.video.ibm.com/images/example-channel-nasa.jpg"
        message="U earn nothing!"
        buttons={[{ label: 'Yes', function: onTest }, { label: 'No' }]}
      />
      <div className="game-container">
        <div className="header-container">
          <div className="money-container">
            <span className="money-icon">
              <img src={Money} />
            </span>
            <span className="money-count">{resourcesState.money}</span>
          </div>
          <div className="energy-container">
            <span className="energy-icon">
              <img src={Energy} />
            </span>
            <span className="energy-count">
              {resourcesState.energy}/{energyCap}
            </span>
          </div>
          <div className="employees-container">
            <span className="employees-icon">
              <img src={Employees} />
            </span>
            <span className="employees-count">{resourcesState.employee}</span>
          </div>
        </div>
        <div className="stats-container">
          <div className="stats">
            <div className="temperature">
              <img src={Thermometer} />
              {resourcesState.temperature}°c
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
              <div className="chart-title">Sea Level</div>
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
                <span>{resourcesState.cow}</span>
              </div>
              <div className="beef">
                <span className="beef-icon">
                  <img src={Beef} />
                </span>
                <span>{resourcesState.beef}</span>
              </div>
              <div className="patty">
                <span className="patty-icon">
                  <img src={Patty} />
                </span>
                <span>{resourcesState.patty}</span>
              </div>
            </div>
            <div className="sell-button-container">
              <button className="sell-button" onClick={handleSellButton}>
                <img src={Sell} />
              </button>
            </div>
          </div>
          <div className="actions-list">
            <div className="actions-card">
              {actions.one.map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">🈳</div>
                  <div className="action-content">
                    <span className="action-label">{action.label}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button" onClick={action.onClick}>
                      🔋 {action.energy}
                      <br /> 💲 {action.money}
                    </button>
                  </div>
                </div>
              ))}
              {actions.two.map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">🈳</div>
                  <div className="action-content">
                    <span className="action-label">{action.label}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button" onClick={action.updateResourceMultiplier}>
                      💲 {action.money}
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
};

export default App;
