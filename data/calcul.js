const tierPricing = {
  standard: 20000,
  premium: 35000,
  excelium: 55000
};

function calcResidential(apartments, floors, tier) {
  const elevators = Math.ceil((apartments / floors) / 6);
  const banks = Math.floor(floors / 20);
  const totalElevators = banks > 0 ? elevators * (banks + 1) : elevators;
  const total_cost = totalElevators * tierPricing[tier];
  return { elevators_required: totalElevators, total_cost };
}

module.exports = { calcResidential, tierPricing };
