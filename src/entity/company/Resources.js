import React, { useState } from "./node_modules/react";

const Resources = props => {
  const [beefPatty, setBeefPatty] = useState({
    name: "Beef Patty",
    desc: "Produced by the player. All sold at once",
    value: 0
  });
  const [energy, setEnergy] = useState({
    name: "Energy",
    desc:
      "Can be increased through upgrades or number of people. Affected by the efficiency multiplier.",
    value: 100
  });
  const [money, setMoney] = useState({
    name: "Money",
    desc: "Money currency, spent to generate more.",
    value: 10
  });

  return <div></div>;
};

export default Resources;
