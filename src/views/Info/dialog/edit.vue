<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisiable"
      @close="closeDialog"
      width="550px"
      @opened="openedDialog"
    >
      <el-form :model="form" :rules="rules" ref="EditInfoForm">
        <el-form-item label="类型：" prop="category" :label-width="formLabelWidth" ref="EditInfoForm">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况：" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="danger" @click="submit" :loading="submit_loading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { EditInfo, GetInfoList } from "@/api/info";
import { validateTitle, validateContent } from "@/utils/validate";
export default {
  name: "dialogInfo",
  components: {},
  // 单向数据流，父级->子级，不能反向修改，可以通过监听解决该问题
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    categoryData: {
      type: Array,
      default: () => []
    },
    editInfo: {
      type: Object
    }
  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        this.dialogVisiable = newVal;
      }
    },
    editInfo: {
      handler(newVal, oldVal) {
        this.editInfoRow = newVal;
      }
    }
  },
  data() {
    return {
      dialogVisiable: false,
      editInfoRow: null,
      form: {
        category: "",
        title: "",
        content: ""
      },
      formLabelWidth: "70px",
      submit_loading: false,
      rules: {
        category: [
          { required: true, message: "类型不能为空", trigger: "change" }
        ],
        title: [
          { validator: validateTitle, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符间",
            trigger: "blur"
          }
        ],
        content: [
          { validator: validateContent, trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    openedDialog() {
      this.getList();
    },
    getList() {
      let params = {
        pageNumber: 1,
        pageSize: 1,
        id: this.editInfoRow.id
      };
      GetInfoList(params)
        .then(res => {
          let data = res.data.data.data[0];
          this.form = {
            category: data.categoryId,
            title: data.title,
            content: data.content
          };
        })
        .catch(err => {});
    },
    closeDialog() {
      this.dialogVisiable = false;
      // 父组件属性.sync
      // this.$emit("update:flag", false);
      // 回调时候需要逻辑处理的时候，就不能用修饰器，反之，可以用修饰器
      this.$emit("closeEdit", false);
    },
    submit() {
      this.submit_loading = true;
      this.$refs.EditInfoForm.validate(valid => {
        if (valid) {
          let params = {
            id: this.editInfoRow.id,
            categoryId: this.form.category,
            title: this.form.title,
            content: this.form.content
          };
          EditInfo(params)
            .then(res => {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.submit_loading = false;
              this.dialogVisiable = false;
              this.$refs.EditInfoForm.resetFields();
            })
            .catch(err => {
              this.submit_loading = false;
              this.dialogVisiable = false;
              this.$refs.EditInfoForm.resetFields();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
