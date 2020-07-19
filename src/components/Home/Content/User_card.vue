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
      blog_num: 0
    };
  },

  props: ["isShow", "user"],

  watch: {
    isShow(newValue) {
      if (newValue) {
        // this.$axios({
        //   method: '',
        //   url: '',
        //   data: data
        // }).then(re => {
        //   console.log(re)
        // })
      }
    }
  }
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
</style>