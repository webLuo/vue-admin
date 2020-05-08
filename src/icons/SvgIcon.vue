<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  components: {},
  props: {
    iconClass: {
      type: String,
      default: ""
    },
    styleName: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName: function() {
      return `#icon-${this.iconClass}`;
    },
    svgClass: function() {
      if (this.styleName) {
        return `svg-icon ${this.styleName}`;
      } else {
        return `svg-icon`;
      }
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
.svg-icon {
  width: 1em; /* 允许通过fontsize设置svg大小 */
  height: 1em; /* 允许通过fontsize设置svg大小 */
  fill: currentColor; /* 允许设置icon颜色 */
  overflow: hidden;
}
</style>
