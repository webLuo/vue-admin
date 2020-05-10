<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialogVisiable" @close="closeDialog" width="550px">
      <el-form :model="form">
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in type_datas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="danger" @click="dialogVisiable = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogInfo",
  components: {},
  // 单向数据流，父级->子级，不能反向修改，可以通过监听解决该问题
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        this.dialogVisiable = newVal;
        console.log(newVal);
      }
    }
  },
  data() {
    return {
      dialogVisiable: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px",
      type_datas: [
        {
          value: 1,
          label: "国际信息"
        },
        {
          value: 2,
          label: "国内信息"
        },
        {
          value: 3,
          label: "行业信息"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    closeDialog() {
      this.dialogVisiable = false;
      // 父组件属性.sync
      // this.$emit("update:flag", false);
      // 回调时候需要逻辑处理的时候，就不能用修饰器，反之，可以用修饰器
      this.$emit("close", false);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
