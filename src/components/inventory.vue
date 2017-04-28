<template>
  <div v-if="shopInventory.length > 0">
    <h2>Shop</h2>

    <div v-for="item in shopInventory" :key="item.id" class="item">
      <h3>x{{ item.quantity }} {{ item.name }}</h3>

      <hr>
      <table>
        <tr>
          <td>Price:</td>
          <td>${{ currentItemPrice(item) }}</td>
        </tr>
        <tr>
          <td>Generates:</td>
          <td>{{ toSecond(item.income) }}</td>
        </tr>
        <tr>
          <td>Generating:</td>
          <td>{{ toSecond(incomeGenerationFrom(item)) }}</td>
        </tr>
      </table>
      <hr>

      <button @click="buy(item.id)" class="primary">Buy</button>
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
        let price = this.currentItemPrice(item)

        if (this.currency >= price) {
          let params = { id: item.id, price: this.currentItemPrice(item) }
          this.$store.commit('buy', params)
        }
      },

      findItem(id) {
        return this.inventory.find((i) => i.id === id)
      },

      currentItemPrice(item) {
        let base  = item.basePrice
        let owned = item.quantity

        return base + ((base / Config.ItemPriceCoeficient) * owned)
      },

      incomeGenerationFrom(item) {
        return item.income * item.quantity
      }
    },

    computed: {
      shopInventory() {
        return this.inventory.filter((item) => {
          let multiplier             = Config.BuyItemRequirementMultiplier
          let itemDisplayRequirement = item.basePrice * multiplier

          return itemDisplayRequirement <= this.currencyEarned
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    width:         calc(50% - 6rem - 2px);
    float:         left;
    padding:       1rem 2rem;
    border:        1px solid #ccc;
    border-radius: 5px;
    margin:        1rem;

    table {
      width: 100%;
    }
  }
</style>
