<template>
  <div id="mid_content">
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

    <div id="blogs">
      <div class="b_content" v-for="(blog, index) in blogs" :key="index">
        <div class="b_top">
          <img class="b_avatar" :src="blog.avatar" />
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
  </div>
</template>

<script>
import userCard from "../../Home/Content/User_card";

export default {
  name: "My_main_page",

  components: {
    userCard,
  },

  data() {
    return {
      attention_num: 0,
      fan_num: 0,
      blog_num: 0,
      isShow: [],
      blogs: [
        {
          id: 1,
          avatar: require("../../../assets/avatar.png"),
          user: "天问",
          time: "2020-07-16 23:44",
          content: "<p>要睡觉了！<br></p>",
          star: 0,
          forward: 0,
          commit: 2,
          praised: 3,
        },
        {
          id: 2,
          avatar: require("../../../assets/avatar.png"),
          user: "九歌",
          time: "2020-07-18 16:30",
          content: "<p>好饿啊！</p><p>想吃好吃的！</p><p>呜呜呜！</p>",
          star: 1,
          forward: 2,
          commit: 0,
          praised: 0,
        },
        {
          id: 3,
          avatar: require("../../../assets/avatar.png"),
          user: "九歌",
          time: "2020-07-18 21:38",
          content: `<p><img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d5/2018new_yueliang_org.png" alt="[月亮]" data-w-e="1">晚上早点睡觉！！！<br></p>`,
          star: 0,
          forward: 0,
          commit: 0,
          praised: 0,
        },
        {
          id: 4,
          avatar: require("../../../assets/avatar.png"),
          user: "天问",
          time: "2020-07-18 22:35",
          content: "<p>想吃好吃的！！！</p>",
          star: 0,
          forward: 0,
          commit: 2,
          praised: 3,
        },
      ],
    };
  },

  methods: {
    go_userhome(user) {
      this.$router.push(`/myhome/${user}`);
    },

    go_msg(type) {
      if (type == 3) {
        return;
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
#mid_content {
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

#m_msg ul {
  list-style-type: none;
  text-align: center;
}

#attention,
#fan,
#blog {
  display: inline-block;
  margin-top: 3%;
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
  min-height: 135px;
  background-color: #fff;
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
  display: inline;
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
.el-popover {
  padding: 0;
}
</style>