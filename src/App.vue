<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ClickHook',
  }
</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Raleway');

  * {
    font-family: 'Raleway', sans-serif;
  }

  button {
    padding: 0.5rem 1rem;
    background: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
    outline: none;
    border-radius: 3px;
  }

  button.primary {
    background: #0090f1;
    color: #fff;
  }

  button.secondary {
    background: #b4db66;
    color: #111;
  }
</style>
