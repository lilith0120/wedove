<template>
  <div id="header"></div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  z-index: 999;
  border-top: 2px #fa7d3c solid;
  box-sizing: border-box;
  height: 7%;
  width: 100%;
  background-color: #fff;
}
</style>