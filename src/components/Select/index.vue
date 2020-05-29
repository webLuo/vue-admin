<template>
  <div>
    <el-select
      v-model="selectValue"
      placeholder="请选择"
      style="width:100%;"
      clearable
      @change="selectChange"
    >
      <el-option
        v-for="item in initOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "SelectCmpt",
  components: {},
  props: {
    config: {
      type: Array,
      default: () => []
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectValue: "",
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" }
      ],
      initOption: []
    };
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        this.initOptions();
      },
      immediate: true
    }
  },
  mounted() {
    // 已经渲染一次，会再次渲染第二次select下拉组件
    // this.initOptions();
  },
  methods: {
    initOptions() {
      let optionArr = [];
      // 数据检验
      if (this.config.length === 0) {
        console.log("config的参数是空的，无法显示下拉菜单；");
        return false;
      }
      this.config.forEach(item => {
        let arr = this.options.filter(elem => elem.value == item)[0]; // filter匹配成功后是一个数组，需要取下标第一个
        optionArr.push(arr);
      });
      // 数据检验
      if (optionArr.length === 0) {
        console.log("匹配的数据为空！");
        return false;
      }
      // 初始化赋值
      this.initOption = optionArr;
      // 初始化搜索类型
      this.selectValue = optionArr[0].value;
    },
    // 选择后触发
    selectChange(val) {
      console.log(val);
      let selData = this.options.filter(item => item.value == val)[0];
      this.$emit("update:selectData", selData);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
