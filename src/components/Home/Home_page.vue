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
          <el-menu-item index="1">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">我的赞</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div id="m_content"></div>

      <div id="message">
        <img id="avatar" :src="avatar" />
        <div id="name">
          <span>{{username}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_page",

  data() {
    return {
      isLogin: false,
      avatar: require("../../assets/avatar.png"),
      username: "行露的吸血鬼"
    };
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
  width: 1110px;
  background-color: rgba(98, 77, 39, 0.25);
  /* opacity: 0.25; */
}

#sidebar {
  /* border: 1px black solid;
  box-sizing: border-box; */
  position: fixed;
  top: 65px;
  width: 165px;
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
  border: 1px blue solid;
  box-sizing: border-box;
  margin-top: 65px;
  margin-left: 15.1%;
  width: 60%;
}

#message {
  /* border: 1px red solid;
  box-sizing: border-box; */
  position: fixed;
  top: 65px;
  margin-left: 49.5%;
  width: 255px;
  height: 185px;
  background: url("../../assets/background.jpg") no-repeat top / contain;
  background-color: #fff;
}

#avatar {
  /* border: 1px red solid;
  box-sizing: border-box; */
  display: block;
  margin: 0 auto;
  margin-top: 12%;
  width: 70px;
  height: 70px;
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
</style>

<style>
.el-loading-spinner i,
.el-loading-spinner .el-loading-text {
  color: #eb7350;
}
</style>