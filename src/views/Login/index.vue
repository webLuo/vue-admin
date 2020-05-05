<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :class="{'current':item.current}"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.value }}</li>
      </ul>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-form"
        >
          <el-form-item prop="userName" class="item-form">
            <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.userName" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input
              type="text"
              clearable
              v-model="ruleForm.password"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" class="item-form" v-show="model === 'register'">
            <label>重复密码</label>
            <el-input
              type="text"
              clearable
              v-model="ruleForm.rePassword"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="item-form">
            <label>验证码</label>
            <el-row :gutter="20">
              <el-col :span="15">
                <el-input v-model="ruleForm.code" clearable></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="form-btn" minlength="6" maxlength="6">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="item-form">
            <el-button type="danger" @click="submitForm('ruleForm')" class="form-btn margin-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCode
} from "@/utils/validate.js";
import vali from "@/utils/http.js";
export default {
  name: "Login",
  prop: {},
  watch: {},
  components: {},
  data() {
    // 校验用户名为邮箱
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateEmail(value)) {
        callback(new Error("用户名输入有误"));
      } else {
        callback();
      }
    };
    // 校验密码
    var checkPassword = (rule, value, callback) => {
      // 密码过滤
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePassword(value)) {
        callback(new Error("密码为6至20位的数字加字母"));
      } else {
        callback();
      }
    };
    // 校验重复密码
    var checkRePassword = (rule, value, callback) => {
      // 如果模块的值为login，直接通过，要不然无法提交，或者直接使用v-if，不用v-show，但是v-show的性能更加优越一点
      if (this.model === "login") {
        callback();
      }
      // 密码过滤
      this.ruleForm.rePassword = stripscript(value);
      value = this.ruleForm.rePassword;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码有误"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      // 验证码过滤
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!validateCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { value: "登录", current: true, type: "login" },
        { value: "注册", current: false, type: "register" }
      ],
      ruleForm: {
        userName: "",
        password: "",
        rePassword: "",
        code: ""
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        rePassword: [{ validator: checkRePassword, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      },
      model: ""
    };
  },
  created() {},
  mounted() {
    vali.validateEmail();
    vali.validatePass();
    vali.validateCode();
  },
  methods: {
    toggleMenu(data) {
      this.model = data.type;
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
#login {
  height: 100%;
  background: #344a5f;
}
.login-wrap {
  width: 450px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 80px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 39px;
  .item-form {
    margin-bottom: 13px;
  }
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .form-btn {
    display: block;
    width: 100%;
  }
  .margin-btn {
    margin-top: 19px;
  }
}
</style>
