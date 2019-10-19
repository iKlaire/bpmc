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

let energyCap = 100;
let pricePerPatty = 1.5;

const resourcesState = {
  cow: 0,
  beef: 0,
  patty: 0,
  money: 10,
  energy: energyCap,
  employee: 0,
  gg: 1,
  seaLevel: 0,
  temperature: 28
};

const resourceMultipliers = {
  buyCow: {
    cow: 1,
    money: -0.5,
    energy: -1,
    gg: 1,
    description: 'You buy a cow. A dead cow.'
  },
  processCow: {
    cow: -1,
    beef: 1,
    money: -0.3,
    energy: -1,
    gg: 1,
    description: 'You process the dead cow. Into beef patties.'
  },
  packagePatty: {
    beef: -1,
    patty: 1,
    money: -0.2,
    energy: -1,
    gg: 1,
    description: 'You package the beef patties'
  }
};

const calculateEnvironmentalChanges = () => {
  const { gg } = resourcesState;
  resourcesState.temperature = gg / 200000 + 28;
  resourcesState.seaLevel = (resourcesState.temperature - 28) * 5;
};

const handleAction = actionName => {
  Object.keys(resourceMultipliers[actionName]).forEach(resource => {
    resourcesState[resource] = resourcesState[resource] + resourceMultipliers.buyCow[resource];
  });
};

const handleSellButton = () => {
  const { money, patty, gg } = resourcesState;

  const updatedState = {
    money: money + patty * pricePerPatty,
    patty: 0,
    energy: energyCap,
    seaLevel,
    temperature
  };

  if (Math.random() < 0.2 && gg > 1) {
    updatedState.gg = gg - 1;
  } else {
    updatedState.gg = gg + 1;
  }

  resourcesState = {
    ...resourcesState,
    ...updatedState
  };

  calculateEnvironmentalChanges();
};

module.exports = {
  handleStageProgression,
  handleAction,
  handleSellButton
};

const upgrades = [
  {
    label: 'Improve Meat Quality',
    desc: 'RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)',
    stage: 1,
    actionUsed: 0,
    costIncrement: 500,
    cost: 1000,
    updateResourceMultiplier: function() {
      const { buyCow } = resourceMultipliers;
      buyCow.money = buyCow.money * 1.01;
      buyCow.energy = buyCow.energy * 1.01;
      buyCow.gg = buyCow.gg * 1.01;
      pricePerPatty = pricePerPatty * 1.01;
      this.actionUsed++;
      resourcesState.money = resourcesState.money - this.cost;
      this.cost = this.cost + this.costIncrement;
    }
  },
  {
    label: 'Reduce Process Cost',
    desc: 'RM 2000++ each, reduce Process Cow price, increase energy usage, increase GG impact (a)',
    stage: 1,
    actionUsed: 0,
    costIncrement: 1000,
    cost: 2000,
    updateResourceMultiplier: function() {
      const { packagePatty } = resourceMultipliers;
      packagePatty.money = packagePatty.money * 0.99;
      pricePerPatty = pricePerPatty * 0.01;
      this.actionUsed++;
      resourcesState.money = resourcesState.money - this.cost;
      this.cost = this.cost + this.costIncrement;
    }
  },
  {
    label: 'Golden Grass',
    desc: 'Increase price of beef patties by 10%, at the cost of environmental impact',
    stage: 3,
    actionUsed: 0,
    costMultiplier: 1.9,
    cost: 100000,
    updateResourceMultiplier: function() {
      const { buyCow } = resourceMultipliers;

      buyCow.gg = buyCow.gg + 2;
      pricePerPatty = pricePerPatty * 1.1;

      resourcesState.money = resourcesState.money - this.cost;

      this.actionUsed++;
      this.cost = this.cost + this.costMultiplier;
    }
  },
  {
    label: 'Hire Worker',
    desc: 'Increase price of beef patties by 10%, at the cost of environmental impact',
    stage: 3,
    actionUsed: 0,
    costMultiplier: 1.9,
    cost: 35000,
    updateResourceMultiplier: function() {
      const { buyCow } = resourceMultipliers;

      buyCow.gg = buyCow.gg + 2;
      pricePerPatty = pricePerPatty * 1.1;

      resourcesState.money = resourcesState.money - this.cost;

      this.actionUsed++;
      this.cost = this.cost + this.costMultiplier;
    }
  }
];

// Improve meat quality - RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)
// Reduce Process Cost - RM 2000++ each, reduce Process Cow price, increase energy usage, increase GG impact (a)
// Reduce Package - RM 2000++ each, reduce Package Patty price, increase energy usage, increase GG impact (a)
// Red Bull - RM 5000++ each, increase energy by 5
// Strike A Deal - RM5,000, increase Buy Cow price by 1.8, get 2 cows each time, single usage
// Build Workshop - RM 10,000, halve Process and Package costs, energy usage, single purchase, increase GG impact (m)
// Purchase Advertisements - RM 30,000, increase Sell Patty price by 50% additively, single purchase
// Set up Company - RM 20,000, requires Build Workshop, unlock Public Relations, third stage
// Hire Employee - RM 10,000++ each, reduce energy usage, max 10
