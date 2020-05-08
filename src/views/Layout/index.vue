<template>
  <div id="layout-wrap" :class="[menuStatus ? 'close' : 'open']">
    <layoutHeader />
    <layoutMain />
    <layoutNav />
  </div>
</template>

<script>
import layoutHeader from "./Components/Header";
import layoutMain from "./Components/Main";
import layoutNav from "./Components/Nav";
export default {
  name: "Layout",
  components: {
    layoutHeader,
    layoutMain,
    layoutNav
  },
  computed: {
    menuStatus: function() {
      return this.$store.state.isCollapse;
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
#layout-wrap {
  height: 100%;
  background: #f7f7f7;
}
</style>
