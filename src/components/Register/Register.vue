<template>
  <div id="register">
    <div id="r_header">
      <img id="r_logo" src="../../assets/t_logo.png" />
    </div>

    <div id="r_content">
      <div id="r_title">个人注册</div>

      <div id="r_body">
        <div id="left_body">
          <div id="r_input">
            <div class="input">
              <span class="r_label">
                <span class="req">*</span>用户名:
              </span>
              <input v-model="name" class="l_input" @focus="name_focus" @blur="name_blur" />
              <span class="input_tips" v-show="name_tip">
                <img class="input_img" src="../../assets/info.png" />请输入3-10位字符
              </span>
              <span class="input_tips input_warn" v-show="name_warn">
                <img class="input_img" src="../../assets/warn.png" />请输入正确格式的用户名
              </span>
            </div>

            <div class="input">
              <span class="r_label">
                <span class="req">*</span>设置密码:
              </span>
              <input v-model="pswd" class="l_input" @focus="pswd_focus" @blur="pswd_blur" />
              <span class="input_tips" v-show="pswd_tip">
                <img class="input_img" src="../../assets/info.png" />请输入6-16位字符
              </span>
              <span class="input_tips input_warn" v-show="pswd_warn">
                <img class="input_img" src="../../assets/warn.png" />请输入正确格式的密码
              </span>
            </div>

            <div class="input">
              <span class="r_label">
                <span class="req">*</span>邮箱:
              </span>
              <input v-model="email" class="l_input" @focus="email_focus" @blur="email_blur" />
              <span class="input_tips" v-show="email_tip">
                <img class="input_img" src="../../assets/info.png" />请输入邮箱
              </span>
              <span class="input_tips input_warn" v-show="email_warn">
                <img class="input_img" src="../../assets/warn.png" />请输入正确格式的邮箱
              </span>
            </div>

            <div class="input">
              <span class="r_label">
                <span class="req">*</span>验证码:
              </span>
              <button
                class="code"
                :class="{is: !isSend, isNot: isSend}"
                @click="get_code"
                :disabled="isSend"
              >
                <template v-if="!isSend">获取验证码</template>
                <template v-else>{{time}}s后重新获取</template>
              </button>
              <input
                v-model="code"
                class="l_input code_input"
                @focus="code_focus"
                @blur="code_blur"
              />
              <span class="input_tips" v-show="code_tip">
                <img class="input_img" src="../../assets/info.png" />请输入验证码
              </span>
              <span class="input_tips input_warn" v-show="code_warn">
                <img class="input_img" src="../../assets/warn.png" />请输入验证码
              </span>
            </div>

            <button id="bot_btn" @click="register">立即注册</button>
          </div>
        </div>

        <el-divider direction="vertical"></el-divider>
        <div id="right_body">
          <div id="login">
            已有账号，
            <a href="/">直接登录»</a>
          </div>
          <div id="tips">
            <span>注册小贴士</span>
            <ul>
              <li>
                <span class="label">1</span>
                <span class="tip">所有的输入框都要填的</span>
              </li>
              <li>
                <span class="label">2</span>
                <span class="tip">你想要的用户名，可能被别人先用掉了</span>
              </li>
              <li>
                <span class="label">3</span>
                <span class="tip">邮箱的格式要正确，并且存在</span>
              </li>
              <li>
                <span class="label">4</span>
                <span class="tip">如果有其他问题，请自行百度</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      name: "",
      pswd: "",
      email: "",
      code: "",
      time: 60,
      isSend: false,
      name_tip: false,
      name_warn: false,
      pswd_tip: false,
      pswd_warn: false,
      email_tip: false,
      email_warn: false,
      code_tip: false,
      code_warn: false
    };
  },

  methods: {
    name_focus() {
      this.name_tip = true;
      this.name_warn = false;
    },

    name_blur() {
      this.name_tip = false;
      if (this.name == "" || this.name.length < 3 || this.name.length > 10) {
        this.name_warn = true;
      }
    },

    pswd_focus() {
      this.pswd_tip = true;
      this.pswd_warn = false;
    },

    pswd_blur() {
      this.pswd_tip = false;
      if (this.pswd == "" || this.pswd.length < 6 || this.pswd.length > 16) {
        this.pswd_warn = true;
      }
    },

    email_focus() {
      this.email_tip = true;
      this.email_warn = false;
    },

    email_blur() {
      this.email_tip = false;
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.email == "" || !reg.test(this.email)) {
        this.email_warn = true;
      }
    },

    code_focus() {
      this.code_tip = true;
      this.code_warn = false;
    },

    code_blur() {
      this.code_tip = false;
      if (this.code == "") {
        this.code_warn = true;
      }
    },

    get_code() {
      alert("send");
      this.isSend = true;
      // this.$axios({
      //   method: "",
      //   url: ""
      // }).then(re => {
      //   console.log(re);
      // });

      let clock = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          this.isSend = false;
          this.time = 60;
          clearInterval(clock);
        }
      }, 1000);
    },

    register() {
      if (this.name == "") {
        this.name_warn = true;
      }

      if (this.pswd == "") {
        this.pswd_warn = true;
      }

      if (this.email == "") {
        this.email_warn = true;
      }

      if (this.code == "") {
        this.code_warn = true;
      }

      if (
        this.name_warn ||
        this.pswd_warn ||
        this.email_warn ||
        this.code_warn
      ) {
        return;
      }

      let data = {
        username: this.name,
        password: this.pswd,
        email: this.email,
        code: this.code
      };

      console.log(data);

      // this.$axios({
      //   method: "",
      //   url: "",
      //   data: data
      // }).then(re => {
      //   console.log(re);
      //   if (re.data.errno != 0) {
      //     let msg = re.data.message;
      //     this.$message.error(msg);
      //   } else {
      //     this.$message({
      //       message: "注册成功！",
      //       type: "success"
      //     });

      //     this.$router.push("/");
      //   }
      // });
    }
  }
};
</script>

