<template>
  <div>
    <p v-if="currencyEarned <= 10">
      Something will happen if you earn more cash...
    </p>

    <p v-else-if="currencyEarned <= 20">
      Something will happen if you earn <strong>a little</strong> more cash...
    </p>

    <p v-else-if="currencyEarned <= 29">
      You are almost there...
    </p>

    <p v-else-if="currencyEarned <= 100">
      Wow! Let's buy some things!
    </p>

    <p v-else-if="currencyEarned < 5000">
      Now we are talking!
    </p>
  </div>
</template>

<script>
  import Mix    from '@/mixins'

  export default {
    name: 'IncentiveMessage',
    mixins: [Mix.getters]
  }
</script>

<style lang="scss" scoped>
  @import '../sass/main.scss';

  p {
    font-weight: bold;
  }

  strong {
    color: $color-secondary;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
