<template>
  <div id="change_msg">
    <div id="title">我的信息</div>

    <div id="content">
      <el-collapse v-model="active" accordion>
        <el-collapse-item class="dis" disabled>
          <template slot="title">
            <div class="c_title">用户名</div>
            <div class="msg">{{username}}</div>
          </template>
        </el-collapse-item>
        <el-collapse-item class="dis" disabled>
          <template slot="title">
            <div class="c_title">邮箱</div>
            <div class="msg">{{email}}</div>
          </template>
        </el-collapse-item>
        <el-collapse-item class="item" name="3">
          <template slot="title">
            <div class="c_title">手机号</div>
            <div v-if="phone != ''" class="msg">{{phone}}</div>
            <div v-else class="msg">未填写手机号</div>
          </template>
          <div>
            <el-form label-position="right" label-width="70px">
              <el-form-item class="f_item" label="手机号: ">
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn" @click="save('phone')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item class="item" name="4">
          <template slot="title">
            <div class="c_title">昵称</div>
            <div v-if="nickname != ''" class="msg">{{nickname}}</div>
            <div v-else class="msg">未填写昵称</div>
          </template>
          <div>
            <el-form label-position="right" label-width="70px">
              <el-form-item class="f_item" label="昵称: ">
                <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn" @click="save('nickname')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item class="item" name="5">
          <template slot="title">
            <div class="c_title">性别</div>
            <div v-if="sex != ''" class="msg">{{sex}}</div>
            <div v-else class="msg">未填写性别</div>
          </template>
          <div>
            <el-form label-position="right" label-width="70px">
              <el-form-item label="性别: ">
                <el-select class="s_input" v-model="sex" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button class="btn" @click="save('sex')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item class="item" name="6">
          <template slot="title">
            <div class="c_title">个性签名</div>
            <div v-if="signature != ''" class="msg">{{signature}}</div>
            <div v-else class="msg">未填写个性签名</div>
          </template>
          <div>
            <el-form label-position="right" label-width="70px">
              <el-form-item class="f_item" label="个性签名: ">
                <el-input v-model="signature" placeholder="请输入个性签名" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn" @click="save('signature')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Change_msg",

  data() {
    return {
      active: "0",
      username: "行露的吸血鬼",
      email: "1131155106@qq.com",
      phone: "",
      nickname: "",
      options: [
        {
          value: "保密",
          label: "保密",
        },
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      sex: "",
      signature: "",
    };
  },

  created() {
    this.$axios({
      method: "get",
      url: "/accountT",
    }).then((re) => {
      if (re.data.code == "200") {
        this.username = re.data.data.name;
        this.email = re.data.data.mailbox;
        this.phone = re.data.data.mobilePhone;
        this.nickname = re.data.data.nickname;
        this.sex = re.data.data.sex;
        this.signature = re.data.data.individualitySignature;
      }
    });
  },

  methods: {
    save(type) {
      let data = {};

      if (type == "phone") {
        data["mobilePhone"] = this.phone;
      } else if (type == "nickname") {
        data["nickname"] = this.nickname;
      } else if (type == "sex") {
        data["sex"] = this.sex;
      } else {
        data["individualitySignature"] = this.signature;
      }

      console.log(data);

      this.$axios({
        method: "put",
        url: "/accountT",
        data: data,
      }).then((re) => {
        if (re.data.code != "200") {
          let msg = re.data.msg;
          this.$message.error(msg);
        } else {
          this.$message({
            message: "修改成功！",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#change_msg {
  /* border: 1px blueviolet solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

#title {
  border-bottom: 2px #ea1429 solid;
  box-sizing: border-box;
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
  width: 95%;
  height: 88%;
}

.el-collapse {
  border: none;
}

.el-collapse-item {
  margin-bottom: 1.5%;
  border: 1px #d9d9d9 solid;
  box-sizing: border-box;
}

.c_title {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 20%;
  margin-left: 2.5%;
}

.msg {
  margin-left: 6%;
  color: #808080;
  font-weight: initial;
}

.dis >>> .el-collapse-item__arrow {
  display: none;
}

.btn {
  padding: 1% 2%;
  font-size: 12px;
  color: #fff;
  background-color: #ffa00a;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.btn:hover {
  background-color: #ffb641;
}

.f_item >>> .el-form-item__label {
  font-size: 12px;
}

.el-form {
  margin-left: 10%;
  height: 80px;
}

.el-form-item {
  margin: 0;
  margin-bottom: 1%;
}

.f_item >>> .el-input__inner {
  width: 40%;
  height: 30px;
}

.s_input >>> .el-input__inner:focus,
.f_item >>> .el-input__inner:focus {
  border-color: #ffb641;
}
</style>

<style>
.el-collapse-item__header {
  background-color: #f2f2f2;
  font-size: 12px;
  font-weight: bold;
}

.el-collapse-item__header.is-active {
  border: none;
  background-color: #fff;
}

.el-collapse-item__header.is-active .msg {
  display: none;
}

.el-collapse-item.is-disabled .el-collapse-item__header {
  cursor: default;
  color: #303133;
}
</style>