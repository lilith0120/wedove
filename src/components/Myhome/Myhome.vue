<template>
  <div id="myhome" @scroll.passive="get_top($event)">
    <Header :class="{isTop: !isTop}"></Header>

    <router-view></router-view>

    <el-backtop target="#myhome" :visibility-height="1">
      <div id="back">
        <span class="iconfont icon-back"></span>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Header from "../Header/Header";

export default {
  name: "Myhome",

  components: {
    Header,
  },

  data() {
    return {
      isTop: true,
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
    },
  },
};
</script>

<style scoped>
#myhome {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 100%;
  width: 100%;
  z-index: 10;
  overflow-y: scroll;
  background-color: #e0c99f;
}

.isTop {
  opacity: 0.94;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
}

.el-backtop {
  margin-right: 12.5%;
  border-radius: 0;
  box-shadow: none;
  width: 45px;
  height: 45px;
  background-color: #696e78;
  opacity: 0.83;
}

.el-backtop:hover {
  background-color: #696e78;
  opacity: 1;
}

#back {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-back {
  color: #fff;
  font-size: 20px;
}
</style>