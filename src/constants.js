export default {
  // This is how long it takes for each tick (game's unit of time)
  TickInterval: 80,

  // This is how much a player earns by default on each tick
  BaseIncome: 10,

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
  BuyItemRequirementMultiplier: 5,

  // Those are all the items in the game
  BaseItems: [
    { id: 1, name: 'Income Generator I',  type: 'IncomeGenerator', basePrice: 100, income: 2 },
    { id: 2, name: 'Income Generator II', type: 'IncomeGenerator', basePrice: 400, income: 9 },
  ]
}
