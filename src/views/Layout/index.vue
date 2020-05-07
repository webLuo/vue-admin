<template>
  <div id="layout-wrap">
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
