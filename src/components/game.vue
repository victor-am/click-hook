<template>
  <div class="">
    <p>You have ${{ currency }}</p>
    <button @click="generateClickIncome">Get Ca$h</button>
  </div>
</template>

<script>
  const IncomeInterval = 1000
  const BaseIncome     = 1
  const ClickIncome    = 1

  export default {
    name: 'Game',

    data () {
      return {
        currency: 0
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
      }
    },

    computed: {
      perTickIncome() {
        let base = BaseIncome
        return base
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
