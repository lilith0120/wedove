<template>
  <div id="header">
    <div id="h_logo" @click="go_home">
      <img id="logo" src="../../assets/logo.png" />
    </div>

    <div id="h_input">
      <el-input
        class="e_input"
        placeholder="搜索微博、找人"
        v-model="search_key"
        @keyup.enter.native="search"
      >
        <i slot="suffix" title="搜索" class="el-input__icon iconfont icon-search" @click="search"></i>
      </el-input>
    </div>

    <template v-if="isLogin">
      <div id="h_user">
        <span class="iconfont icon-home" @click="go_home">
          <span class="label">首页</span>
        </span>

        <span class="iconfont icon-user" @click="go_myhome">
          <span class="label">{{username}}</span>
        </span>

        <el-divider direction="vertical"></el-divider>

        <span class="iconfont icon-letter r-icon" @click="go_home"></span>
        <span class="iconfont icon-setting r-icon" @click="go_home"></span>
        <span class="iconfont icon-edit r-icon" @click="go_home"></span>
      </div>
    </template>
    <template v-else>
      <div id="h_unuser">
        <span class="iconfont icon-home" @click="go_home">
          <span class="label">首页</span>
        </span>

        <span class="label" @click="go_register">注册</span>
        <el-divider direction="vertical"></el-divider>
        <span class="label" @click="go_login">登录</span>
      </div>
    </template>
  </div>
</template>

<script>
import store from "../../store/store";

export default {
  name: "Header",

  data() {
    return {
      search_key: "",
      isLogin: true,
      username: "行露的吸血鬼"
    };
  },

  created() {
    if (store.state.token != "") {
      this.isLogin = true;
    }
  },

  methods: {
    go_home() {
      // console.log("home");
      this.$router.push("/");
    },

    go_register() {
      this.$router.push("/register");
    },

    go_login() {
      console.log(2333);
    },

    search() {
      console.log(this.search_key);
    }
  }
};
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  z-index: 5;
  display: flex;
  border-top: 2px #fa7d3c solid;
  box-sizing: border-box;
  height: 7%;
  width: 100%;
  background-color: #fff;
}

#h_logo {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 8%;
  height: 100%;
  width: 130px;
  cursor: pointer;
}

#logo {
  width: 100%;
  height: 100%;
}

#h_input {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5%;
  height: 100%;
  width: 30.5%;
}

.e_input >>> .el-input__inner {
  background-color: #f2f2f5;
  height: 30px;
  border-radius: 0;
}

.e_input >>> .el-input__inner::-webkit-input-placeholder {
  color: #808080;
}

.e_input >>> .el-input__inner:focus {
  background-color: #fff;
  border: 1px #fa7d3c solid;
}

.el-input__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #696e78;
  font-weight: bold;
}

.el-input__icon:hover {
  color: #fa7d3c;
  cursor: pointer;
}

#h_user {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin-left: 14%;
  height: 100%;
  width: 400px;
}

#h_unuser {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin-left: 20%;
  height: 100%;
  width: 200px;
}

.iconfont {
  display: flex;
  align-items: center;
  font-size: 22px;
}

.icon-home {
  width: 80px;
  /* border: 1px red solid;
  box-sizing: border-box; */
}

.icon-user {
  /* width: 30%; */
  white-space: nowrap;
  /* border: 1px red solid;
  box-sizing: border-box; */
}

.label {
  margin-left: 3%;
  font-size: 14px;
}

.iconfont:hover,
.label:hover {
  cursor: pointer;
  color: #fa7d3c;
}

.el-divider--vertical {
  margin: 0 7%;
  height: 60%;
}

.r-icon {
  margin-right: 5%;
}
</style>