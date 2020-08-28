<template>
  <div id="myhome_page">
    <div id="content">
      <div id="message">
        <img id="avatar" :src="avatar" />

        <div id="name">
          <span>{{username}}</span>
        </div>

        <div id="signature">{{signature}}</div>

        <div id="btn" v-show="!isMe">
          <el-button class="atten" plain v-if="!isAttention" @click="attention">关注</el-button>
          <el-button class="atten" plain title="取消关注" v-else @click="attention">已关注</el-button>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from "../../store/store";

export default {
  name: "Myhome_page",

  data() {
    return {
      isLogin: false,
      isMe: false,
      isAttention: false,
      avatar: require("../../assets/avatar.png"),
      username: "",
      signature: "该吃吃，该睡睡，爱咋咋。",
    };
  },

  created() {
    this.username = this.$route.params.user;
    if (store.state.username != this.username) {
      this.isMe = false;
    } else {
      this.isMe = true;
    }

    // if (store.state.token != "") {
    //   this.isLogin = true;
    // } else {
    //   this.isLogin = false;
    // }

    // this.$axios({
    //   method: "",
    //   url: "",
    // }).then((re) => {
    //   console.log(re);
    // });
  },

  watch: {
    $route(to) {
      this.username = to.params.user;
      if (store.state.username != this.username) {
        this.isMe = false;
      } else {
        this.isMe = true;
      }

      // if (store.state.token != "") {
      //   this.isLogin = true;
      // } else {
      //   this.isLogin = false;
      // }

      // this.$axios({
      //   method: "",
      //   url: "",
      // }).then((re) => {
      //   console.log(re);
      // });
    },
  },

  methods: {
    attention(e) {
      // 取消关注
      // if (this.isAttention) {
      //   this.$axios({
      //     method: "",
      //     url: "",
      //   }).then((re) => {
      this.isAttention = !this.isAttention;
      //   });
      // } else {
      //   this.$axios({
      //     method: "",
      //     url: "",
      //   }).then((re) => {
      //     this.isAttention = !this.isAttention;
      //   });
      // }

      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();
    },
  },
};
</script>

<style scoped>
#myhome_page {
  /* border: 1px red solid;
  box-sizing: border-box; */
  height: 100%;
  width: 100%;
  background: url("../../assets/page.jpg") scroll;
  background-repeat: no-repeat;
  background-color: #e0c99f;
  /* overflow-x: hidden; */
  /* overflow-y: scroll; */
}

#content {
  /* border: 1px blueviolet solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 1.5%;
  height: auto;
  width: 1000px;
}

#message {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin: 0 auto;
  margin-top: 8.5%;
  width: 910px;
  height: 278px;
  background: url("../../assets/background.jpg");
}

#avatar {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: block;
  margin: 0 auto;
  margin-top: 3.5%;
  width: 100px;
  height: 100px;
  border-radius: 50px;
}

#name {
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-top: 1%;
  text-align: center;
  font-size: 22px;
  color: #fff;
}

#signature {
  margin-top: 0.5%;
  text-align: center;
  font-size: 12px;
  color: #fff;
}

#btn {
  width: fit-content;
  margin: 0 auto;
  margin-top: 2%;
}

.atten {
  background-color: #666b75;
  border-color: #666b75;
  color: #fff;
}

.atten:hover {
  border-color: #585d66;
  background-color: #585d66;
  color: #fff;
}
</style>
