<template>
  <div id="change_avatar">
    <div id="title">修改头像</div>
    <div id="content">
      <el-image class="show" :src="url">
        <div slot="placeholder" class="image-slot">
          加载中
          <span class="dot">...</span>
        </div>
      </el-image>
      <div class="btn">
        <el-button class="e_btn" @click="isShow = true">选择图片</el-button>
        <el-button class="e_btn" @click="save_avatar">保存</el-button>
      </div>
    </div>

    <el-dialog
      title="设置头像"
      class="dialog"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      v-if="isShow"
      destroy-on-close
      append-to-body
    >
      <uploadAvatar></uploadAvatar>
    </el-dialog>
  </div>
</template>

<script>
import uploadAvatar from "./Upload_avatar";

export default {
  name: "Change_avatar",

  components: {
    uploadAvatar
  },

  data() {
    return {
      url: require("../../../assets/avatar.png"),
      avatar: "",
      isShow: false
    };
  },

  methods: {
    save_avatar() {
      if (this.avatar == "") {
        this.$notify({
          title: "警告",
          message: "请先选择图片 ！",
          type: "warning",
          showClose: false,
          duration: 2000
        });

        return;
      }

      let data = {
        avatar: this.avatar
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
#change_avatar {
  /* border: 1px brown solid;
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
  /* border: 1px brown solid;
  box-sizing: border-box; */
  display: flex;
  margin-bottom: 18%;
  width: 95%;
  height: 60%;
}

.show {
  border: 1px #ccc solid;
  box-sizing: border-box;
  width: 23.5%;
  height: 53.5%;
}

.btn {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 4%;
  margin-left: 5%;
  width: 20%;
  height: 35%;
}

.e_btn {
  margin: 0;
  color: #fff;
  background-color: #ffa00a;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.e_btn:hover {
  background-color: #ffb641;
}
</style>