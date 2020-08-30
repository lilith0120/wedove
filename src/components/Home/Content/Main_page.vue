<template>
  <div id="main_page">
    <div id="s_blog">
      <Editor></Editor>
    </div>

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
            <user-card :isShow="isShow[index]" :user="blog.name"></user-card>
            <div class="b_user" slot="reference" @click="go_userhome(blog.name)">{{blog.name}}</div>
          </el-popover>

          <div class="b_time">{{blog.releaseTime}}</div>
        </div>
      </div>

      <div class="b_m_content" v-html="blog.content"></div>

      <div class="b_bottom">
        <ul>
          <li class="b_tips" id="star" @click="get_up(blog.blogID, blog.star, 1)" disabled>
            <i class="iconfont icon-star">
              <span class="b_tip" v-if="blog.star == 0">收藏</span>
              <span class="b_tip" v-else>{{blog.star}}</span>
            </i>
          </li>
          <li class="b_tips" id="forward" @click="go_blog(blog.blogID, 1)">
            <i class="iconfont icon-forward">
              <span class="b_tip" v-if="blog.repostNumber == 0">转发</span>
              <span class="b_tip" v-else>{{blog.repostNumber}}</span>
            </i>
          </li>
          <el-popover placement="bottom" width="600" trigger="click">
            <Commit></Commit>
            <li class="b_tips" id="commit" slot="reference">
              <i class="iconfont icon-commit">
                <span class="b_tip" v-if="blog.commentNumber == 0">评论</span>
                <span class="b_tip" v-else>{{blog.commentNumber}}</span>
              </i>
            </li>
          </el-popover>

          <li class="b_tips" id="praised" @click="get_up(blog.blogID, blog.likeNumber, 2)">
            <i class="iconfont icon-praised">
              <span class="b_tip" v-if="blog.likeNumber == 0">赞</span>
              <span class="b_tip" v-else>{{blog.likeNumber}}</span>
            </i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../../Editor/Editor";
import userCard from "../Content/User_card";
import Commit from "../Content/Commit";
import store from "../../../store/store";

export default {
  name: "Main_page",

  components: {
    Editor,
    userCard,
    Commit,
  },

  data() {
    return {
      isLogin: false,
      isShow: [],
      blogs: [
        {
          blogID: 1,
          avatar: require("../../../assets/avatar.png"),
          name: "天问",
          releaseTime: "2020-07-16 23:44",
          content: "<p>要睡觉了！<br></p>",
          star: 0,
          repostNumber: 0,
          commentNumber: 2,
          likeNumber: 3,
        },
      ],
    };
  },

  created() {
    if (store.state.token != "") {
      this.isLogin = true;

      this.$axios({
        method: "get",
        url: "/blog/all",
      }).then((re) => {
        console.log(re);
        if (re.data.code == "200") {
          // for (let i of re.data.data) {
          //   this.$axios({
          //     method: "get",
          //     url: "/accountT",
          //   });
          // }
          this.blogs = re.data.data;
        }
      });
    } else {
      this.isLogin = false;
    }
  },

  methods: {
    go_userhome(user) {
      this.$router.push(`/myhome/${user}`);
    },

    get_up(id, num, type) {
      // 保存点赞(收藏)记录
      this.$axios({
        method: "put",
        url: `/blog/like/${id}`,
      }).then((re) => {
        console.log(re);
        this.blogs.filter((a) => {
          if (a.id == id && type == 1) {
            a.star = re.data.data;
          } else if (a.id == id && type == 2) {
            a.praised = re.data.data;
          }
        });
      });
    },

    // go_blog(id, type) {
    //   if (type == 2) {
    //   }
    // },
  },
};
</script>

<style scoped>
#main_page {
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