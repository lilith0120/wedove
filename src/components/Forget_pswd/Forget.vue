<template>
  <div id="forget">
    <div id="r_header">
      <img id="r_logo" src="../../assets/t_logo.png" />
      <span id="f_home" @click="go_home">微博首页</span>
    </div>

    <div id="r_content">
      <div id="r_title">通过邮箱验证码找回</div>

      <div id="f_step">
        <el-steps class="step" :active="0" align-center>
          <el-step title="验证邮箱号"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>

      <div id="r_body">
        <div id="r_input">
          <div class="input">
            <span class="r_label">邮箱号:</span>
            <input v-model="email" class="l_input" @focus="email_focus" @blur="email_blur" />
          </div>

          <div class="input">
            <span class="r_label">验证码:</span>
            <input v-model="code" class="l_input code_input" @focus="code_focus" @blur="code_blur" />
            <button
              class="code"
              :class="{is: !isSend, isNot: isSend}"
              @click="get_code"
              :disabled="isSend"
            >
              <template v-if="!isSend">获取验证码</template>
              <template v-else>{{time}}s后重新获取</template>
            </button>
          </div>

          <button id="bot_btn" @click="register">立即注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",

  data() {
    return {
      email: "",
      code: "",
      time: 60,
      isSend: false,
      email_tip: false,
      email_warn: false,
      code_tip: false,
      code_warn: false
    };
  },

  methods: {
    go_home() {
      this.$router.push("/");
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
      // });
    }
  }
};
</script>

<style scoped>
#forget {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    #9fc7fa 0%,
    #bed2ed 20%,
    #bed2ed 21%,
    #d4d4e0 50%,
    #d4d4e0 51%,
    #d4d4e0 100%
  );
  /* background-image: linear-gradient(
    #bed2ed 0%,
    #d4d4e0 50%,
    #d4d4e0 51%,
    #d4d4e0 100%
  ); */
  overflow: hidden;
}

#r_header {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0.1% auto;
  margin-top: 2.7%;
  width: 840px;
}

#r_logo {
  width: 120px;
}

#f_home {
  margin-right: 1%;
  margin-bottom: 1%;
  font-size: 12px;
  color: #333;
}

#f_home:hover {
  cursor: pointer;
  color: #eb7350;
}

#r_content {
  border-top: 2px #fa7d3c solid;
  box-sizing: border-box;
  margin: 0 auto;
  width: 840px;
  height: 79%;
  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 3px #98b4c4;
}

#r_title {
  margin: 3% auto;
  font-size: 22px;
  color: #333;
  line-height: 33px;
  width: 24%;
}

#f_step {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 59%;
  margin: 0 auto;
  margin-bottom: 2%;
}

#r_body {
  border-top: 1px #f2f2f5 solid;
  box-sizing: border-box;
  height: 80%;
  font-size: 14px;
  background-color: #fafafa;
}

#r_input {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 4%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  margin: 1.5% 0;
  text-align: center;
  /* border: 1px red solid;
  box-sizing: border-box; */
}

.r_label {
  /* border: 1px red solid;
  box-sizing: border-box; */
  /* display: inline-block;
  width: 27.5%; */
  font-size: 12px;
  /* text-align: right;
  margin-right: 1.5%; */
}

.l_input {
  border: 1px #ccc solid;
  border-radius: 2px;
  margin-left: 2%;
  height: 33px;
  width: 34%;
  box-shadow: 0px 1px 1px 0px #eaeaea inset;
}

.code_input {
  width: 19%;
}

.code {
  margin-left: 1.5%;
  width: 13.5%;
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
  background-color: #eb7350;
  outline-color: #eb7350;
}

.isNot:hover {
  cursor: no-drop;
}

.l_input:focus {
  outline: none;
  border: 1px #eb7350 solid;
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
</style>

<style>
.el-step__title {
  font-size: 14px;
}

.el-step__icon {
  font-size: 12px;
}

.el-step__title.is-finish,
.el-step__title.is-process,
.el-step__title.is-wait {
  color: #333;
  font-weight: inherit;
}

.el-step__head.is-finish,
.el-step__head.is-process {
  color: #fff;
  border-color: #eb7350;
}

.el-step__head.is-wait {
  color: #848484;
  border-color: #f2f2f5;
}

.el-step__head.is-wait .el-step__icon.is-text {
  background-color: #f2f2f5;
}

.el-step__icon.is-text {
  background-color: #eb7350;
}
</style>