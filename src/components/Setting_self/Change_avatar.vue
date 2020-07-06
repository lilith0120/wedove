<template>
  <div id="change_avatar">
    <div id="title">修改头像</div>
    <div id="content">
      <!-- <vueCropper ref="cropper" :img="avatar"></vueCropper> -->
    </div>
  </div>
</template>

<script>
// import { VueCropper } from "vue-cropper";

export default {
  name: "Change_avatar",

  //   components: {
  //     VueCropper
  //   },

  data() {
    return {
      avatar: ""
    };
  }
};
</script>

<style scoped>
#change_avatar {
  /* border: 1px brown solid;
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

#content {
  border: 1px brown solid;
  box-sizing: border-box;
  margin-bottom: 18%;
  width: 95%;
  height: 60%;
}
</style>