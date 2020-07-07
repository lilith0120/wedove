<template>
  <div id="upload_avatar">
    <div>
      <VueCropper ref="cropper" :img="avatar"></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

export default {
  name: "Upload_avatar",

  components: {
    VueCropper
  },

  data() {
    return {
      avatar: ""
    };
  }
};
</script>

<style scoped>
#upload_avatar {
  border: 1px red solid;
  box-sizing: border-box;
  height: 10%;
}
</style>