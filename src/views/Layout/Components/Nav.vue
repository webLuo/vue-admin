<template>
  <div id="nav-wrap">
    <h5 class="logo">
      <img src="../../../assets/logo.png" alt />
    </h5>
    <el-menu
      default-active="1-4-1"
      class="navMenu"
      :collapse="isCollapse"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in navMenuData">
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!--一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :styleName="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!--子级菜单-->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  data() {
    return {
      navMenuData: null
    };
  },
  computed: {
    isCollapse: function() {
      return this.$store.state.app.isCollapse;
    }
  },
  mounted() {
    this.navMenuData = this.$router.options.routes;
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  margin: 10px;
  img {
    width: 80px;
    @include webkit(transition, all 0.2s ease 0s);
  }
}
#nav-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100%;
  background: #344a5f;
  .navMenu {
    width: 100%;
    @include webkit(transition, all 0.2s ease 0s);
    svg {
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
    .logo img {
      width: 60%;
    }
  }
}
</style>
