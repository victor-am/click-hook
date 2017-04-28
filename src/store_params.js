import Config from '@/constants'

const StartingInventory = Config.BaseItems.map((i) => Object.assign(i, { quantity: 0 }))

export default {
  state: {
    currency: {
      earned: 0,
      spent: 0
    },
    inventory: StartingInventory
  },

  mutations: {
    income(state, amount) {
      state.currency.earned += amount
    },

    buy(state, params) {
      let item = state.inventory.find((i) => i.id == params.id)
      state.currency.spent += params.price
      item.quantity += 1
    }
  }
}
