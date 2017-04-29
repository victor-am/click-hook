<template>
  <div>
    <github-box></github-box>

    <div class="padded container income-container">
      <h1>
        <i class="fa fa-mouse-pointer"></i>
        Welcome to Click Hook
      </h1>

      <p>You have <strong>${{ currencyInteger }}</strong></p>
      <p>You are generating <strong>${{ toSecond(incomePerTick) }}</strong> per second</p>
      <button @click="generateClickIncome" class="secondary big">
        <i class="fa fa-money"></i>
        Get more Ca$h
      </button>
    </div>

    <shop></shop>
  </div>
</template>

<script>
  import Config from '@/constants'
  import Mix    from '@/mixins'

  import Shop      from '@/components/shop'
  import GithubBox from '@/components/github-box'

  export default {
    name: 'Game',

    components: { Shop, GithubBox },

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
        this.$store.commit('income', Config.ClickIncome)
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
  h1 {
    margin-bottom: 2rem;
  }

  .income-container {
    text-align: center;
  }

  .github-box {
    position: absolute;
    top:      7px;
    right:    10px;
    i {
      color:     #111;
      font-size: 3rem;
    }
  }
</style>
