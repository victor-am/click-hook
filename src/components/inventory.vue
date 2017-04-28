<template>
  <div>
    <div v-for="item in shopInventory" :key="item.id" class="item">
      <p><strong>{{ item.name }}</strong></p>
      <p>You have: x{{ item.quantity }}</p>
      <p>Price: ${{ itemPrice(item) }}</p>
      <p>Individual Income Generation: {{ fromTickToSecond(item.income) }}</p>
      <p>Generating: {{ fromTickToSecond(incomeFrom(item)) }}</p>

      <button @click="buy(item.id)">Buy</button>
    </div>
  </div>
</template>

<script>
  import Config from '@/constants'
  import Mix from '@/mixins'

  export default {
    name: 'Inventory',

    mixins: [Mix.getters, Mix.formatters],

    methods: {
      buy(id) {
        let item  = this.findItem(id)
        let price = this.itemPrice(item)

        if (this.currency >= price) {
          let params = { id: item.id, price: this.itemPrice(item) }
          this.$store.commit('buy', params)
        }
      },

      findItem(id) {
        return this.inventory.find((i) => i.id === id)
      },

      itemPrice(item) {
        let base  = item.basePrice
        let owned = item.quantity

        return base + ((base / Config.ItemPriceCoeficient) * owned)
      },

      incomeFrom(item) {
        return item.income * item.quantity
      }
    },

    computed: {
      shopInventory() {
        return this.inventory.filter((item) => {
          let itemBuyRequirement = item.basePrice * Config.BuyItemRequirementMultiplier
          return itemBuyRequirement <= this.currencyEarned
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    width: 33%;
    float: left;
    padding: 5px;
    border: 1px solid #ccc;
  }
</style>
