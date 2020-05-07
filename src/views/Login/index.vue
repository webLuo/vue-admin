<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :class="{ current: item.current }"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.value }}</li>
      </ul>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="login-form"
        >
          <el-form-item prop="userName" class="item-form">
            <label for="userName">邮箱</label>
            <el-input type="text" v-model="ruleForm.userName" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item-form">
            <label for="password">密码</label>
            <el-input
              type="text"
              clearable
              v-model="ruleForm.password"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" class="item-form" v-show="model === 'register'">
            <label for="rePassword">重复密码</label>
            <el-input
              type="text"
              clearable
              v-model="ruleForm.rePassword"
              minlength="6"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="item-form">
            <label for="code">验证码</label>
            <el-row :gutter="20">
              <el-col :span="15">
                <el-input v-model="ruleForm.code" clearable></el-input>
              </el-col>
              <el-col :span="9">
                <el-button
                  type="success"
                  class="form-btn"
                  minlength="6"
                  maxlength="6"
                  @click="getsms()"
                  :disabled="codeBtn.status"
                >{{codeBtn.text}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="item-form">
            <el-button
              type="danger"
              @click="submitForm('loginForm')"
              class="form-btn margin-btn"
              :disabled="loginBtnStatus"
            >{{ model === 'login' ? '登录' : '注册'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateCode
} from "@/utils/validate.js";
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
      model: "login",
      loginBtnStatus: true,
      // 验证码按钮状态
      codeBtn: {
        status: false,
        text: "获取验证码"
      },
      timer: null
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     *  一个方法里面不建议做多个不同的事件，尽可能只做自己的事情
     * 尽量把相同的事情封装在一个方法里面，通郭调用函数进行执行
     */
    // 登录注册切换
    toggleMenu(data) {
      this.model = data.type;
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      this.resetDormData();
      this.clearCountDown();
    },
    // 清除表单数据
    resetDormData() {
      // this.$refs["loginForm"].resetFields();
      this.$refs.loginForm.resetFields();
    },
    // 更新按钮的状态
    updateBtnSataus(params) {
      this.codeBtn.status = params.status;
      this.codeBtn.text = params.text;
    },
    // 获取验证码倒计时
    countDown(time) {
      // 判断定时器是否存在，存在则清除
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        time--;
        this.codeBtn.text = `倒计时${time}秒`;
        if (time === 0) {
          clearInterval(this.timer);
          this.updateBtnSataus({
            status: false,
            text: "重新发送"
          });
        }
      }, 1000);
    },
    // 清除倒计时
    clearCountDown() {
      // 还原验证码按钮默认状态
      this.updateBtnSataus({
        status: false,
        text: "获取验证码"
      });
      clearInterval(this.timer);
    },
    // 获取验证码
    getsms() {
      if (this.ruleForm.userName == "") {
        this.$message.error("邮箱不能为空");
        return false;
      }
      if (!validateEmail(this.ruleForm.userName)) {
        this.$message.error("邮箱格式有误,請重新輸入");
        return false;
      }
      // 修改获取验证码状态
      this.updateBtnSataus({
        status: true,
        text: "发送中"
      });
      // 请求接口
      let param = {
        username: this.ruleForm.userName,
        module: this.model
      };
      GetSms(param)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          // 启用登录注册按钮
          this.loginBtnStatus = false;
          this.countDown(10);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          // if (this.model == "login") {
          //   this.loginSys();
          // } else {
          //   this.registerSys();
          // }
          this.model == "login" ? this.loginSys() : this.registerSys();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    loginSys() {
      let param = {
        username: this.ruleForm.userName,
        // password: sha1(this.ruleForm.password),
        password: this.ruleForm.password,
        code: this.ruleForm.code
      };
      Login(param)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 注册
    registerSys() {
      let param = {
        username: this.ruleForm.userName,
        module: this.model,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      Register(param)
        .then(response => {
          this.$message({
            type: "success",
            message: response.data.message
          });
          this.toggleMenu(this.menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {
          console.log(error);
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
