import React, { useState } from "./node_modules/react";

const Resources = props => {
  const [cow, setCow] = useState({
    label: "Beef Patty",
    desc: "Produced by the player. All sold at once",
    cost: 0.5,
    countMultiplier: 1,
    costMultiplier: 1
  });
  const [beefPatty, setBeefPatty] = useState({
    label: "Beef Patty",
    desc: "Produced by the player. All sold at once",
    cost: 1,
    countMultiplier: 1,
    costMultiplier: 1
  });
  const [energy, setEnergy] = useState({
    label: "Energy",
    desc:
      "Can be increased through upgrades or number of people. Affected by the efficiency multiplier.",
    cost: 1,
    countMultiplier: 1,
    costMultiplier: 1
  });
  const [money, setMoney] = useState({
    label: "Money",
    desc: "Money currency, spent to generate more.",
    cost: 1,
    countMultiplier: 1,
    costMultiplier: 1
  });

  return <div></div>;
};

export default Resources;
