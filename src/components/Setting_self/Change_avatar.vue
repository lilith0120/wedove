<template>
  <div id="change_avatar">
    <div id="title">修改头像</div>
    <el-upload
      action="#"
      accept="image/*"
      :auto-upload="false"
      :on-change="on_change"
      :show-file-list="false"
    >
      <el-button class="c_btn" icon="el-icon-upload2">选择图片</el-button>
    </el-upload>

    <div id="upload_avatar">
      <div id="cropper">
        <vueCropper
          ref="cropper"
          title="滑动滚轮改变图片大小"
          :img="option.img"
          :outputType="option.outputType"
          :fixedBox="option.fixedBox"
          :centerBox="option.centerBox"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :autoCrop="option.autoCrop"
          :info="option.info"
          @real-time="realTime"
        ></vueCropper>
      </div>

      <div class="show-preview" :style="previewStyle">
        <div :style="previews.div">
          <img :src="option.img" :style="previews.img" />
        </div>
      </div>
    </div>

    <el-button class="e_btn" @click="save_avatar">保存</el-button>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "Change_avatar",

  components: {
    VueCropper,
  },

  data() {
    return {
      previewStyle: "",
      previews: {},
      option: {
        img: "",
        outputType: "png",
        fixedBox: true,
        centerBox: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        autoCrop: true,
        info: false,
      },
    };
  },

  methods: {
    realTime(data) {
      let previews = data;

      this.previewStyle = {
        width: previews.w + "px",
        height: previews.h + "px",
        overflow: "hidden",
        margin: "0",
        borderRaidus: "50%",
      };

      this.previews = data;
    },

    on_change(file) {
      // console.log(file);
      this.option.img = URL.createObjectURL(file.raw);
    },

    save_avatar() {
      if (this.option.img == "") {
        this.$notify({
          title: "警告",
          message: "请先选择图片 ！",
          type: "warning",
          showClose: false,
          duration: 2000,
        });

        return;
      }

      this.$refs.cropper.getCropBlob((data) => {
        // let img = window.URL.createObjectURL(data);
        console.log(Date.now() + ".png");
        let form_data = new FormData();
        form_data.append("avatar", data, Date.now() + ".png");

        this.$axios({
          method: "put",
          url: "/accountT/avatar",
          data: form_data,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((re) => {
          console.log(re);
          if (re.data.code != "200") {
            let msg = re.data.msg;
            this.$message.error(msg);
          } else {
            this.$message({
              message: "修改头像成功！",
              type: "success",
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped>
#change_avatar {
  /* border: 1px brown solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.c_btn {
  margin-left: 33%;
  color: #333;
  border-color: #f2f2f2;
  background-color: #f2f2f2;
}

.c_btn:hover {
  color: #fff;
  background-color: #ffb541;
  border-color: #ffb541;
}

#upload_avatar {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  margin-left: 3%;
  height: 53%;
  width: 83%;
}

#cropper {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 2%;
  width: 45%;
  height: 100%;
}

.show-preview {
  border-radius: 50%;
}

#content {
  /* border: 1px brown solid;
  box-sizing: border-box; */
  display: flex;
  margin-bottom: 18%;
  width: 95%;
  height: 60%;
}

.e_btn {
  margin-bottom: 7%;
  margin-left: 5%;
  width: 15%;
  color: #fff;
  background-color: #ffa00a;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}

.e_btn:hover {
  background-color: #ffb641;
}
</style>