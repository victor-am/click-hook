export default {
  // This is how long it takes for each tick (game's unit of time)
  TickInterval: 80,

  // This is how much a player earns by default on each tick
  BaseIncome: 0,

  // This is how much a player earns by one click
  ClickIncome: 1,

  // This is how much the price of an item goes up based on the number
  // of the same item owned by the player
  //
  // The bigger the number, the less the owned assets of the player
  // impact on their next buys prices
  ItemPriceCoeficient: 10,

  // This is how much earned money the player have to make to
  // unlock each item in the store.
  //
  // The bigger the number, the longer the items take to show up in the shop
  BuyItemRequirementMultiplier: 3,

  // Those are all the items in the game
  BaseItems: [
    { id: 1, name: 'Income Generator I',   type: 'IncomeGenerator', basePrice: 10,    income: 0.1 },
    { id: 2, name: 'Income Generator II',  type: 'IncomeGenerator', basePrice: 100,   income: 1 },
    { id: 3, name: 'Income Generator III', type: 'IncomeGenerator', basePrice: 400,   income: 3 },
    { id: 4, name: 'Income Generator VI',  type: 'IncomeGenerator', basePrice: 1600,  income: 8 },
    { id: 5, name: 'Income Generator V',   type: 'IncomeGenerator', basePrice: 4000,  income: 20 },
    { id: 6, name: 'Income Generator VI',  type: 'IncomeGenerator', basePrice: 10000, income: 50 },
  ]
}
