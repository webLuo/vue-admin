<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" styleName="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="header-icon user-info pull-left">
        <svg-icon iconClass="admin" styleName="admin"></svg-icon>
        {{username}}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" styleName="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  computed: {
    username: function() {
      return this.$store.state.app.username;
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    navMenuState() {
      this.$store.commit("app/SET_COLLAPSE");
    },
    exit() {
      this.$store.dispatch("app/logout").then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 30px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 30px;
  border-right: 1px solid #ededed;
  svg {
    padding: 0 10px;
  }
  + .header-icon {
    padding: 0 28px;
  }
}
</style>
