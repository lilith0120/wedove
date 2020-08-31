<template>
  <div id="commit">
    <div id="add_commit">
      <el-input class="input" type="textarea" autosize v-model="commit"></el-input>
      <el-button id="btn" @click="send_commit(0)">评论</el-button>
    </div>

    <div class="show_commit" v-for="(commit, index) in commits" :key="index">
      <div class="b_top">
        <div class="b_middle">
          <el-popover
            placement="top"
            width="350"
            trigger="hover"
            @show="isShow.splice(index, 1, true)"
            @hide="isShow.splice(index, 1, false)"
          >
            <user-card :isShow="isShow[index]" :user="commit.name"></user-card>
            <div class="b_user" slot="reference" @click="go_userhome(commit.name)">{{commit.name}} :</div>
          </el-popover>
          <div class="b_m_content">{{commit.content}}</div>

          <div class="b_time">
            <span>{{commit.commentTime}}</span>
            <div id="c_right">
              <el-popover placement="bottom-end" width="600" :offset="85">
                <div id="add_commit">
                  <el-input class="input" type="textarea" autosize v-model="r_commit[index]"></el-input>
                  <el-button id="btn" @click="send_commit(commit.accountID, index)">评论</el-button>
                </div>
                <span class="c_tip" id="reply" slot="reference">回复</span>
              </el-popover>

              <span class="c_tip" @click="go_praised(commit.commentID)">点赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userCard from "../Content/User_card";

export default {
  name: "Commit",

  components: {
    userCard,
  },

  data() {
    return {
      commit: "",
      r_commit: {},
      isShow: [],
      commits: [
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 2,
          blogID: 2,
          accountID: 1,
          name: "jiuge",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-30 14:41:05",
          content: "评论一下博客",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
        {
          commentID: 1,
          blogID: 2,
          accountID: 1,
          name: "天问",
          likeNumber: 0,
          receivedID: 0,
          commentTime: "2020-08-22 11:13:46",
          content: "来一个评论",
        },
      ],
    };
  },

  props: ["id"],

  created() {
    this.$axios({
      method: "get",
      url: `/comment/${this.id}`,
    }).then((re) => {
      if (re.data.code == "200") {
        this.commits = re.data.data;
      }
    });
  },

  methods: {
    send_commit(id, num) {
      let data = {
        blogID: this.id,
        receivedID: id,
      };

      if (id == 0) {
        if (this.commit == "") {
          return;
        }
        data["content"] = this.commit;
      } else {
        if (this.r_commit[num] == "") {
          return;
        }
        data["content"] = this.r_commit[num];
      }

      this.$axios({
        method: "post",
        url: "/comment",
        data: data,
      }).then((re) => {
        console.log(re);
      });
    },

    go_praised(id) {
      this.$axios({
        method: "put",
        url: `/comment/like/${id}`,
      }).then((re) => {
        if (re.data.code != "200") {
          this.$message.error("点赞失败！");
        }
      });
    },
  },
};
</script>

<style scoped>
#commit {
  /* border: 1px red solid;
  box-sizing: border-box; */
  background-color: #f2f2f5;
}

#add_commit {
  border-bottom: 1px #d9d9d9 solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input >>> .el-textarea__inner {
  resize: none;
  width: 90%;
  margin: 3% auto;
}

.input >>> .el-textarea__inner:focus {
  border-color: #ff8140;
}

#btn {
  margin-left: 81%;
  margin-bottom: 3%;
  font-size: 14px;
  width: 14%;
  padding: 1.5% 0;
  color: #fff;
  background-color: #ff8140;
}

#btn:hover {
  background-color: #f7671d;
}

.b_top {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin: 1.5%;
  width: 94%;
}

.b_middle {
  /* border: 1px red solid;
  box-sizing: border-box; */
  width: 100%;
  margin-left: 2%;
}

.b_user {
  display: inline;
  font-size: 12px;
  font-weight: bold;
  color: #333;
}

.b_user:hover {
  cursor: pointer;
  color: #eb7350;
}

.b_time {
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: initial;
  color: #919191;
}

.b_m_content {
  display: inline-block;
  /* border: 1px red solid;
  box-sizing: border-box; */
  margin-left: 2%;
  /* width: 84%; */
  font-size: 12px;
  color: #333;
}

#c_right {
  /* border: 1px red solid; */
  width: 15%;
  display: inline-block;
}

.c_tip {
  margin: 0 5%;
}

.c_tip:hover {
  cursor: pointer;
  color: #ff8140;
}
</style>

<style>
.el-popover {
  padding: 0;
}
</style>