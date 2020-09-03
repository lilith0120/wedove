<template>
  <div id="change_pswd">
    <div id="title">修改密码</div>
    <div id="content">
      <el-form label-position="right" label-width="90px">
        <el-form-item class="item" label="原密码：">
          <el-input class="input" v-model="o_pswd" show-password></el-input>
        </el-form-item>
        <el-form-item class="item" label="新密码：">
          <el-input class="input" v-model="n_pswd" show-password></el-input>
        </el-form-item>
        <el-form-item class="item" label="确认密码：">
          <el-input class="input" v-model="r_pswd" show-password></el-input>
        </el-form-item>
      </el-form>

      <el-button class="finished" @click="change_pswd">完成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Change_pswd",

  data() {
    return {
      o_pswd: "",
      n_pswd: "",
      r_pswd: "",
    };
  },

  methods: {
    change_pswd() {
      if (this.o_pswd == "") {
        this.$notify({
          title: "警告",
          message: "请输入原密码！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      if (this.n_pswd == "") {
        this.$notify({
          title: "警告",
          message: "请输入新密码！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      if (this.r_pswd == "" || this.n_pswd != this.r_pswd) {
        this.$notify({
          title: "警告",
          message: "请保持两次密码一致！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      let data = {
        password: this.o_pswd,
        newPassword1: this.n_pswd,
        newPassword2: this.r_pswd,
      };

      console.log(data);

      this.$axios({
        method: "put",
        url: "/accountT/password",
        data: data,
      }).then((re) => {
        if (re.data.code != "200") {
          let msg = re.data.msg;
          this.$message.error(msg);
        } else {
          this.$message({
            message: "修改密码成功！",
            type: "success",
          });

          this.o_pswd = "";
          this.n_pswd = "";
          this.r_pswd = "";
        }
      });
    },
  },
};
</script>

<style scoped>
#change_pswd {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  height: 100%;
}

#title {
  border-bottom: 2px #ea1429 solid;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 3%;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  width: 95%;
  height: 6%;
}

#content {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 18%;
  margin-bottom: 30%;
  width: 50%;
  height: 30%;
}

.item >>> .el-form-item__label {
  color: #333;
}

.input >>> .el-input__inner {
  border-radius: 0;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15) inset;
}

.input >>> .el-input__inner:focus {
  border-color: #fa7d3c;
}

.finished {
  margin-top: 18%;
  margin-left: 33%;
  width: 50%;
  color: #fff;
  background-color: #ff8140;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.finished:hover {
  background-color: #eb7350;
}
</style>