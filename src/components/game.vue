<template>
  <div>
    <p>You have ${{ currency }}</p>
    <button @click="generateClickIncome">Get Ca$h</button>

    <template v-for="item in inventory">
      <button :key="item.id" @click="buy(item.id)">
        (x{{ item.quantity }})
        Buy {{ item.name }}
      </button>
    </template>
  </div>
</template>

<script>
  const IncomeInterval = 500
  const BaseIncome     = 1
  const ClickIncome    = 1

  const Items = [
    { id: 1, name: 'Income Generator I', type: 'IncomeGenerator', price: 100, income: 2 }
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
        window.setTimeout(this.generateIncome, IncomeInterval)
      },

      generateIncome() {
        this.currency += this.perTickIncome
        this.scheduleIncome()
      },

      generateClickIncome() {
        this.currency += ClickIncome
      },

      buy(id) {
        let item = this.findItem(id)

        if (this.currency >= item.price) {
          item.quantity += 1
          this.currency -= item.price
        }
      },

      findItem(id) {
        return this.inventory.find((i) => i.id === id)
      },

      itemsWithType(type) {
        return this.inventory.filter((i) => i.type === type)
      }
    },

    computed: {
      perTickIncome() {
        let base       = BaseIncome
        let generators = this.generatorsIncome
        return base + generators
      },

      generatorsIncome() {
        let generators  = this.itemsWithType('IncomeGenerator')
        let incomes     = generators.map((g) => g.income * g.quantity)
        let incomesSum  = incomes.reduce((x, y) => x + y )
        return incomesSum
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
