<template>
  <div id="home_page">
    <div id="content">
      <div
        id="sidebar"
        v-loading="!isLogin"
        element-loading-text="请先登录"
        element-loading-spinner="el-icon-warning"
      >
        <el-menu default-active="1">
          <el-menu-item index="1" @click="go_page(1)">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="go_page(2)">
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="3" @click="go_page(3)">
            <span slot="title">我的赞</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div id="m_content">
        <div id="s_blog">
          <Editor></Editor>
        </div>

        <div class="b_content" v-for="(blog, index) in blogs" :key="index"></div>
      </div>

      <div
        id="message"
        v-loading="!isLogin"
        element-loading-text="请先登录"
        element-loading-spinner="el-icon-warning"
      >
        <img id="avatar" :src="avatar" />

        <div id="name">
          <span @click="go_myhome">{{username}}</span>
        </div>

        <div id="m_msg">
          <ul>
            <li id="attention">
              <span class="num" v-if="attention_num < 10000" @click="go_msg(1)">{{attention_num}}</span>
              <span class="num" v-else @click="go_msg(1)">9999+</span>
              <span class="tip">关注</span>
            </li>
            <li id="fan">
              <span class="num" v-if="fan_num < 10000" @click="go_msg(2)">{{fan_num}}</span>
              <span class="num" v-else @click="go_msg(2)">9999+</span>
              <span class="tip">粉丝</span>
            </li>
            <li id="blog">
              <span class="num" v-if="blog_num < 10000" @click="go_msg(3)">{{blog_num}}</span>
              <span class="num" v-else @click="go_msg(3)">9999+</span>
              <span class="tip">微博</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../Editor/Editor";

export default {
  name: "Home_page",

  components: {
    Editor
  },

  data() {
    return {
      isLogin: true,
      avatar: require("../../assets/avatar.png"),
      username: "行露的吸血鬼",
      attention_num: 41,
      fan_num: 21,
      blog_num: 367,
      blogs: []
    };
  },

  // created() {
  //   this.$axios({
  //     method: "",
  //     url: ""
  //   }).then(re => {
  //     console.log(re);
  //   });
  // },

  methods: {
    go_myhome() {
      alert(233);
    },

    go_msg(type) {
      alert(type);
    },

    go_page(type) {
      if (type == 1) {
        this.$router.push({ name: "home_page" });
      } else if (type == 2) {
        alert(22);
      } else {
        alert(33);
      }
    }
  }
};
</script>

<style scoped>
#home_page {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 100%;
  width: 100%;
  background: url("../../assets/page.jpg") scroll;
  background-repeat: no-repeat;
  background-color: #e0c99f;
  /* overflow-x: hidden; */
  /* overflow-y: overlay; */
}

#content {
  /* border: 1px blueviolet solid;
  box-sizing: border-box; */
  display: flex;
  margin: 0 auto;
  height: 100%;
  width: 1000px;
  background-color: rgba(98, 77, 39, 0.25);
  /* opacity: 0.25; */
}

#sidebar {
  /* border: 1px black solid;
  box-sizing: border-box; */
  position: fixed;
  top: 65px;
  width: 150px;
  height: 100%;
  z-index: 10;
}

.el-menu {
  background-color: rgba(98, 77, 39, 0);
  border: none;
}

.el-menu-item {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  height: 40px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

#m_content {
  /* border: 1px blue solid;
  box-sizing: border-box; */
  margin-top: 65px;
  margin-left: 15.1%;
  width: 60%;
}

#s_blog {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 165px;
  background-color: #fff;
}

.b_content {
  border: 1px yellowgreen solid;
  box-sizing: border-box;
}

#message {
  /* border: 1px red solid;
  box-sizing: border-box; */
  position: fixed;
  top: 65px;
  margin-left: 49.5%;
  width: 230px;
  height: 165px;
  background: url("../../assets/background.jpg") no-repeat top / contain;
  background-color: #fff;
}

#avatar {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: block;
  margin: 0 auto;
  margin-top: 12%;
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

#name {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 2%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

#name span:hover {
  cursor: pointer;
  color: #eb7350;
}

#m_msg {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 3%;
  height: 22%;
}

#m_msg ul {
  list-style-type: none;
  text-align: center;
}

#attention,
#fan,
#blog {
  display: inline-block;
  width: 30%;
}

#attention,
#fan {
  border-right: 1px #d9d9d9 solid;
  box-sizing: border-box;
}

.num {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.num:hover {
  cursor: pointer;
  color: #eb7350;
}

.tip {
  display: block;
  font-size: 12px;
  color: #919191;
}
</style>

<style>
.el-loading-spinner i,
.el-loading-spinner .el-loading-text {
  color: #eb7350;
}
</style>