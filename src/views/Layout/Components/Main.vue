<template>
  <div id="main-wrap">
    <div class="content">
      <router-view />
    </div>
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
  position: fixed;
  top: 50px;
  left: $navMenu;
  right: 0;
  bottom: 0;
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
  width: 100%;
  height: 100%;
  padding: 15px 15px 0 15px;
}
</style>
