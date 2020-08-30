<template>
  <div id="forget">
    <div id="r_header">
      <img id="r_logo" src="../../assets/t_logo.png" />
      <span id="f_home" @click="go_home">微博首页</span>
    </div>

    <div id="r_content">
      <div id="r_title">通过邮箱验证码找回</div>

      <div id="f_step">
        <el-steps class="step" :active="active" align-center>
          <el-step title="验证邮箱号"></el-step>
          <el-step title="设置密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>

      <div id="r_body">
        <transition-group name="slide-fade" mode="out-in">
          <div class="r_input" v-show="active === 0" key="0">
            <div class="input">
              <span class="r_label">邮箱号:</span>
              <input v-model="email" class="l_input" />
            </div>

            <div class="input">
              <span class="r_label">验证码:</span>
              <input v-model="code" class="l_input code_input" />
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

            <button class="bot_btn" @click="go_next">下一步</button>
          </div>

          <div class="r_input" v-show="active === 1" key="1">
            <div class="input">
              <span class="r_label">设置密码:</span>
              <input type="password" v-model="pswd" class="n_input" />
            </div>

            <div class="input">
              <span class="r_label">确认密码:</span>
              <input type="password" v-model="r_pswd" class="n_input" />
            </div>

            <button class="t_btn" @click="go_next">确定</button>
          </div>

          <span id="back" v-show="active === 2" key="2">成功设置密码！{{t}}s后自动返回首页</span>
        </transition-group>
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
      pswd: "",
      r_pswd: "",
      time: 60,
      t: 5,
      isSend: false,
      active: 0,
    };
  },

  methods: {
    go_home() {
      this.$router.push("/");
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

    go_next() {
      if (this.active === 0) {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (this.email == "" || !reg.test(this.email)) {
          this.$notify({
            title: "警告",
            message: "请输入正确的邮箱号！",
            type: "warning",
            showClose: false,
            duration: 2000,
          });

          return;
        }

        if (this.code == "") {
          this.$notify({
            title: "警告",
            message: "请输入验证码！",
            type: "warning",
            showClose: false,
            duration: 2000,
          });

          return;
        }

        let data = {
          email: this.email,
          verifyInput: this.code,
        };

        console.log(data);

        this.$axios({
          method: "get",
          url: "/account/find/emaliVerification",
          params: data,
        }).then((re) => {
          console.log(re);
          if (re.data.code == "200") {
            this.active++;
          }
        });
      } else if (this.active === 1) {
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

        if (this.r_pswd == "" || this.pswd != this.r_pswd) {
          this.$notify({
            title: "警告",
            message: "两次密码请保持一致！",
            type: "warning",
            showClose: false,
            duration: 2000,
          });

          return;
        }

        let data = {
          newPassword1: this.pswd,
          newPassword2: this.r_pswd,
          email: this.email,
        };

        console.log(data);

        this.$axios({
          method: "get",
          url: "/account/find/password",
          params: data,
        }).then((re) => {
          console.log(re);
          if (re.data.code == "200") {
            this.active++;
            setInterval(() => {
              this.t--;
              if (this.t == 0) {
                this.$router.push("/");
              }
            }, 1000);
          }
        });
      }
    },
  },
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

.r_input {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 6%;
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

.n_input {
  border: 1px #ccc solid;
  border-radius: 2px;
  margin-left: 2%;
  height: 33px;
  width: 30%;
  box-shadow: 0px 1px 1px 0px #eaeaea inset;
}

.code_input {
  width: 19%;
}

.code {
  margin-left: 1.5%;
  width: 13.5%;
  height: 35px;
  font-size: 14px;
  color: #fff;
  border: 1px #ff8140 solid;
  background-color: #ff8140;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  outline: none;
}

.is:hover {
  cursor: pointer;
  color: #fff;
  background-color: #eb7350;
  outline-color: #eb7350;
}

.isNot {
  color: #333;
  background-color: #fff;
  border-color: #fff;
}

.isNot:hover {
  cursor: no-drop;
}

.l_input:focus,
.n_input:focus {
  outline: none;
  border: 1px #eb7350 solid;
}

.bot_btn {
  margin: 0 auto;
  margin-top: 7%;
  width: 28%;
  height: 34px;
  font-size: 14px;
  color: #fff;
  background-color: #ff8140;
  border: 1px #ff8140 solid;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  outline: none;
}

.t_btn {
  margin: 0 auto;
  margin-top: 7%;
  width: 20%;
  height: 34px;
  font-size: 14px;
  color: #fff;
  background-color: #ff8140;
  border: 1px #ff8140 solid;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  outline: none;
}

.bot_btn:hover,
.t_btn:hover {
  cursor: pointer;
  background-color: #eb7350;
}

#back {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: center;
  margin-top: 10%;
  font-size: 22px;
  color: #333;
}
</style>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.5s;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

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