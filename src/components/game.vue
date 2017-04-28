<template>
  <div>
    <p>You have ${{ currencyInteger }}</p>
    <p>You are generating ${{ fromTickToSecond(incomePerTick) }} per second</p>
    <button @click="generateClickIncome">Get Ca$h</button>

    <inventory></inventory>
  </div>
</template>

<script>
  import Config from '@/constants'
  import Mix from '@/mixins'

  import Inventory from '@/components/inventory'

  export default {
    name: 'Game',

    components: { Inventory },

    mixins: [Mix.getters, Mix.formatters],

    mounted() {
      this.scheduleIncome()
    },

    methods: {
      scheduleIncome() {
        window.setTimeout(this.generateIncome, Config.TickInterval)
      },

      generateIncome() {
        this.$store.commit('income', this.incomePerTick)
        this.scheduleIncome()
      },

      generateClickIncome() {
        this.currency += Config.ClickIncome
      },

      itemsWithType(type) {
        return this.inventory.filter((i) => i.type === type)
      }
    },

    computed: {
      incomePerTick() {
        let base       = Config.BaseIncome
        let generators = this.generatorsIncome
        return base + generators
      },

      generatorsIncome() {
        let generators  = this.itemsWithType('IncomeGenerator')
        let incomes     = generators.map((g) => g.income * g.quantity)
        let incomesSum  = incomes.reduce((x, y) => x + y )
        return incomesSum
      },

      currencyInteger() {
        return Math.floor(this.currency)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
