<template>
  <div id="category">
    <el-button type="danger" @click="addParent">添加一级分类</el-button>
    <hr class="hr-style" />
    <div>
      <el-row>
        <el-col :span="10">
          <div class="category" v-for="parentItem in categoryData" :key="parentItem.id">
            <h4>
              <svg-icon iconClass="plus" styleName="plus" />
              {{parentItem.category_name}}
              <div class="btn-group">
                <el-button size="mini" round type="danger" @click="categoryEdit(parentItem)">编辑</el-button>
                <el-button size="mini" round type="success" @click="addChildren(parentItem)">添加子级</el-button>
                <el-button size="mini" round @click="categoryDelete(parentItem)">删除</el-button>
              </div>
            </h4>
            <ul v-if="parentItem.children">
              <li v-for="childrenItem in parentItem.children" :key="childrenItem.id">
                {{childrenItem.category_name}}
                <div class="btn-group">
                  <el-button
                    size="mini"
                    round
                    type="danger"
                    @click="categoryChildrenEdit(parentItem, childrenItem)"
                  >编辑</el-button>
                  <el-button size="mini" round @click="categoryDelete(childrenItem)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="14">
          <h4
            class="menu-title"
          >{{rank}}{{ infoModel == "addInfo" ? "新增分类" : infoModel == "editInfo" ? "分类编辑": infoModel == "addChildInfo" ? "新增子级分类" : infoModel == "editChildInfo" ? "编辑子级分类" : "请选择新增或者编辑"}}</h4>
          <div v-if="!showForm">
            <h4 class="content-title">请选择分类</h4>
          </div>
          <div v-else>
            <el-form label-width="120px" :model="formData" ref="categoryForm" class="form-width">
              <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_parent">
                <el-input v-model="formData.categoryName" :disabled="parent_disabled"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_children">
                <el-input v-model="formData.secCategoryName" :disabled="children_disabled"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  @click="submitForm('ruleForm')"
                  :loading="submit_loading"
                >确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  AddfirstCategoty,
  GetCategory,
  GetCategoryAll,
  EditCategory,
  DeleteCategory,
  AddChildrenCategory
} from "@/api/info";
import { getInfoCategoryAll } from "@/api/common";
export default {
  name: "InfoCategory",
  components: {},
  data() {
    return {
      categoryData: [],
      formData: {
        categoryName: "",
        secCategoryName: ""
      },
      category_parent: true,
      category_children: false,
      submit_loading: false,
      showForm: false,
      rank: "",
      infoModel: "",
      parentData: null,
      parent_disabled: true,
      children_disabled: true
    };
  },
  created() {},
  mounted() {
    // 在actions触发后期更好维护
    // this.getCategoryData();
    // 只加载了父级
    // this.$store
    //   .dispatch("common/getCategoryData")
    //   .then(res => {
    //     this.categoryData = res.data.data.data;
    //   })
    //   .catch(err => {});
    this.getAllCategoryInfo();
  },
  methods: {
    getAllCategoryInfo() {
      // 获取所有分类数据
      getInfoCategoryAll()
        .then(res => {
          this.categoryData = res.data.data;
        })
        .catch(err => {});
    },
    // 获取分类数据
    // getCategoryData() {
    //   GetCategory({})
    //     .then(res => {
    //       this.categoryData = res.data.data.data;
    //     })
    //     .catch(err => {});
    // },
    // 添加父节点
    addParent() {
      // 输入框是否显示
      this.category_parent = true;
      this.category_children = false;
      // 输入框是否禁用
      this.parent_disabled = false;
      this.rank = "";
      this.formData.categoryName = "";
      this.showForm = true;
      this.infoModel = "addInfo";
    },
    // 添加子节点
    addChildren(data) {
      // 输入框是否显示
      this.category_parent = true;
      this.category_children = true;
      // 输入框是否禁用
      this.parent_disabled = true;
      this.children_disabled = false;
      // 显示表单
      this.showForm = true;
      this.rank = data.category_name;
      this.formData.categoryName = data.category_name;
      this.formData.secCategoryName = "";
      this.parentData = data;
      this.infoModel = "addChildInfo";
    },
    // 添加节点表单提交
    submitForm(formName) {
      if (!this.formData.categoryName) {
        this.$message.error("分类名称不能为空");
      } else {
        this.submit_loading = true;
        if (this.infoModel === "addInfo") {
          let param = {
            categoryName: this.formData.categoryName
          };
          this.addCategotyParent(param);
        } else if (
          this.infoModel === "editInfo" ||
          this.infoModel === "editChildInfo"
        ) {
          let param = {};
          if (this.infoModel === "editInfo") {
            param = {
              categoryName: this.formData.categoryName,
              id: this.parentData.id
            };
          } else if (this.infoModel === "editChildInfo") {
            param = {
              categoryName: this.formData.secCategoryName,
              id: this.parentData.id
            };
          }
          this.editCategotyParent(param);
        } else if (this.infoModel === "addChildInfo") {
          let param = {
            categoryName: this.formData.secCategoryName,
            parentId: this.parentData.id
          };
          this.addCategotyChildren(param);
        }
      }
    },
    // 添加父节点接口
    addCategotyParent(param) {
      AddfirstCategoty(param)
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
            // 可以节省网络资源，但是可能存在多人操作时，最优先还是通过请求的方式
            this.categoryData.push(res.data.data);
            // this.getCategoryData();
          }
          this.submit_loading = false;
          this.$refs.categoryForm.resetFields();
        })
        .catch(err => {
          this.submit_loading = false;
          this.$refs.categoryForm.resetFields();
        });
    },
    // 编辑父节点接口
    editCategotyParent(param) {
      EditCategory(param)
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
            // 可以节省网络资源，但是可能存在多人操作时，最优先还是通过请求的方式
            // let index = this.categoryData.findIndex(
            //   item => item.id == param.id
            // );
            // this.categoryData.splice(index, 1, {
            //   category_name: data.data.data.categoryName,
            //   id: param.id
            // });
            // this.getCategoryData();
            this.getAllCategoryInfo();
          }
          this.submit_loading = false;
          if (this.infoModel === "editInfo") {
            this.formData.categoryName = "";
          } else if (this.infoModel === "editChildInfo") {
            this.formData.secCategoryName = "";
          }
          this.rank = data.data.data.categoryName;
        })
        .catch(err => {
          this.submit_loading = false;
        });
    },
    // 编辑父节点
    categoryEdit(data) {
      this.parent_disabled = false;
      this.category_children = false;
      this.showForm = true;
      this.rank = data.category_name;
      this.formData.categoryName = data.category_name;
      this.parentData = data;
      this.infoModel = "editInfo";
    },
    // 编辑子节点
    categoryChildrenEdit(parentData, childData) {
      this.parent_disabled = true;
      this.children_disabled = false;
      this.category_parent = true;
      this.category_children = true;
      this.showForm = true;
      this.rank = childData.category_name;
      this.formData.categoryName = parentData.category_name;
      this.formData.secCategoryName = childData.category_name;
      this.parentData = childData;
      this.infoModel = "editChildInfo";
    },
    // 删除分类父节点
    categoryDelete(data) {
      this.messageBoxFun({
        tip: "提示",
        content: "确认删除当前信息,确认后无法恢复！",
        tipType: "warning",
        confirmFun: this.confirmDel,
        cancelFun: this.cancelDel,
        handleData: data
      });
    },
    // 添加子节点接口
    addCategotyChildren(param) {
      AddChildrenCategory(param)
        .then(res => {
          let data = res.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
            // this.getCategoryData();
            this.getAllCategoryInfo();
          }
          this.submit_loading = false;
          this.formData.secCategoryName = "";
        })
        .catch(err => {
          this.submit_loading = false;
          this.$refs.categoryForm.resetFields();
        });
    },
    // 确定删除
    confirmDel(data) {
      DeleteCategory({ categoryId: data.id })
        .then(res => {
          // es6 查找数组某一项索引位置
          // 可以节省网络资源，但是可能存在多人操作时，最优先还是通过请求的方式，添加子级后不可用
          // let index = this.categoryData.findIndex(item => item.id == data.id);
          // this.categoryData.splice(index, 1);
          // this.getCategoryData();
          this.getAllCategoryInfo();
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {});
    },
    // 取消删除
    cancelDel(data) {
      this.$message({
        message: "取消删除",
        type: "info"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.hr-style {
  margin: 30px -15px;
  background-color: #e9e9e9;
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
  margin-bottom: 22px;
}
.content-title {
  text-align: center;
  background: #f56c6c;
  line-height: 100px;
  color: #fff;
  font-size: 20px;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:first-child {
    &:before {
      top: 20px;
    }
  }
  &:last-child {
    &:before {
      bottom: 20px;
    }
  }
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
    font-size: 15px;
  }
  h4 {
    padding-left: 40px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  h4,
  li {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
      .btn-group {
        display: block;
      }
    }
  }
}
.btn-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
}
.form-width {
  width: 410px;
}
</style>
