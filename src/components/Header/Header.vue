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

        <el-dropdown>
          <span class="iconfont icon-letter"></span>
          <el-dropdown-menu slot="dropdown" class="message">
            <el-dropdown-item>
              @我的
              <el-badge class="mark" :value="at_me" :max="99" />
            </el-dropdown-item>
            <el-dropdown-item>
              评论
              <el-badge class="mark" :value="commit" :max="99" />
            </el-dropdown-item>
            <el-dropdown-item>
              赞
              <el-badge class="mark" :value="support" :max="99" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown>
          <span class="iconfont icon-setting"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="go_setting">账号设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <span class="iconfont icon-edit" :class="{ishome: ishome}" title="快捷发布微博" @click="go_edit"></span>
      </div>
    </template>
    <template v-else>
      <div id="h_unuser">
        <span class="iconfont icon-home" @click="go_home">
          <span class="label">首页</span>
        </span>

        <span class="label" @click="go_register">注册</span>
        <el-divider direction="vertical"></el-divider>
        <span class="label" @click="isShow = true">登录</span>
      </div>
    </template>

    <el-dialog
      title="账号登录"
      class="dialog"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      v-if="isShow"
      destroy-on-close
      append-to-body
      center
    >
      <Login></Login>
    </el-dialog>

    <el-dialog
      class="edit"
      @closed="hide()"
      :visible.sync="isEdit"
      :close-on-click-modal="false"
      v-if="isEdit"
      destroy-on-close
      append-to-body
      center
    >
      <Editor></Editor>
    </el-dialog>
  </div>
</template>

<script>
import store from "../../store/store";
import Login from "../Login/Login";
import Editor from "../Editor/Editor";

export default {
  name: "Header",

  components: {
    Login,
    Editor
  },

  data() {
    return {
      ishome: true,
      search_key: "",
      isLogin: true,
      isShow: false,
      isEdit: false,
      username: "行露的吸血鬼",
      at_me: 12,
      commit: 233,
      support: 77
    };
  },

  created() {
    // if (store.state.token != "") {
    //   this.isLogin = true;
    let url = window.location.pathname.split("/");
    if (url[url.length - 1] == "home") {
      this.ishome = true;
    } else {
      this.ishome = false;
    }
    //   // 这里拿数据
    // } else {
    //   this.isLogin = false;
    // }
  },

  watch: {
    $route(to) {
      let url = to.path.split("/");
      if (url[url.length - 1] == "home") {
        this.ishome = true;
      } else {
        this.ishome = false;
      }
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

    go_myhome() {
      console.log(2);
    },

    go_setting() {
      this.$router.push({ name: "setting" });
    },

    logout() {
      store.mutations.remove_token(store.state);
      this.$router.go(0);
    },

    search() {
      let data = {
        key: this.search_key
      };

      console.log(data);

      // this.$axios({
      //   method: "",
      //   url: "",
      //   data: data
      // }).then(re => {
      //   console.log(re);
      // });
    },

    go_edit() {
      if (!this.ishome) {
        this.isEdit = true;
      }
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
  margin-left: 2%;
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
  margin-left: 18%;
  height: 100%;
  width: 400px;
}

#h_unuser {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin-left: 26%;
  height: 100%;
  width: 200px;
}

.iconfont {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #333;
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

.ishome {
  color: #aaaaaa;
}

.ishome:hover {
  cursor: no-drop;
  color: #aaaaaa;
}

.el-divider--vertical {
  margin: 0 7%;
  height: 60%;
}

.el-dropdown {
  margin-right: 5%;
}

.el-dropdown-menu {
  padding: 0;
}

.message {
  width: 147px;
}

.el-dropdown-menu__item {
  margin-top: 1%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.el-dropdown-menu__item--divided::before {
  height: 0;
}

.el-dropdown-menu__item:hover {
  color: #fa7d3c;
  background-color: #f2f2f5;
}

.mark {
  display: flex;
  align-items: center;
  /* border: 1px red solid;
  box-sizing: border-box; */
  /* height: 40px; */
}

.dialog >>> .el-dialog {
  margin-top: 10.5% !important;
  border-top: 2px #fa7f40 solid;
  box-sizing: border-box;
  width: 600px;
  height: 55%;
}

.dialog >>> .el-dialog__title {
  display: inline-block;
  margin-top: 2.5%;
  width: 33%;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 3px #f7691d solid;
  line-height: 45px;
}

.edit >>> .el-dialog {
  margin-top: 10.5% !important;
  border-top: 2px #fa7f40 solid;
  box-sizing: border-box;
  width: 600px;
  height: 28.5%;
}

.edit >>> .el-dialog__header {
  padding: 0;
  z-index: 10;
}
</style>