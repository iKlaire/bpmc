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
  temperature: 10
};

const resourceMultipliers = {
  buyCow: {
    cow: 1,
    money: -0.5,
    energy: -1,
    gg: 1
  },
  processCow: {
    cow: -1,
    beef: 1,
    money: -0.3,
    energy: -1,
    gg: 1
  },
  packagePatty: {
    beef: -1,
    patty: 1,
    money: -0.2,
    energy: -1,
    gg: 1
  }
};

const updateEnvironmentalChanges = () => {
  const { gg } = resourcesState;
  resourcesState.temperature = gg / 20000 + 10;
  resourcesState.seaLevel = (resourcesState.temperature - 10) * 5;
};

const handleAction = actionName => {
  Object.keys(resourceMultipliers[actionName]).forEach(resource => {
    resourcesState[resource] = resourcesState[resource] + resourceMultipliers.buyCow[resource];
  });
};

const handleSellButton = () => {
  const { money, patty, gg } = resourcesState;

  resourcesState.money = money + patty * pricePerPatty;
  resourcesState.patty = 0;
  resourcesState.energy = energyCap;

  if (Math.random() < 0.2 && gg > 1) {
    resourcesState.gg = gg - 1;
  } else {
    resourcesState.gg = gg + 1;
  }
  updateEnvironmentalChanges();
};

module.exports = {
  handleStageProgression,
  handleAction,
  handleSellButton
};

const upgrades = {
  two: [
    {
      // Improve meat quality - RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)
      label: 'Improve meat quality',
      desc: 'RM 1000++ each, increase Buy Cow and Sell Patty price, energy usage, increase GG impact for Buy Cow (a)',
      stage: 2,
      actionUsed: 0,
      costMultiplier: 1.5,
      cost: 1000,
      updateResourceMultiplier: function() {
        const { buyCow } = resourceMultipliers;
        buyCow.money = buyCow.money * 1.01;
        buyCow.energy = buyCow.energy * 1.01;
        buyCow.gg = buyCow.gg * 1.01;
        pricePerPatty = pricePerPatty * 1.01;
        this.actionUsed++;
        resourcesState.money = resourcesState.money - this.cost;
        this.cost = this.cost * this.costMultiplier;
      }
    },
    {
      // Reduce Process Cost - RM 2000++ each, reduce Process Cow price, increase energy usage, increase GG impact (a)
      label: 'Reduce Process Cost',
      desc: 'RM 2000++ each, reduce Process Cow price, increase energy usage, increase GG impact (a)',
      stage: 2,
      actionUsed: 0,
      costMultiplier: 1.5,
      cost: 2000,
      updateResourceMultiplier: function() {
        const { processCow } = resourceMultipliers;
        processCow.money = processCow.money * 0.99;
        processCow.energy = processCow.energy - 2;
        processCow.gg = processCow.gg * 1.1;
        this.actionUsed++;
        resourcesState.money = resourcesState.money - this.cost;
        this.cost = this.cost * this.costMultiplier;
      }
    },
    {
      // Red Bull - RM 5000++ each, increase energy by 5
      label: 'Red Bull',
      desc: 'RM 5000++ each, increase energy by 5',
      stage: 2,
      actionUsed: 0,
      costMultiplier: 1.5,
      cost: 5000,
      updateResourceMultiplier: function() {
        const { packagePatty } = resourceMultipliers;
        packagePatty.money = packagePatty.money * 0.99;
        pricePerPatty = pricePerPatty * 0.01;
        this.actionUsed++;
        resourcesState.money = resourcesState.money - this.cost;
        this.cost = this.cost * this.costMultiplier;
      }
    },
    {
      // Strike A Deal - RM5,000, increase Buy Cow price by 1.8, get 2 cows each time, single usage
      label: 'Strike A Deal',
      desc: 'RM5,000, increase Buy Cow price by 1.8, get 2 cows each time, single usage',
      stage: 2,
      actionUsed: 0,
      costMultiplier: 1.5,
      cost: 2000,
      updateResourceMultiplier: function() {
        const { packagePatty } = resourceMultipliers;
        packagePatty.money = packagePatty.money * 0.99;
        pricePerPatty = pricePerPatty * 0.01;
        this.actionUsed++;
        resourcesState.money = resourcesState.money - this.cost;
        this.cost = this.cost * this.costMultiplier;
      }
    },
    {
      // Build Workshop - RM 10,000, halve Process and Package costs, energy usage, single purchase, increase GG impact (m)
      label: 'Build Workshop',
      desc: 'RM 10,000, halve Process and Package costs, energy usage, single purchase, increase GG impact (m)',
      stage: 2,
      actionUsed: 0,
      costMultiplier: 1.5,
      cost: 2000,
      updateResourceMultiplier: function() {
        const { packagePatty } = resourceMultipliers;
        packagePatty.money = packagePatty.money * 0.99;
        pricePerPatty = pricePerPatty * 0.01;
        this.actionUsed++;
        resourcesState.money = resourcesState.money - this.cost;
        this.cost = this.cost * this.costMultiplier;
      }
    }
  ]
};

// Purchase Advertisements - RM 30,000, increase Sell Patty price by 50% additively, single purchase
// Set up Company - RM 20,000, requires Build Workshop, unlock Public Relations, third stage
// Hire Employee - RM 10,000++ each, reduce energy usage, max 10
