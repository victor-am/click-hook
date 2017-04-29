<template>
  <div class="padded container shop-container" v-if="shopInventory.length > 0">
    <div class="fancy clear"></div>
    <h1 class="clear text">
      <i class="fa fa-shopping-bag"></i>
      Shop
    </h1>

    <div class="shop">
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

        <button @click="buy(item.id)" class="primary">
          <i class="fa fa-cart-plus"></i>
          Buy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Config from '@/constants'
  import Mix    from '@/mixins'

  export default {
    name: 'Shop',

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
  @import '../sass/main.scss';

  h1 {
    margin-left: 1rem;
  }

  .shop-container {
    background: $color-primary;
  }

  .shop {
    display:        flex;
    flex-wrap:      wrap;
    flex-direction: row;
    position:       relative;
  }

  .shop .item {
    padding:       1rem 2rem;
    border:        1px solid #ccc;
    border-radius: 5px;
    background:    #fff;
    margin:        1rem;
    flex:          1 1 25%;

    table {
      width: 100%;

      tr {
        flex: 1 1 auto;
      }
    }
  }
</style>
