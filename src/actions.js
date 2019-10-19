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

module.exports = {
  handleStageProgression
};
