// This is how long it takes for each tick (game's unit of time)
export const TickInterval = 250

// This is how much a player earns by default on each tick
export const BaseIncome = 0.5

// This is how much a player earns by one click
export const ClickIncome = 1

// This is how much the price of an item goes up based on the number
// of the same item owned by the player
//
// The bigger the number, the less the owned assets of the player
// impact on their next buys prices
export const ItemPriceCoeficient = 10

// Those are all the items in the game
export const BaseItems = [
  { id: 1, name: 'Income Generator I',  type: 'IncomeGenerator', basePrice: 100, income: 2 },
  { id: 2, name: 'Income Generator II', type: 'IncomeGenerator', basePrice: 400, income: 9 },
]

