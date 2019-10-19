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
import GameOver from './gameover.png';
import Act from './act.jpg';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import AlertBox from './components/AlertBox/AlertBox';
import GameOverAlertBox from './components/GameOverAlertBox/GameOverAlertBox';

const onTest = () => {
  // TODO: Do custom function name here
  console.log('Check your console!!!');
  // TODO: Do custom function here
};

const App = () => {
  const [energyCap, setEnergyCap] = useState(100);
  const [pricePerPatty, setPricePerPatty] = useState(2);
  const [day, setDay] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [todayGG, setTodayGG] = useState(0);

  const [resourcesState, setResourcesState] = useState({
    cow: 0,
    beef: 0,
    patty: 0,
    money: 10000000000,
    energy: energyCap,
    employee: 0,
    gg: 1,
    seaLevel: 0,
    temperature: 10
  });

  const animateMinusMoney = async () => {
    const moneyContainer = document.getElementsByClassName('money-container')[0];
    moneyContainer.classList.toggle('minus');
    await setTimeout(() => moneyContainer.classList.toggle('minus'), 200);
  };

  const [actions, setActions] = useState({
    one: {
      buyCow: {
        label: 'Buy Cow',
        description: 'You buy a cow. A dead cow.',
        energy: 10,
        money: 0.5,
        cow: 1,
        gg: 1,
        onClick: () => handleAction('buyCow')
      },
      processCow: {
        label: 'Process Cow',
        description: 'You process the dead cow. Into beef.',
        energy: 10,
        money: 0.3,
        cow: 1,
        beef: 1,
        gg: 1,
        onClick: () => handleAction('processCow')
      },
      packagePatty: {
        label: 'Package Patty',
        description: 'You patty the beef. Then package it.',
        energy: 10,
        money: 0.2,
        beef: 1,
        patty: 1,
        gg: 1,
        onClick: () => handleAction('packagePatty')
      }
    },
    two: {
      improveMeatQuality: {
        label: 'Improve Meat Quality',
        description: 'Increase Buy Cow and Sell Cow price by 1%, at the cost of increasing GG impact',
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 1000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.two.improveMeatQuality.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.two.improveMeatQuality;
              newActions.one.buyCow.money = newActions.one.buyCow.money * 1.01;
              newActions.one.buyCow.energy = newActions.one.buyCow.energy * 1.01;
              newActions.one.buyCow.gg = newActions.one.buyCow.gg * 1.01;
              setPricePerPatty(pricePerPatty * 1.01);

              const newState = {
                money: initialState.money - money
              };

              newActions.two.improveMeatQuality.actionUsed += 1;
              newActions.two.improveMeatQuality.money = newActions.two.improveMeatQuality.money * costMultiplier;

              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      reduceProcessCost: {
        label: 'Reduce Process Cost',
        description: 'Reduce Process Cow price by 1%, at the cost of increased energy usage and GG impact',
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 2000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.two.reduceProcessCost.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.two.reduceProcessCost;
              newActions.one.processCow.money = newActions.one.processCow.money * 0.99;
              newActions.one.processCow.energy = newActions.one.processCow.energy + 2;
              newActions.one.processCow.gg = newActions.one.processCow.gg * 1.1;

              const newState = {
                money: initialState.money - money
              };

              newActions.two.reduceProcessCost.actionUsed += 1;
              newActions.two.reduceProcessCost.money = newActions.two.reduceProcessCost.money * costMultiplier;

              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      reducePackageCost: {
        label: 'Reduce Package Cost',
        description: 'Reduce Package Cow price by 1%, at the cost of increased energy usage and GG impact',
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 2000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.two.reducePackageCost.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.two.reducePackageCost;
              newActions.one.packagePatty.money = newActions.one.packagePatty.money * 0.99;
              newActions.one.packagePatty.energy = newActions.one.packagePatty.energy + 2;
              newActions.one.packagePatty.gg = newActions.one.packagePatty.gg * 1.1;

              const newState = {
                money: initialState.money - money
              };

              newActions.two.reducePackageCost.actionUsed += 1;
              newActions.two.reducePackageCost.money = newActions.two.reducePackageCost.money * costMultiplier;

              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      redBull: {
        label: 'Red Bull',
        description: 'Increase maximum energy per day',
        actionUsed: 0,
        costMultiplier: 3,
        money: 5000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.two.redBull.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.two.redBull;

              const newState = {
                money: initialState.money - money
              };

              newActions.two.redBull.actionUsed += 1;
              newActions.two.redBull.money = newActions.two.redBull.money * costMultiplier;

              setEnergyCap(initialCap => initialCap + 5);
              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      strikeADeal: {
        label: 'Strike A Deal',
        description: 'Get 5 times the number of cows per buy, at 1.5 times the cost',
        actionUsed: 0,
        money: 2000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.two.strikeADeal.money) {
                const newActions = { ...actions };
                const { money } = actions.two.strikeADeal;
                newActions.one.buyCow.money = newActions.one.buyCow.money * 1.5;
                newActions.one.buyCow.cow = newActions.one.buyCow.cow * 5;

                const newState = {
                  money: initialState.money - money
                };

                newActions.two.strikeADeal.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      buildWorkshop: {
        label: 'Build Workshop',
        description: 'Reduce Process and Package price and energy usage significantly, while increasing GG impact',
        actionUsed: 0,
        money: 10000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.two.buildWorkshop.money) {
                const newActions = { ...actions };
                const { money } = actions.two.buildWorkshop;
                newActions.one.processCow.money = newActions.one.processCow.money * 0.5;
                newActions.one.processCow.energy = newActions.one.processCow.energy * 0.5;
                newActions.one.processCow.gg = newActions.one.processCow.gg + 3;
                newActions.one.packagePatty.money = newActions.one.packagePatty.money * 0.5;
                newActions.one.packagePatty.energy = newActions.one.packagePatty.energy * 0.5;
                newActions.one.packagePatty.gg = newActions.one.packagePatty.gg + 3;

                const newState = {
                  money: initialState.money - money
                };

                newActions.two.buildWorkshop.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      purchaseAdvertisements: {
        label: 'Purchase Advertisements',
        description: 'Increase Sell Patty price by 50%',
        actionUsed: 0,
        money: 30000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.two.purchaseAdvertisements.money) {
                const newActions = { ...actions };
                const { money } = actions.two.purchaseAdvertisements;
                setPricePerPatty(pricePerPatty * 1.5);

                const newState = {
                  money: initialState.money - money
                };

                newActions.two.purchaseAdvertisements.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      setUpCompany: {
        label: 'Set Up Company',
        description: 'Increase Sell Patty price, unlock Public Relations and third stage',
        actionUsed: 0,
        money: 20000,
        updateResourceMultiplier: function() {
          if (actions.two.buildWorkshop.actionUsed > 0 && this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.two.setUpCompany.money) {
                const newActions = { ...actions };
                const { money } = actions.two.setUpCompany;
                setPricePerPatty(pricePerPatty + 1000);

                const newState = {
                  money: initialState.money - money
                };

                newActions.two.setUpCompany.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      hireLabourer: {
        label: 'Hire Labourer',
        description: 'Reduce energy usage for all actions',
        actionUsed: 0,
        costMultiplier: 1.1,
        money: 10000,
        updateResourceMultiplier: function() {
          if (actions.two.setUpCompany.actionUsed > 0 && this.actionUsed < 10) {
            setResourcesState(initialState => {
              if (initialState.money > actions.two.hireLabourer.money) {
                const newActions = { ...actions };
                const { money, costMultiplier } = actions.two.hireLabourer;
                newActions.one.buyCow.energy = newActions.one.buyCow.energy - 1;
                newActions.one.processCow.energy = newActions.one.processCow.energy - 1;
                newActions.one.packagePatty.energy = newActions.one.packagePatty.energy - 1;

                const newState = {
                  money: initialState.money - money,
                  employee: initialState.employee + 1
                };

                newActions.two.hireLabourer.actionUsed += 1;
                newActions.two.hireLabourer.money = newActions.two.hireLabourer.money * costMultiplier;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      }
    },
    three: {},
    four: {
      hireEmployee: {
        label: 'Hire Employee',
        description: 'Reduce energy consumption even more',
        actionUsed: 0,
        costMultiplier: 1.5,
        money: 1000000,
        updateResourceMultiplier: function() {
          if (this.actionUsed < 100) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.hireEmployee.money) {
                const newActions = { ...actions };
                const { money, costMultiplier } = actions.four.hireEmployee;
                newActions.one.buyCow.energy = newActions.one.buyCow.energy - 2;
                newActions.one.processCow.energy = newActions.one.processCow.energy - 2;
                newActions.one.packagePatty.energy = newActions.one.packagePatty.energy - 2;

                const newState = {
                  money: initialState.money - money,
                  employee: initialState.employee + 1
                };

                newActions.four.hireEmployee.actionUsed += 1;
                newActions.four.hireEmployee.money = newActions.four.hireEmployee.money * costMultiplier;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      minotaurPower: {
        label: 'Minotaur Power',
        description: 'Increase maximum energy per day even more',
        actionUsed: 0,
        costMultiplier: 4,
        money: 10000000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.four.minotaurPower.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.four.minotaurPower;

              const newState = {
                money: initialState.money - money
              };

              newActions.four.minotaurPower.actionUsed += 1;
              newActions.four.minotaurPower.money = newActions.four.minotaurPower.money * costMultiplier;

              setEnergyCap(initialCap => initialCap + 15);
              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      hireFactoryManager: {
        label: 'Hire Factory Manager',
        description: 'Reduce Process and Package costs by 35%',
        actionUsed: 0,
        costMultiplier: 8,
        money: 10000000,
        updateResourceMultiplier: function() {
          setResourcesState(initialState => {
            if (initialState.money > actions.four.hireFactoryManager.money) {
              const newActions = { ...actions };
              const { money, costMultiplier } = actions.four.hireFactoryManager;
              newActions.one.processCow.money = newActions.one.processCow.money * 0.65;
              newActions.one.packagePatty.money = newActions.one.packagePatty.money * 0.65;

              const newState = {
                money: initialState.money - money
              };

              newActions.four.hireFactoryManager.actionUsed += 1;
              newActions.four.hireFactoryManager.money = newActions.four.hireFactoryManager.money * costMultiplier;

              setActions(newActions);
              animateMinusMoney();

              return { ...initialState, ...newState };
            } else {
              return initialState;
            }
          });
        }
      },
      buildFactory2: {
        label: 'Build Factory',
        description: 'Double Process and Package output, and also GG impact',
        actionUsed: 0,
        money: 1000,
        updateResourceMultiplier: function() {
          if (resourcesState.employee >= 60 && this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.buildFactory2.money) {
                const newActions = { ...actions };
                const { money } = actions.four.buildFactory2;
                newActions.one.processCow.beef = newActions.one.processCow.beef * 2;
                newActions.one.processCow.gg = newActions.one.processCow.gg * 2;
                newActions.one.packagePatty.patty = newActions.one.packagePatty.patty * 2;
                newActions.one.packagePatty.gg = newActions.one.packagePatty.gg * 2;

                const newState = {
                  money: initialState.money - money
                };

                newActions.four.buildFactory2.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      strikeTheBestDeal: {
        label: 'Strike The Best Deal',
        description: 'Get 10 times the number of cows per buy, at 5 times the cost',
        actionUsed: 0,
        money: 45000000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.strikeTheBestDeal.money) {
                const newActions = { ...actions };
                const { money } = actions.four.strikeTheBestDeal;
                newActions.one.buyCow.money = newActions.one.buyCow.money * 5;
                newActions.one.buyCow.cow = newActions.one.buyCow.cow * 10;

                const newState = {
                  money: initialState.money - money
                };

                newActions.four.strikeTheBestDeal.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      hireHRTeam: {
        label: 'Hire HR Team',
        description: 'Our cowatherapists will increase Sell Patty prices by a multiple of 10',
        actionUsed: 0,
        money: 50000000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.hireHRTeam.money) {
                const newActions = { ...actions };
                const { money } = actions.four.hireHRTeam;
                setPricePerPatty(pricePerPatty * 10);

                const newState = {
                  money: initialState.money - money
                };

                newActions.four.hireHRTeam.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      upgradeFactory: {
        label: 'Upgrade Factory',
        description: 'Triple Process and Package output, and also energy usage',
        actionUsed: 0,
        money: 100000000,
        updateResourceMultiplier: function() {
          if (this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.upgradeFactory.money) {
                const newActions = { ...actions };
                const { money } = actions.four.upgradeFactory;
                newActions.one.processCow.beef = newActions.one.processCow.beef * 3;
                newActions.one.processCow.energy = newActions.one.processCow.energy * 3;
                newActions.one.processCow.gg = newActions.one.processCow.gg * 3;
                newActions.one.packagePatty.beef = newActions.one.packagePatty.beef * 3;
                newActions.one.packagePatty.energy = newActions.one.packagePatty.energy * 3;
                newActions.one.packagePatty.gg = newActions.one.packagePatty.beef * 3;

                const newState = {
                  money: initialState.money - money
                };

                newActions.four.upgradeFactory.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      },
      runForPresident: {
        label: 'Run For President',
        description: 'Unlock fifth stage',
        actionUsed: 0,
        money: 200000000,
        updateResourceMultiplier: function() {
          if (actions.four.hireHRTeam.actionUsed > 0 && this.actionUsed === 0) {
            setResourcesState(initialState => {
              if (initialState.money > actions.four.runForPresident.money) {
                const newActions = { ...actions };
                const { money } = actions.four.runForPresident;

                const newState = {
                  money: initialState.money - money
                };

                newActions.four.runForPresident.actionUsed += 1;

                setActions(newActions);
                animateMinusMoney();

                return { ...initialState, ...newState };
              } else {
                return initialState;
              }
            });
          }
        }
      }
    }
  });

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

  const handleAction = actionName => {
    const action = actions.one[actionName];

    const toggleMinus = async () => {
      const moneyContainer = document.getElementsByClassName('money-container')[0];
      await moneyContainer.classList.toggle('minus');
      const energyContainer = document.getElementsByClassName('energy-container')[0];
      await energyContainer.classList.toggle('minus');
      setTimeout(() => moneyContainer.classList.toggle('minus'), 200);
      setTimeout(() => energyContainer.classList.toggle('minus'), 200);
    };
    setResourcesState(initialState => {
      if (initialState.energy >= action.energy && initialState.money >= action.money) {
        if (actionName === 'buyCow') {
          const newState = {
            energy: initialState.energy - action.energy,
            money: initialState.money - action.money,
            cow: initialState.cow + action.cow,
            gg: initialState.gg + action.gg
          };

          setTodayGG(initialGG => initialGG + action.gg);

          toggleMinus();

          return { ...initialState, ...newState };
        } else if (actionName === 'processCow' && initialState.cow >= action.cow) {
          const newState = {
            energy: initialState.energy - action.energy,
            money: initialState.money - action.money,
            cow: initialState.cow - action.cow,
            beef: initialState.beef + action.beef,
            gg: initialState.gg + action.gg
          };

          setTodayGG(initialGG => initialGG + action.gg);

          toggleMinus();

          return { ...initialState, ...newState };
        } else if (actionName === 'packagePatty' && initialState.beef >= action.beef) {
          const newState = {
            energy: initialState.energy - action.energy,
            money: initialState.money - action.money,
            beef: initialState.beef - action.beef,
            patty: initialState.patty + action.patty,
            gg: initialState.gg + action.gg
          };

          setTodayGG(initialGG => initialGG + action.gg);

          toggleMinus();

          return { ...initialState, ...newState };
        } else {
          return initialState;
        }
      } else {
        return initialState;
      }
    });
  };

  const handleSellButton = async () => {
    const newState = { ...resourcesState };

    newState.money = newState.money + newState.patty * pricePerPatty;
    newState.patty = 0;
    newState.energy = energyCap;

    if (Math.random() < 0.2 && newState.gg > 1) {
      newState.gg = newState.gg - 1;
    } else {
      newState.gg = newState.gg + 1;
    }

    newState.temperature = newState.gg / 20000 + 10;
    newState.seaLevel = (newState.temperature - 10) * 5;

    const newGraphData = [...graphData, { day, ggLevel: newState.gg, seaLevel: newState.seaLevel }];
    if (newGraphData.length > 6) {
      newGraphData.shift();
    }

    const visualContainer = document.getElementsByClassName('town-image')[0];
    const sellButton = document.getElementsByClassName('sell-button')[0];
    await sellButton.classList.toggle('animate');
    await visualContainer.classList.toggle('night');
    setTimeout(() => visualContainer.classList.toggle('night'), 1000);
    setTimeout(() => sellButton.classList.toggle('animate'), 200);

    setGraphData(newGraphData);
    setResourcesState(newState);
    setDay(day + 1);
  };

  // const upgrades = {
  //   three: [
  //     {
  //       label: 'Golden Grass',
  //       description: 'Increase price of beef patties by 10%, at the cost of environmental impact',
  //       stage: 3,
  //       actionUsed: 0,
  //       costMultiplier: 1.9,
  //       money: 100000,
  //       updateResourceMultiplier: function() {
  //         const { buyCow } = actions.one;
  //         const newState = resourcesState;

  //         buyCow.gg = buyCow.gg + 2;
  //         setPricePerPatty(pricePerPatty * 1.1);

  //         newState.money = newState.money - this.money;

  //         this.actionUsed++;
  //         this.money = this.money + this.costMultiplier;

  //         setResourcesState(newState);
  //       }
  //     },
  //     {
  //       label: 'Hire Worker',
  //       description: 'Reduce energy usage of Actions by 2.',
  //       stage: 3,
  //       actionUsed: 0,
  //       costMultiplier: 1.9,
  //       money: 35000,
  //       updateResourceMultiplier: function() {
  //         const { buyCow } = actions.one;
  //         const newState = resourcesState;

  //         buyCow.gg = buyCow.gg + 2;
  //         setPricePerPatty(pricePerPatty * 1.1);

  //         newState.money = newState.money - this.money;

  //         this.actionUsed++;
  //         this.money = this.money + this.costMultiplier;

  //         setResourcesState(newState);
  //       }
  //     }
  //   ]
  // };

  // Purchase Advertisements - RM 30,000, increase Sell Patty price by 50% additively, single purchase
  // Set up Company - RM 20,000, requires Build Workshop, unlock Public Relations, third stage
  // Hire Employee - RM 10,000++ each, reduce energy usage, max 10

  const generalAlertBox = (
    <AlertBox
      title="Congratulations"
      imageUrl={Employees}
      message="U earn nothing!"
      buttons={[{ label: 'Yes', function: onTest }, { label: 'No' }]}
    />
  );

  const gameOverAlertBox = <GameOverAlertBox imageUrl={GameOver} message={resourcesState} />;

  return (
    <div className="container">
      {/* {generalAlertBox} */}
      {gameOverAlertBox}
      <div className="game-container">
        <div className="header-container">
          <div className="money-container">
            <span className="money-icon">
              <img src={Money} />
            </span>
            <span className="money-count">{resourcesState.money.toFixed(2)}</span>
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
              {resourcesState.temperature.toFixed(2)}°c
            </div>
          </div>
          <div className="charts">
            <div className="chart-card">
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={graphData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="ggLevel" stroke="#ff7300" yAxisId={0} />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-title">GG Level</div>
            </div>
            <div className="chart-card">
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={graphData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="seaLevel" stroke="#ff7300" yAxisId={0} />
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
              <div className="actions-header solo">
                <span className="actions-header-text">Solo</span>
              </div>
              {Object.values(actions.one).map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">
                    <img src={Act} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">{action.label}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button" onClick={action.onClick}>
                      <div>
                        <img src={Money} /> {action.money.toFixed(2)}
                      </div>
                      <div>
                        <img src={Energy} /> {action.energy.toFixed(2)}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
              <div className="actions-header start-up">
                <span className="actions-header-text">Start up</span>
              </div>
              {Object.values(actions.two).map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">
                    <img src={Act} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">
                      {action.label}
                      <span className="action-bought">(bought: {action.actionUsed})</span>
                    </span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button" onClick={() => action.updateResourceMultiplier()}>
                      <div>
                        <img src={Money} /> {action.money.toFixed(2)}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
              <div className="actions-header sme">
                <span className="actions-header-text">Small company</span>
              </div>
              <div className="actions-header ipo">
                <span className="actions-header-text">Large company</span>
              </div>
              {Object.values(actions.four).map(action => (
                <div className="action" key={`${action.label}-key`}>
                  <div className="action-icon">
                    <img src={Act} />
                  </div>
                  <div className="action-content">
                    <span className="action-label">
                      {action.label}
                      <span className="action-bought">(bought: {action.actionUsed})</span>
                    </span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <div className="action-button-container">
                    <button className="action-button" onClick={() => action.updateResourceMultiplier()}>
                      <div>
                        <img src={Money} /> {action.money.toFixed(2)}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
              <div className="actions-header glc">
                <span className="actions-header-text">Government Corporation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
