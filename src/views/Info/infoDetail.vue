<template>
  <div id="infoDetail-wrap">
    <el-form :model="formDetail" ref="formDetail" label-width="120px">
      <el-form-item label="信息分类：">
        <el-select v-model="formDetail.categoryId" placeholder="请选择" style="width:100%;" clearable>
          <el-option
            v-for="item in categoryData"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题：">
        <el-input v-model="formDetail.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <uploadImg :imgUrl.sync="formDetail.imgUrl" :config="uploadImgConfig" />
      </el-form-item>
      <el-form-item label="发布日期：">
        <el-date-picker v-model="formDetail.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容：">
        <quillEditor
          v-model="formDetail.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onSubmit('formDetail')" :loading="submit_loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { GetInfoList, EditInfo } from "@/api/info";
import { GetQiniuToken } from "@/api/common";

import uploadImg from "components/uploadImg";
// 富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "",
  components: { quillEditor, uploadImg },
  data() {
    return {
      formDetail: {
        categoryId: "",
        title: "",
        thumb: "",
        imgUrl: "",
        createDate: ""
      },
      categoryData: [],
      editorOption: {},
      submit_loading: false,
      uploadImgConfig: {
        uploadUrl: "http://up-z1.qiniup.com",
        accesskey: "AaIaJZFoBllPtyKleOqqkI1kGoXPv0gn7jaEK_B3",
        secretkey: "QPrWw4jO3Pad9PWHToqq_4Ij9PzR42D8kLwb5p-T",
        buckety: "vue-admin-luo"
      }
    };
  },
  created() {},
  mounted() {
    let id = this.$route.params.id;
    let title = this.$route.params.title;
    // 获取分类数据
    this.$store
      .dispatch("common/getCategoryData")
      .then(res => {
        this.categoryData = res.data.data.data;
      })
      .catch(err => {});
    this.getList();
  },
  methods: {
    // 获取当前跳转的信息
    getList() {
      let params = {
        pageNumber: 1,
        pageSize: 1,
        id: this.$store.getters["info/id"]
      };
      GetInfoList(params)
        .then(res => {
          let data = res.data.data.data[0];
          this.formDetail = {
            categoryId: data.categoryId,
            createDate: data.createDate * 1000,
            title: data.title,
            content: data.content,
            imgUrl: data.imgUrl
          };
        })
        .catch(err => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        this.submit_loading = true;
        if (valid) {
          let params = {
            id: this.$store.getters["info/id"],
            categoryId: this.formDetail.categoryId,
            createDate: this.formDetail.createDate,
            title: this.formDetail.title,
            content: this.formDetail.content,
            imgUrl: this.formDetail.imgUrl
          };
          EditInfo(params)
            .then(res => {
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.submit_loading = false;
            })
            .catch(err => {
              this.submit_loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 失去焦点事件
    onEditorBlur() {},
    // 获得焦点事件
    onEditorFocus() {},
    // 内容改变事件
    onEditorChange() {}
  }
};
</script>
<style lang="scss" scoped>
</style>
