<template>
  <div id="change_msg">
    <div id="title">我的信息</div>
  </div>
</template>

<script>
export default {
  name: "Change_msg"
};
</script>

<style scoped>
#change_msg {
  /* border: 1px blueviolet solid;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

#title {
  border-bottom: 2px #ea1429 solid;
  box-sizing: border-box;
  margin-top: 3%;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  width: 95%;
  height: 6%;
}
</style>