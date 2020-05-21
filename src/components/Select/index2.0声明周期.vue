<template>
  <div>
    <el-select v-model="selectValue" placeholder="请选择" style="width:100%;" clearable>
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
      initOption: [],
      message: "Vue生命周期"
    };
  },
  beforeCreate() {
    console.group("------beforeCreate创建前状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "message: " + this.message); //undefined
    console.log(1);
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        console.group("------watch监听状态------");
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //[object,object]
        console.log("%c%s", "color:red", "message: " + this.message); //undefined
        console.log(5);
        // this.initOptions();
      },
      immediate: true
    }
  },
  created() {
    console.group("------created创建完毕状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //Vue生命周期
    console.log(2);
  },
  beforeMount() {
    console.group("------beforeMount挂载前状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    console.log(3);
  },
  mounted() {
    console.group("------mounted 挂载结束状态------");
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    console.log(4);
    // 已经渲染一次，会再次渲染第二次select下拉组件
    // this.initOptions();
  },
  beforeUpdate: function() {
    console.group("beforeUpdate 更新前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  updated: function() {
    console.group("updated 更新完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  beforeDestroy: function() {
    console.group("beforeDestroy 销毁前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  destroyed: function() {
    console.group("destroyed 销毁完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  methods: {
    initOptions() {
      let optionArr = [];
      this.config.forEach(item => {
        let arr = this.options.filter(elem => elem.value == item)[0]; // filter匹配成功后是一个数组，需要取下标第一个
        optionArr.push(arr);
      });
      // 初始化赋值
      this.initOption = optionArr;
      // 初始化搜索类型
      this.selectValue = optionArr[0].value;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
