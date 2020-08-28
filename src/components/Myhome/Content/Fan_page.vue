<template>
  <div id="fan_page">
    <div id="m_msg">
      <el-menu default-active="2">
        <el-menu-item index="1" @click="go_page(1)">
          <span class="menu_item" slot="title">
            关注
            <span class="num" v-if="attention_num < 10000">{{attention_num}}</span>
            <span class="num" v-else>9999+</span>
          </span>
        </el-menu-item>
        <el-menu-item index="2" @click="go_page(2)">
          <span class="menu_item" slot="title">
            粉丝
            <span class="num" v-if="fan_num < 10000">{{fan_num}}</span>
            <span class="num" v-else>9999+</span>
          </span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fan_page",

  data() {
    return {
      attention_num: 0,
      fan_num: 0,
    };
  },

  methods: {
    go_page(type) {
      if (type == 2) {
        return;
      } else {
        this.$router.push({ name: "attention_page" });
      }
    },
  },
};
</script>

<style scoped>
#fan_page {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 1.5%;
  padding-bottom: 1.5%;
  height: auto;
  width: 910px;
}

#m_msg {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 300px;
  height: 60px;
  background-color: #fff;
}

.menu_item,
.num {
  font-size: 12px;
  color: #919191;
}

.el-menu-item:hover {
  background-color: #f2f2f5;
}

.num {
  margin-left: 2%;
}
</style>

<style>
.el-popover {
  padding: 0;
}
</style>