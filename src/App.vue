<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {};
  },

  methods: {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  position: relative;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: 100%;
  width: 100%;
  z-index: 10;
  overflow: auto;
}

::selection {
  background: #ea7350;
  color: #ffffff;
}
</style>
