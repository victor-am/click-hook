import Config from '@/constants'

export default {
  getters: {
    computed: {
      currency() {
        return this.currencyEarned - this.currencySpent
      },

      currencyEarned() {
        return this.$store.state.currency.earned
      },

      currencySpent() {
        return this.$store.state.currency.spent
      },

      inventory() {
        return this.$store.state.inventory
      }
    }
  },

  formatters: {
    methods: {
      // Converts x income per tick to y income per second
      toSecond(income) {
        let multiplier = 1000 / Config.TickInterval
        return Math.floor(income * multiplier)
      }
    }
  }
}
