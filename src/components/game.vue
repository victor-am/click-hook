<template>
  <div>
    <p>You have ${{ currency }}</p>
    <p>You are generating ${{ incomePerSecond }} per second</p>
    <button @click="generateClickIncome">Get Ca$h</button>

    <template v-for="item in inventory">
      <div :key="item.id" style="border: 1px solid grey; border-radius: 6px; width: 33%;">
        <p><strong>{{ item.name  }}</strong></p>
        <p>You have: x{{ item.quantity }}</p>
        <p>Price: ${{ itemPrice(item) }}</p>
        <p>Income Generation: {{ fromTickToSecond(item.income) }}</p>

        <button @click="buy(item.id)">Buy</button>
      </div>
    </template>
  </div>
</template>

<script>
  // This is how long it takes for each tick (game's unit of time)
  const TickInterval = 500

  // This is how much a player earns by default on each tick
  const BaseIncome = 1

  // This is how much a player earns by one click
  const ClickIncome = 1

  // This is how much the price of an item goes up based on the number
  // of the same item owned by the player
  //
  // The bigger the number, the less the owned assets of the player
  // impact on their next buys prices
  const ItemPriceCoeficient = 4

  // Those are all the items in the game
  const Items = [
    { id: 1, name: 'Income Generator I', type: 'IncomeGenerator', basePrice: 100, income: 2 }
  ]

  export default {
    name: 'Game',

    data () {
      return {
        currency:  0,
        inventory: Items.map((i) => Object.assign(i, { quantity: 0 }))
      }
    },

    mounted() {
      this.scheduleIncome()
    },

    methods: {
      scheduleIncome() {
        window.setTimeout(this.generateIncome, TickInterval)
      },

      generateIncome() {
        this.currency += this.incomePerTick
        this.scheduleIncome()
      },

      generateClickIncome() {
        this.currency += ClickIncome
      },

      buy(id) {
        let item  = this.findItem(id)
        let price = this.itemPrice(item)

        if (this.currency >= price) {
          item.quantity += 1
          this.currency -= price
        }
      },

      findItem(id) {
        return this.inventory.find((i) => i.id === id)
      },

      itemsWithType(type) {
        return this.inventory.filter((i) => i.type === type)
      },

      fromTickToSecond(income) {
        let multiplier = 1000 / TickInterval
        return income * multiplier
      },

      itemPrice(item) {
        let base  = item.basePrice
        let owned = item.quantity

        return base + ((base / ItemPriceCoeficient) * owned)
      }
    },

    computed: {
      incomePerTick() {
        let base       = BaseIncome
        let generators = this.generatorsIncome
        return base + generators
      },

      generatorsIncome() {
        let generators  = this.itemsWithType('IncomeGenerator')
        let incomes     = generators.map((g) => g.income * g.quantity)
        let incomesSum  = incomes.reduce((x, y) => x + y )
        return incomesSum
      },

      incomePerSecond() {
        return this.fromTickToSecond(this.incomePerTick)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
