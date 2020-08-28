<template>
  <div id="attention_page">
    <div id="m_msg">
      <el-menu default-active="1">
        <el-menu-item index="1" @click="go_page(1)">
          <span class="menu_item" slot="title">
            关注
            <span class="num" v-if="attention_num < 10000">{{attention_num}}</span>
            <span class="num" v-else>9999+</span>
          </span>
        </el-menu-item>
        <el-menu-item index="2" @click="go_page(2)">
          <span class="menu_item" slot="title">
            粉丝
            <span class="num" v-if="fan_num < 10000">{{fan_num}}</span>
            <span class="num" v-else>9999+</span>
          </span>
        </el-menu-item>
      </el-menu>
    </div>

    <div id="blogs">
      <div class="b_content" v-for="(blog, index) in blogs" :key="index">
        <div class="b_top">
          <img class="b_avatar" :src="blog.avatar" />
          <div id="middle_bottom">
            <div class="b_middle">
              <el-popover
                placement="top"
                width="350"
                trigger="hover"
                @show="isShow.splice(index, 1, true)"
                @hide="isShow.splice(index, 1, false)"
              >
                <user-card :isShow="isShow[index]" :user="blog.user"></user-card>
                <div class="b_user" slot="reference" @click="go_userhome(blog.user)">{{blog.user}}</div>
              </el-popover>
            </div>

            <div id="bottom">
              <ul>
                <li id="attention">
                  <span class="tip">关注</span>
                  <span
                    class="b_num"
                    v-if="blog.attention_num < 10000"
                    @click="go_msg(1)"
                  >{{blog.attention_num}}</span>
                  <span class="b_num" v-else @click="go_msg(1)">9999+</span>
                </li>
                <li id="fan">
                  <span class="tip">粉丝</span>
                  <span
                    class="b_num"
                    v-if="blog.fan_num < 10000"
                    @click="go_msg(2)"
                  >{{blog.fan_num}}</span>
                  <span class="b_num" v-else @click="go_msg(2)">9999+</span>
                </li>
                <li id="blog">
                  <span class="tip">微博</span>
                  <span
                    class="b_num"
                    v-if="blog.blog_num < 10000"
                    @click="go_msg(3, blog.user)"
                  >{{blog.blog_num}}</span>
                  <span class="b_num" v-else @click="go_msg(3)">9999+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userCard from "../../Home/Content/User_card";

export default {
  name: "Attention_page",

  components: {
    userCard,
  },

  data() {
    return {
      attention_num: 0,
      fan_num: 0,
      isShow: [],
      blogs: [
        {
          id: 1,
          avatar: require("../../../assets/avatar.png"),
          user: "天问",
          attention_num: 2,
          fan_num: 4,
          blog_num: 100,
        },
        {
          id: 2,
          avatar: require("../../../assets/avatar.png"),
          user: "九歌",
          attention_num: 112,
          fan_num: 114,
          blog_num: 1200,
        },
      ],
    };
  },

  methods: {
    go_page(type) {
      if (type == 1) {
        return;
      } else {
        this.$router.push({ name: "fan_page" });
      }
    },

    go_userhome(user) {
      this.$router.push(`/myhome/${user}`);
    },

    go_msg(type, user) {
      if (type == 3) {
        this.$router.push(`/myhome/${user}`);
      } else if (type == 1) {
        this.$router.push({ name: "attention_page" });
      } else {
        this.$router.push({ name: "fan_page" });
      }
    },
  },
};
</script>

<style scoped>
#attention_page {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 1.5%;
  padding-bottom: 1.5%;
  height: auto;
  width: 910px;
}

#m_msg {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 300px;
  height: 60px;
  background-color: #fff;
}

.menu_item,
.num {
  font-size: 12px;
  color: #919191;
}

.el-menu-item:hover {
  background-color: #f2f2f5;
}

.num {
  margin-left: 2%;
}

#blogs {
  /* border: 1px black solid;
  box-sizing: border-box; */
  width: 600px;
}

.b_content {
  border: 1px #fff solid;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 1.5%;
  min-height: 50px;
  background-color: #fff;
}

.b_top {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  margin: 0 auto;
  margin-top: 3%;
  width: 94%;
}

.b_avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

#middle_bottom {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 2%;
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
  display: inline;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.b_user:hover {
  cursor: pointer;
  color: #eb7350;
}

#bottom {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 2%;
  width: 300px;
  height: 60px;
  background-color: #fff;
}

#bottom ul {
  list-style-type: none;
}

#attention,
#fan,
#blog {
  display: inline-block;
  width: 20%;
}

#attention,
#fan {
  border-right: 1px #d9d9d9 solid;
  box-sizing: border-box;
}

#fan,
#blog {
  margin-left: 3%;
}

.b_num:hover {
  cursor: pointer;
  color: #eb7350;
}

.b_num,
.tip {
  font-size: 12px;
  color: #919191;
}

.b_num {
  margin-left: 10%;
}
</style>

<style>
.el-popover {
  padding: 0;
}
</style>