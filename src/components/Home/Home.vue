<template>
  <div id="home" @scroll.passive="get_top($event)">
    <Header :class="{isTop: !isTop}"></Header>

    <div id="try"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../Header/Header";

export default {
  name: "Home",

  components: {
    Header
  },

  data() {
    return {
      isTop: true
    };
  },

  methods: {
    get_top(event) {
      let d = event.target.scrollTop;
      // console.log(d);
      if (d > 0) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    }
  }
};
</script>

<style>
#home {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: 100%;
  width: 100%;
  z-index: 10;
  overflow: auto;
}

.isTop {
  opacity: 0.94;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
}

#try {
  height: 200%;
  background-color: #94d7b6;
}
</style>