<style scoped>
#register {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    #87bde1 0%,
    #bee1f5 50%,
    #bee1f5 51%,
    #bee1f5 100%
  );
}

#r_header {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 19%;
}

#r_logo {
  width: 300px;
}

#r_content {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin: 0 auto;
  width: 900px;
  height: 70%;
  overflow: hidden;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0px 2px 3px #98b4c4;
}

#r_title {
  margin: 2.5% 0;
  margin-left: 40px;
  font-size: 22px;
  color: #333;
  width: 90px;
  border-bottom: 3px #ffa00a solid;
  line-height: 33px;
}

#r_body {
  display: flex;
  justify-content: space-between;
  height: 80%;
  font-size: 14px;
}

#left_body {
  /* border: 1px rebeccapurple solid;
  box-sizing: border-box; */
  width: 65%;
}

#right_body {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 27%;
}

.el-divider {
  height: 84%;
}

#login {
  width: 88%;
  margin-top: 13%;
  padding-bottom: 3%;
  border-bottom: 1px #ccc dotted;
}

a {
  color: #0a8cd2;
  text-decoration: none;
}

a:hover {
  text-decoration-line: underline;
}

#tips {
  margin-top: 5%;
  width: 80%;
}

ul {
  margin-top: 7%;
  font-size: 12px;
  list-style: none;
}

li {
  margin: 10% 0;
}

.label {
  display: inline-block;
  width: 8%;
  height: 20px;
  color: #fff;
  background-image: url("../../assets/num.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}

.tip {
  display: inline-block;
  margin-left: 7%;
  color: #0a8cd2;
  width: 75%;
  word-break: break-all;
  vertical-align: top;
}

#r_input {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 4%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.req {
  font-family: "SimSun";
  color: #f00;
  margin-right: 2.5%;
}

.input {
  width: 100%;
  margin: 1.5% 0;
  /* border: 1px red solid;
  box-sizing: border-box; */
}

.r_label {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: inline-block;
  width: 27.5%;
  text-align: right;
  margin-right: 1.5%;
}

.l_input {
  border: 1px #ccc solid;
  border-radius: 2px;
  height: 28px;
  width: 34%;
  box-shadow: 0px 1px 1px 0px #eaeaea inset;
}

.code_input {
  margin-left: 1.5%;
  width: 17%;
}

.code {
  width: 15.5%;
  height: 28px;
  font-size: 12px;
  border: 1px #fff solid;
  box-sizing: border-box;
  border-radius: 2px;
  outline: 1px #efefef solid;
}

.is:hover {
  cursor: pointer;
  color: #fff;
  background-color: #ffa00a;
  outline-color: #ffa00a;
}

.isNot:hover {
  cursor: no-drop;
}

.l_input:focus {
  outline: none;
  border: 1px #ffb941 solid;
}

#bot_btn {
  margin-top: 7%;
  margin-left: 29%;
  width: 34%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #ffa00a;
  border: 1px #fff solid;
  outline: 1px #ffa00a solid;
}

#bot_btn:hover {
  cursor: pointer;
  background-color: #ffb941;
}

.input_tips {
  align-items: center;
  margin-left: 3%;
  font-size: 12px;
  color: #9c96a0;
}

.input_warn {
  color: #e64141;
}

.input_img {
  margin-right: 1%;
  vertical-align: middle;
}
</style>