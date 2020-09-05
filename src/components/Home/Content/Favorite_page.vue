<template>
  <div id="favorite_page">
    <div id="f_header">
      <div>
        <span id="f_title">我的收藏</span>
        <span id="f_num">(共{{num}}条)</span>
      </div>
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
            <user-card :isShow="isShow[index]" :user="blog.name" :id="blog.accountID"></user-card>
            <div class="b_user" slot="reference" @click="go_userhome(blog.accountID)">{{blog.name}}</div>
          </el-popover>

          <div class="b_time">{{blog.releaseTime}}</div>
        </div>
      </div>

      <div class="b_m_content" v-html="blog.content"></div>

      <div class="b_bottom">
        <ul>
          <li class="b_tips" id="star" @click="get_up(blog.blogID, blog.collectNumber, 1)" disabled>
            <i class="iconfont icon-star">
              <span class="b_tip" v-if="blog.collectNumber == 0">收藏</span>
              <span class="b_tip" v-else>{{blog.collectNumber}}</span>
            </i>
          </li>
          <li class="b_tips" id="forward" @click="go_blog(blog.blogID, 1)">
            <i class="iconfont icon-forward">
              <span class="b_tip" v-if="blog.repostNumber == 0">转发</span>
              <span class="b_tip" v-else>{{blog.repostNumber}}</span>
            </i>
          </li>
          <li class="b_tips" id="commit" @click="go_blog(blog.blogID, 2)">
            <i class="iconfont icon-commit">
              <span class="b_tip" v-if="blog.commentNumber == 0">评论</span>
              <span class="b_tip" v-else>{{blog.commentNumber}}</span>
            </i>
          </li>
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
import userCard from "../Content/User_card";
import store from "../../../store/store";

export default {
  name: "Favorite_page",

  components: {
    userCard,
  },

  data() {
    return {
      num: 0,
      isLogin: false,
      isShow: [],
      blogs: [
        // {
        //   id: 1,
        //   avatar: require("../../../assets/avatar.png"),
        //   user: "天问",
        //   time: "2020-07-16 23:44",
        //   content: "<p>要睡觉了！<br></p>",
        //   star: 0,
        //   forward: 0,
        //   commit: 2,
        //   praised: 3,
        // },
      ],
    };
  },

  created() {
    if (store.state.username != "") {
      this.isLogin = true;

      this.$axios({
        method: "get",
        url: "/blog/collect",
      }).then((re) => {
        console.log(re);
        if (re.data.code == "200") {
          this.num = re.data.data.length;
          for (let i of re.data.data) {
            this.$axios({
              method: "get",
              url: `/accountT/avatar/${i.accountID}`,
            }).then((r) => {
              // console.log(r);
              i.avatar = `data:image/png;base64,${r.data.data}`;
              this.blogs.push(i);
            });
          }
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
      if (store.state.username == "") {
        this.$message({
          message: "请先登录！",
          type: "warning",
        });

        return;
      }

      if (type == 1) {
        this.$axios({
          method: "put",
          url: `/blog/collect/${id}`,
        }).then((re) => {
          console.log(re);
          this.blogs.filter((a) => {
            if (a.blogID == id) {
              a.collectNumber = re.data.data;
            }
          });
        });
      } else {
        this.$axios({
          method: "put",
          url: `/blog/like/${id}`,
        }).then((re) => {
          console.log(re);
          this.blogs.filter((a) => {
            if (a.blogID == id) {
              a.likeNumber = re.data.data;
            }
          });
        });
      }
    },

    // go_blog(id, type) {
    //   alert(type);
    // },
  },
};
</script>

<style scoped>
#favorite_page {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 65px;
  margin-left: 15.1%;
  width: 60%;
  min-height: 160px;
}

#f_header {
  border-radius: 2px;
  height: 40px;
  background-color: #fff;
}

#f_header div {
  border-bottom: 1.5px #fa7d3c solid;
  box-sizing: border-box;
  width: fit-content;
  height: 96%;
  padding-top: 1%;
  margin-left: 2%;
}

#f_title {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

#f_num {
  font-size: 12px;
  color: #333;
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

#forward:hover {
  cursor: no-drop;
  color: #919191;
}
</style>

<style>
.el-popover {
  padding: 0;
}
</style>