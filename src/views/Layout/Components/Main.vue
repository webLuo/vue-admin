<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
#main-wrap {
  position: fixed;
  top: 50px;
  left: 200px;
  right: 0;
  bottom: 0;
  background: #fff;
  margin: 10px 10px 0 10px;
}
</style>
