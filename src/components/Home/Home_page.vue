<template>
  <div id="home_page">
    <div id="content">
      <div id="sidebar">
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

      <div id="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_page"
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
}

#content {
  /* border: 1px blueviolet solid;
  box-sizing: border-box; */
  display: flex;
  margin: 0 auto;
  height: 100%;
  width: 65.5%;
  background-color: rgba(98, 77, 39, 0.25);
  /* opacity: 0.25; */
}

#sidebar {
  border: 1px black solid;
  box-sizing: border-box;
  position: fixed;
  top: 65px;
  width: 9.8%;
  height: 100%;
  z-index: 10;
}

.el-menu {
  background-color: rgba(98, 77, 39, 0);
  border: none;
}

.el-menu-item {
  color: #fff;
  font-weight: bold;
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
  height: 100%;
}

#message {
  border: 1px red solid;
  box-sizing: border-box;
  position: fixed;
  top: 65px;
  right: 317px;
  width: 15%;
  height: 23%;
}
</style>