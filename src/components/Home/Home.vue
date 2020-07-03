<template>
  <div id="home" @scroll.passive="get_top($event)">
    <Header :class="{isTop: !isTop}"></Header>
    <!-- <router-view></router-view> -->

    <el-backtop target="#home">
      <div id="back">
        <span class="iconfont icon-back"></span>
      </div>
    </el-backtop>
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
  background-color: #94d7b6;
}

.isTop {
  opacity: 0.94;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
}

.el-backtop {
  margin-right: 10%;
  border-radius: 0;
  box-shadow: none;
}

#back {
  background-color: #459a70;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  opacity: 0.83;
}

#back:hover {
  opacity: 1;
}

.icon-back {
  color: #fff;
  font-size: 20px;
}
</style>
