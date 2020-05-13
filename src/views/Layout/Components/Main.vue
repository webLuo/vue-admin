<template>
  <div id="main-wrap">
    <el-scrollbar style="height:100%">
      <div class="content">
        <router-view />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: absolute;
  top: 50px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  // height: 100%;
  background: #fff;
  margin: 10px 10px 0 10px;
  @include webkit("transition", all 0.3s ease 0s);
}
.open {
  #main-wrap {
    left: $navMenu;
  }
}
.close {
  #main-wrap {
    left: $navMenuMin;
  }
}
.content {
  padding: 15px 15px 0 15px;
}
</style>
