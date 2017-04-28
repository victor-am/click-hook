<template>
  <div>
    <p>You have ${{ currencyInteger }}</p>
    <p>You are generating ${{ incomePerSecond }} per second</p>
    <button @click="generateClickIncome">Get Ca$h</button>

    <template v-for="item in inventory">
      <div :key="item.id" style="border: 1px solid grey; border-radius: 6px; width: 33%;">
        <p><strong>{{ item.name  }}</strong></p>
        <p>You have: x{{ item.quantity }}</p>
        <p>Price: ${{ itemPrice(item) }}</p>
        <p>Individual Income Generation: {{ fromTickToSecond(item.income) }}</p>
        <p>Generating: {{ fromTickToSecond(incomeFrom(item)) }}</p>

        <button @click="buy(item.id)">Buy</button>
      </div>
    </template>
  </div>
</template>

<script>
  import {
    TickInterval,
    BaseIncome,
    ClickIncome,
    ItemPriceCoeficient,
    BaseItems
  } from '@/constants'

  const Items = BaseItems.map((i) => Object.assign(i, { quantity: 0 }))

  export default {
    name: 'Game',

    data () {
      return {
        currency:  0,
        inventory: Items
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
        return Math.floor(income * multiplier)
      },

      itemPrice(item) {
        let base  = item.basePrice
        let owned = item.quantity

        return base + ((base / ItemPriceCoeficient) * owned)
      },

      incomeFrom(item) {
        return item.income * item.quantity
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
      },

      currencyInteger() {
        return Math.floor(this.currency)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
