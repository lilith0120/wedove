<template>
  <div id="login">
    <el-form>
      <el-form-item class="item" label-width="0">
        <el-input
          class="l_input"
          placeholder="用户名/邮箱"
          prefix-icon="iconfont icon-user"
          v-model="user"
        ></el-input>
      </el-form-item>

      <el-form-item class="item" label-width="0">
        <el-input
          class="l_input"
          placeholder="请输入密码"
          prefix-icon="iconfont icon-pswd"
          v-model="pswd"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" id="footer">
      <el-button id="login_btn" @click="login">登录</el-button>
      <div id="register">
        <a href="/register">立即注册</a>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Login",

  data() {
    return {
      isShow: false,
      user: "",
      name: "",
      email: "",
      pswd: ""
    };
  },

  methods: {
    login() {
      if (this.user == "") {
        this.$notify({
          title: "警告",
          message: "请输入用户名/邮箱！",
          type: "warning",
          showClose: false,
          duration: 2000
        });

        return;
      }

      if (this.pswd == "") {
        this.$notify({
          title: "警告",
          message: "请输入密码！",
          type: "warning",
          showClose: false,
          duration: 2000
        });

        return;
      }

      let data = {
        teamName: this.team_name,
        introduction: this.team_intro
      };

      console.log(data);

      //   this.$axios({
      //     method: "",
      //     url: "",
      //     data: data
      //   }).then(re => {
      //     console.log(re)
      //   });
    },

    go_register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.el-form {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.item {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 42.5%;
  margin-bottom: 1%;
}

.l_input >>> .el-input__inner {
  border-radius: 0;
  height: 28px;
}

.l_input >>> .el-input__inner:focus {
  border: 1px #ff8140 solid;
}

#footer {
  text-align: center;
}

#login_btn {
  margin-top: 10%;
  width: 42.5%;
  color: #fff;
  background-color: #ff8140;
}

#login_btn:hover {
  background-color: #f7671d;
}

#register {
  margin-top: 4%;
  font-size: 12px;
}

#register a {
  color: #333;
  text-decoration: none;
}

#register a:hover {
  cursor: pointer;
  color: #ff8140;
}
</style>