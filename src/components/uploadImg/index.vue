<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="config.uploadUrl"
      :data="uploadKey"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imgInfo" :src="imgInfo" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { GetQiniuToken } from "@/api/common";
export default {
  /**
   * 1.组件的过程做什么(七牛云token,显示默认图片,选择图片后渲染自身图片)
   * 2.最终结果做什么(返回选择后的图片路径)
   */
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  // 监听
  watch: {
    imgUrl: {
      handler(val, oldVal) {
        this.imgInfo = val;
      },
      deep: true
    }
  },
  components: {},
  data() {
    return {
      imgInfo: "",
      uploadKey: {
        token: ""
      }
    };
  },
  created() {},
  mounted() {
    this.getQiNiuToken();
  },
  methods: {
    // 获取七牛云token
    getQiNiuToken() {
      GetQiniuToken({
        accesskey: this.config.accesskey,
        secretkey: this.config.secretkey,
        buckety: this.config.buckety
      })
        .then(res => {
          this.uploadKey.token = res.data.data.token;
        })
        .catch(res => {});
    },
    handleAvatarSuccess(res, file) {
      this.imgInfo = `http://qa9j1vz8d.bkt.clouddn.com/${res.key}`;
      this.$emit("update:imgUrl", this.imgInfo);
    },
    beforeAvatarUpload(file) {
      const isJPG = ["image/jpeg", "image/png"];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG.includes(file.type)) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
