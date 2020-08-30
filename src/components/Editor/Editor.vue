<template>
  <div id="m_editor">
    <div id="tips">有什么新鲜事想告诉大家?</div>
    <at :members="members">
      <div id="tool" class="toolbar"></div>
      <div id="editor" class="text"></div>
      <el-button id="btn" @click="send_blog">发布</el-button>
    </at>
  </div>
</template>

<script>
import Editor from "wangeditor";
import At from "vue-at";

export default {
  name: "Editor",

  components: {
    At,
  },

  data() {
    return {
      blog: "",
      emotions: [],
      members: [],
    };
  },

  mounted() {
    this.editor_config();
  },

  methods: {
    editor_config() {
      this.$axios({
        method: "get",
        url: "http://localhost:8080/emotion.json",
      }).then((re) => {
        console.log(re);
        this.emotions = re.data;
        let editor = new Editor("#editor", "#tool");
        editor.customConfig.menus = [
          "emoticon", // 表情
          "image", // 插入图片
          "link", // 插入链接
        ];
        editor.customConfig.onchange = () => {
          this.blog = editor.txt.html();
          console.log(this.blog); //
        };

        console.log(this.emotions);
        if (this.emotions != undefined && this.emotions.length > 0) {
          editor.customConfig.emotions = this.emotions;
        }

        editor.customConfig.zIndex = 1;

        // 上传图片的api和文件名
        editor.customConfig.showLinkImg = false;
        editor.customConfig.uploadImgServer = "#";
        editor.customConfig.uploadFileName = "file";
        editor.customConfig.customAlert = (info) => {
          this.$message.error(info);
        };
        editor.customConfig.uploadImgHooks = {
          before(xhr, editor, files) {
            console.log(files);
          },
          // 图片上传并返回结果，图片插入成功之后触发
          success(xhr, editor, result) {
            console.log(xhr);
            console.log(editor);
            console.log(result);
          },
          // 图片上传并返回结果，但图片插入错误时触发
          fail() {
            this.$message.error("图片插入失败！");
          },
          // 图片上传出错时触发
          error() {
            this.$message.error("图片上传失败！");
          },
        };

        editor.create();
      });
    },

    send_blog() {
      if (this.blog == "" || this.blog == "<p><br></p>") {
        this.$message({
          message: "你什么都还没输入哦！",
          type: "warning",
          duration: 2000,
        });

        return;
      }

      let data = {
        content: this.blog,
      };

      this.$axios({
        method: "post",
        url: "/blog",
        data: data,
      }).then((re) => {
        console.log(re);
        if (re.data.code == "200") {
          this.$message({
            message: "发布成功！",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#m_editor {
  border: 1px #fff solid;
  box-sizing: border-box;
  border-radius: 2px;
}

#tips {
  margin-top: 1.5%;
  margin-left: 2%;
  font-size: 18px;
  color: #866c44;
}

.text {
  display: inline-flex;
  width: 50%;
  margin-top: 0.7%;
}

.toolbar {
  margin-top: 1.5%;
  margin-left: 1.5%;
  width: 97%;
  height: 80px;
}

#btn {
  margin-left: 34.5%;
  font-size: 14px;
  width: 14%;
  padding: 1.5% 0;
  color: #fff;
  background-color: #ff8140;
}

#btn:hover {
  background-color: #f7671d;
}
</style>

<style>
.w-e-text {
  border: 1px #cccccc solid;
  box-sizing: border-box;
  overflow: auto;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15) inset;
}

.w-e-text:focus {
  border-color: #eb7350;
}

.atwho-view {
  position: relative;
  left: 0;
}
</style>