<template>
  <div class="">
    <p>You have ${{ currency }}</p>
  </div>
</template>

<script>
  const IncomeGenerationInterval = 1000

  export default {
    name: 'Game',

    data () {
      return {
        currency: 0
      }
    },

    mounted() {
      this.scheduleIncomeGeneration()
    },

    methods: {
      scheduleIncomeGeneration() {
        window.setTimeout(this.incomeGenerate, IncomeGenerationInterval)
      },

      incomeGenerate() {
        this.currency += this.income
        this.scheduleIncomeGeneration()
      }
    },

    computed: {
      income() {
        let base = 1
        return base
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
