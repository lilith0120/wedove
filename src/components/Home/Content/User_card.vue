<template>
  <div id="user_card">
    <img id="avatar" :src="avatar" />

    <div id="name">{{user}}</div>

    <div id="m_msg">
      <ul>
        <li id="attention">
          <span class="tip">关注</span>
          <span class="num" v-if="attention_num < 10000" @click="go_msg(1)">{{attention_num}}</span>
          <span class="num" v-else @click="go_msg(1)">9999+</span>
        </li>
        <li id="fan">
          <span class="tip">粉丝</span>
          <span class="num" v-if="fan_num < 10000" @click="go_msg(2)">{{fan_num}}</span>
          <span class="num" v-else @click="go_msg(2)">9999+</span>
        </li>
        <li id="blog">
          <span class="tip">微博</span>
          <span class="num" v-if="blog_num < 10000" @click="go_msg(3)">{{blog_num}}</span>
          <span class="num" v-else @click="go_msg(3)">9999+</span>
        </li>
      </ul>
    </div>

    <div id="btn">
      <el-button class="atten" plain size="small" v-if="!isAttention" @click="attention">关注</el-button>
      <el-button class="atten" plain size="small" title="取消关注" v-else @click="attention">已关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "User_card",

  data() {
    return {
      avatar: require("../../../assets/avatar.png"),
      attention_num: 0,
      fan_num: 0,
      blog_num: 0,
      isAttention: false,
    };
  },

  props: ["isShow", "user"],

  watch: {
    isShow(newValue) {
      if (newValue) {
        // 查看资料，以及是否关注
        this.$axios({
          method: "get",
          url: "/followList/follow",
        }).then((re) => {
          for (let i in re.data.data) {
            if (i.followID == this.id) {
              this.isAttention = true;
              break;
            }
          }
        });
      }
    },
  },

  methods: {
    attention(e) {
      // 取消关注
      if (this.isAttention) {
        this.$axios({
          method: "delete",
          url: `/followList/${this.id}`,
        }).then((re) => {
          console.log(re);
          if (re.data.code == "200") this.isAttention = !this.isAttention;
        });
      } else {
        this.$axios({
          method: "post",
          url: `/followList/follow/${this.id}`,
        }).then((re) => {
          console.log(re);
          if (re.data.code == "200") this.isAttention = !this.isAttention;
        });
      }

      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();
    },

    go_msg(type) {
      if (type == 3) {
        this.$router.push(`/myhome/${this.user}`);
      } else if (type == 1) {
        this.$router.push(`/myhome/${this.user}/attention`);
      } else {
        this.$router.push(`/myhome/${this.user}/fan`);
      }
    },
  },
};
</script>

<style scoped>
#user_card {
  border: 1px #fff solid;
  box-sizing: border-box;
  height: 200px;
  background: url("../../../assets/background.jpg") no-repeat top / contain;
  background-color: #fff;
}

#avatar {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: block;
  margin: 0 auto;
  margin-top: 3%;
  width: 55px;
  height: 55px;
  border-radius: 50px;
}

#name {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 4%;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

#m_msg {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin: 0 auto;
  margin-top: 5%;
  width: 60%;
  /* height: 22%; */
  font-weight: bold;
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
  font-size: 12px;
  color: #333;
}

.num:hover {
  cursor: pointer;
  color: #eb7350;
}

.tip {
  margin-right: 5%;
  font-size: 12px;
  color: #333;
}

#btn {
  width: fit-content;
  margin: 0 auto;
  margin-top: 5%;
}

.atten:hover {
  border-color: #eb7350;
  color: #eb7350;
}
</style>