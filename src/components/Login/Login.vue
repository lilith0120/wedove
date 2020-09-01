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

    <div id="remark">
      <el-checkbox class="check" v-model="remember">记住我</el-checkbox>
      <a id="f_pswd" href="/forget">忘记密码</a>
    </div>

    <div slot="footer" id="footer">
      <el-button id="login_btn" @click="login">登录</el-button>
      <div id="register">
        <a href="/register">立即注册</a>
      </div>
    </div>
  </div>
</template>



<script>
import store from "../../store/store";

export default {
  name: "Login",

  data() {
    return {
      user: "",
      name: "",
      email: "",
      pswd: "",
      remember: false,
    };
  },

  created() {
    this.get_cookie();
  },

  computed: {
    username() {
      return this.$store.state.username;
    },
  },

  methods: {
    set_cookie(user, pswd, time) {
      let date = new Date();
      date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
      document.cookie = `user=${user};path=/;expires=${date.toLocaleString()}`;
      document.cookie = `pswd=${pswd};path=/;expires=${date.toLocaleString()}`;
    },

    delete_cookie() {
      this.set_cookie("", "", -1);
    },

    get_cookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split(";");
        for (let i of arr) {
          let a = i.split("=");
          if (a[0] == " user") {
            this.user = a[1];
          } else if (a[0] == " pswd") {
            this.pswd = a[1];
          }
        }
      }
    },

    login() {
      this.name = "";
      this.email = "";

      if (this.user == "") {
        this.$notify({
          title: "警告",
          message: "请输入用户名/邮箱！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      if (this.pswd == "") {
        this.$notify({
          title: "警告",
          message: "请输入密码！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.user)) {
        this.email = this.user;
      } else {
        this.name = this.user;
      }

      let data = {
        username: this.user,
        password: this.pswd,
        rememberMe: this.remember,
      };

      console.log(data);

      this.$axios({
        method: "post",
        url: "/account/login",
        data: data,
      }).then((re) => {
        console.log(re);
        if (re.data.code == "200") {
          this.$axios({
            method: "get",
            url: "/accountT",
          }).then((re) => {
            if (re.data.code == "200") {
              store.commit("set_username", re.data.data.name);
              console.log(store);
            }
          });

          if (this.remember) {
            this.set_cookie(this.user, this.pswd, 7);
          } else {
            this.delete_cookie;
          }

          this.$emit("show_login", false);
          // this.$router.go(0);
        } else {
          let msg = re.data.msg;
          this.$message.error(msg);
        }
      });
    },
  },
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

#remark {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  width: 42.5%;
  margin: 1% auto;
  font-size: 12px;
}

.check >>> .el-checkbox__label {
  font-size: 12px;
  padding-left: 10%;
}

#f_pswd {
  color: #333;
  text-decoration: none;
}

#f_pswd:hover {
  cursor: pointer;
  color: #ff8140;
}

#footer {
  text-align: center;
}

#login_btn {
  margin-top: 5%;
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