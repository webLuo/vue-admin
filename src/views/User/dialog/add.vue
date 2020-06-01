<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisiable"
      @close="closeDialog"
      width="550px"
      @opened="addUserOpened"
    >
      <el-form :model="form" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名：" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="truename" :label-width="formLabelWidth">
          <el-input v-model="form.truename" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="form.phone" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地区：" prop="region" :label-width="formLabelWidth">
          <CityPicker
            :regionPickerLevel="['province', 'city', 'area', 'street']"
            :cityPickerData.sync="cityPickerData"
          />
          {{cityPickerData}}
        </el-form-item>
        <el-form-item label="是否启用：" prop="status" :label-width="formLabelWidth">
          <el-radio v-model="form.status" label="1">禁用</el-radio>
          <el-radio v-model="form.status" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="系统：" prop="role" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.role">
            <el-checkbox v-for="item in roleData" :key="item.role" :label="item.name"></el-checkbox>
          </el-checkbox-group>
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
import sha1 from "js-sha1";
import {
  validateUserName,
  validateTrueName,
  validateUserPassword
} from "@/utils/validate";
import CityPicker from "components/CityPicker";
import { GetRole, AddUser, EditUser, GetSystem } from "@/api/user";
export default {
  name: "addUser",
  components: { CityPicker },
  // 单向数据流，父级->子级，不能反向修改，可以通过监听解决该问题
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editRowData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    flag: {
      handler(newVal, oldVal) {
        this.dialogVisiable = newVal;
      }
    }
  },
  data() {
    return {
      cityPickerData: {},
      dialogVisiable: false,
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "2",
        role: []
      },
      formLabelWidth: "100px",
      submit_loading: false,
      roleData: [],
      rules: {
        username: [
          { validator: validateUserName, trigger: "blur" },
          { required: true, message: "类型不能为空", trigger: "blur" }
        ],
        truename: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { validator: validateTrueName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validateUserPassword, trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        role: [{ required: true, message: "请选择用户角色", trigger: "change" }]
      }
    };
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    // 弹窗打开
    addUserOpened() {
      // 请求角色信息  请求系统信息
      GetSystem()
        .then(res => {
          this.roleData = res.data.data;
        })
        .catch();
      // 初始值处理
      let editRowData = this.editRowData;
      if (editRowData.id) {
        // 编辑
        editRowData.role = editRowData.role.split(",");
        for (let key in editRowData) {
          this.form[key] = editRowData[key];
          this.rules.password = [
            { validator: validateUserPassword, trigger: "blur" }
          ];
        }
      } else {
        // 新增
        this.rules.password = [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validateUserPassword, trigger: "blur" }
        ];
        this.form.id && delete this.form.id;
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisiable = false;
      this.resetForm();
      // 父组件属性.sync
      // this.$emit("update:flag", false);
      // 回调时候需要逻辑处理的时候，就不能用修饰器，反之，可以用修饰器
      this.$emit("close", false);
    },
    // 提交表单
    submit() {
      // this.submit_loading = true;
      this.$refs.addUserForm.validate(valid => {
        let params = JSON.parse(JSON.stringify(this.form));
        params.role = params.role.join();
        console.log(params.password);
        params.region = JSON.stringify(this.cityPickerData);
        if (!params.id) {
          params.password = sha1(params.password);
          AddUser(params)
            .then(res => {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.resetForm();
            })
            .catch(err => {
              this.submit_loading = false;
            });
        } else {
          if (params.password) {
            params.password = sha1(params.password);
          } else {
            delete params.password;
          }
          EditUser(params)
            .then(res => {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.resetForm();
            })
            .catch(err => {
              this.submit_loading = false;
            });
        }
      });
    },
    // 清空表单
    resetForm() {
      this.submit_loading = false;
      this.dialogVisiable = false;
      this.$emit("refreshUserTable");
      this.cityPickerData = null;
      this.$refs.addUserForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
