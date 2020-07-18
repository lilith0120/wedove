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
            <span class="menu_item" slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="go_page(2)">
            <span class="menu_item" slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="3" @click="go_page(3)">
            <span class="menu_item" slot="title">我的赞</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div id="m_content">
        <div id="s_blog">
          <Editor></Editor>
        </div>

        <div class="b_content" v-for="(blog, index) in blogs" :key="index">
          <div class="b_top">
            <img class="b_avatar" :src="blog.avatar" />
            <div class="b_middle">
              <div class="b_user" @click="go_userhome(blog.user)">{{blog.user}}</div>
              <div class="b_time">{{blog.time}}</div>
            </div>
          </div>

          <div class="b_m_content" v-html="blog.content"></div>

          <div class="b_bottom">
            <ul>
              <li class="b_tips" id="star" @click="get_up(blog.id, blog.star, 1)">
                <i class="iconfont icon-star">
                  <span class="b_tip" v-if="blog.star == 0">收藏</span>
                  <span class="b_tip" v-else>{{blog.star}}</span>
                </i>
              </li>
              <li class="b_tips" id="forward" @click="go_blog(blog.id, 1)">
                <i class="iconfont icon-forward">
                  <span class="b_tip" v-if="blog.forward == 0">转发</span>
                  <span class="b_tip" v-else>{{blog.forward}}</span>
                </i>
              </li>
              <li class="b_tips" id="commit" @click="go_blog(blog.id, 2)">
                <i class="iconfont icon-commit">
                  <span class="b_tip" v-if="blog.commit == 0">评论</span>
                  <span class="b_tip" v-else>{{blog.commit}}</span>
                </i>
              </li>
              <li class="b_tips" id="praised" @click="get_up(blog.id, blog.praised, 2)">
                <i class="iconfont icon-praised">
                  <span class="b_tip" v-if="blog.praised == 0">赞</span>
                  <span class="b_tip" v-else>{{blog.praised}}</span>
                </i>
              </li>
            </ul>
          </div>
        </div>
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
      blogs: [
        {
          id: 1,
          avatar: require("../../assets/avatar.png"),
          user: "天问",
          time: "2020-07-16 23:44",
          content: "<p>要睡觉了！<br></p>",
          star: 0,
          forward: 0,
          commit: 2,
          praised: 3
        },
        {
          id: 2,
          avatar: require("../../assets/avatar.png"),
          user: "九歌",
          time: "2020-07-18 16:30",
          content: "<p>好饿啊！</p><p>想吃好吃的！</p><p>呜呜呜！</p>",
          star: 1,
          forward: 2,
          commit: 0,
          praised: 0
        },
        {
          id: 3,
          avatar: require("../../assets/avatar.png"),
          user: "九歌",
          time: "2020-07-18 21:38",
          content: `<p><img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d5/2018new_yueliang_org.png" alt="[月亮]" data-w-e="1">晚上早点睡觉！！！<br></p>`,
          star: 0,
          forward: 0,
          commit: 0,
          praised: 0
        }
      ]
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
    },

    go_userhome(user) {
      alert(user);
    },

    get_up(id, num, type) {
      // 判断是否赞过
      // this.$axios({
      //   method: '',
      //   url: '',
      //   data: data
      // }).then(re => {
      //   console.log(re)
      // })

      this.blogs.filter(a => {
        if (a.id == id && type == 1) {
          a.star = num + 1;
        } else if (a.id == id && type == 2) {
          a.praised = num + 1;
        }
      });
      num += 1;
      console.log(num);

      // 保存点赞记录
      // this.$axios({
      //   method: '',
      //   url: '',
      //   data: data
      // }).then(re => {
      //   console.log(re)
      // })
    },

    go_blog(id, type) {
      alert(type);
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
  padding-bottom: 1.5%;
  height: auto;
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

.menu_item {
  line-height: 0;
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
  border-radius: 2px;
  height: 165px;
  background-color: #fff;
}

.b_content {
  border: 1px #fff solid;
  box-sizing: border-box;
  border-radius: 2px;
  margin-top: 1.5%;
  min-height: 135px;
  background-color: #fff;
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

.b_top {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 3%;
  width: 94%;
}

.b_avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.b_middle {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2%;
}

.b_user {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.b_user:hover {
  cursor: pointer;
  color: #eb7350;
}

.b_time {
  margin-top: 7%;
  font-size: 12px;
  font-weight: initial;
  color: #919191;
}

.b_m_content {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 13%;
  width: 84%;
  font-size: 14px;
  color: #333;
}

.b_bottom {
  border-top: 1px #f2f2f5 solid;
  box-sizing: border-box;
  margin-top: 1.2%;
  height: 37px;
}

.b_bottom ul {
  list-style-type: none;
  text-align: center;
  color: #919191;
}

.b_tips {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: inline-block;
  margin: 1.5% 0;
  width: 25%;
}

.b_tips:hover {
  cursor: pointer;
  color: #eb7350;
}

.b_tip {
  /* border: 1px blue solid;
  box-sizing: border-box; */
  margin-left: 4%;
  font-size: 12px;
}

.iconfont {
  font-size: 15px;
}

#star,
#forward,
#commit {
  border-right: 1px #d9d9d9 solid;
  box-sizing: border-box;
}
</style>

<style>
.el-loading-spinner i,
.el-loading-spinner .el-loading-text {
  color: #eb7350;
}
</style>