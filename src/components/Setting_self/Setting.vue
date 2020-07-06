<template>
  <div id="setting">
    <div id="content">
      <el-menu :default-active="active" class="menu">
        <el-divider content-position="left">账号设置</el-divider>
        <el-menu-item index="1" @click="go_msg">
          <i class="iconfont icon-my_message"></i>
          <span class="msg" slot="title">我的信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="go_avatar">
          <i class="iconfont icon-avatar"></i>
          <span class="msg" slot="title">修改头像</span>
        </el-menu-item>
        <el-menu-item index="3" @click="go_pswd">
          <i class="iconfont icon-pswd"></i>
          <span class="msg" slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",

  data() {
    return {
      active: "1"
    };
  },

  created() {
    let url = window.location.pathname.split("/");
    if (url[url.length - 1] == "pswd") {
      this.active = "3";
    } else if (url[url.length - 1] == "avatar") {
      this.active = "2";
    } else {
      this.active = "1";
    }
  },

  methods: {
    go_msg() {
      this.$router.push({ name: "change_msg" });
    },

    go_avatar() {
      this.$router.push({ name: "change_avatar" });
    },

    go_pswd() {
      this.$router.push({ name: "change_pswd" });
    }
  }
};
</script>

<style scoped>
#setting {
  /* border: 1px blue solid;
  box-sizing: border-box; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(
    #87bde1 0%,
    #bee1f5 40%,
    #bee1f5 41%,
    #bee1f5 100%
  );
}

#content {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  margin: 0 auto;
  margin-top: 5%;
  background-color: #fafafa;
  width: 980px;
  height: 79%;
}

.el-divider__text.is-left {
  padding: 0 1%;
  background-color: #f1f1f1;
  font-size: 12px;
  color: #aeaeae;
  font-weight: bold;
}

.menu {
  border: none;
  width: 20%;
  height: 100%;
  background-color: #f1f1f1;
  box-shadow: inset -13px 0px 10px -15px #8f8f8f;
}

.iconfont {
  font-size: 20px;
}

.el-menu-item {
  display: flex;
  align-items: center;
  color: #333;
  height: 7%;
}

.el-menu-item:hover {
  background-color: #e6e6e6;
}

.el-menu-item.is-active,
.el-menu-item:focus {
  background-color: #fafafa;
  color: #000;
  font-weight: bold;
}

.el-menu-item.is-active .iconfont,
.el-menu-item:focus .iconfont {
  color: #e64141;
}

.msg {
  /* border: 1px red solid;
  box-sizing: border-box; */
  line-height: 0;
  margin-left: 8%;
}
</style>