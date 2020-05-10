<template>
  <div id="category">
    <el-button type="danger" @click="addfirst">添加一级分类</el-button>
    <hr class="hr-style" />
    <div>
      <el-row>
        <el-col :span="10">
          <div class="category" v-for="firstItem in categoryData" :key="firstItem.id">
            <h4>
              <svg-icon iconClass="plus" styleName="plus" />
              {{firstItem.category_name}}
              <div class="btn-group">
                <el-button size="mini" round type="danger" @click="categoryEdit(firstItem)">编辑</el-button>
                <el-button size="mini" round type="success">添加子级</el-button>
                <el-button size="mini" round @click="categoryDelete(firstItem)">删除</el-button>
              </div>
            </h4>
            <ul v-if="firstItem.children">
              <li v-for="secondItem in firstItem.children" :key="secondItem.id">
                {{secondItem.category_name}}
                <div class="btn-group">
                  <el-button size="mini" round type="danger">编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="14">
          <h4 class="menu-title">{{rank}}分类编辑</h4>
          <div v-if="!showForm">
            <h4 class="content-title">请选择分类</h4>
          </div>
          <div v-else>
            <el-form label-width="120px" :model="formData" ref="categoryForm" class="form-width">
              <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first">
                <el-input v-model="formData.categoryName"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_second">
                <el-input v-model="formData.secCategoryName"></el-input>
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
  EditCategory,
  DeleteCategory
} from "@/api/info";
export default {
  name: "InfoCategory",
  components: {},
  data() {
    return {
      categoryData: [
        {
          id: "1",
          category_name: "国际信息",
          children: [
            {
              id: "2",
              category_name: "学习会员"
            },
            {
              id: "3",
              category_name: "学习成员"
            }
          ]
        },
        {
          id: "4",
          category_name: "国内信息",
          children: [
            {
              id: "5",
              category_name: "学习成员"
            }
          ]
        }
      ],
      formData: {
        categoryName: "",
        secCategoryName: ""
      },
      category_first: true,
      category_second: false,
      submit_loading: false,
      showForm: false,
      rank: ""
    };
  },
  created() {},
  mounted() {
    this.getCategoryData();
  },
  methods: {
    getCategoryData() {
      GetCategory({})
        .then(res => {
          this.categoryData = res.data.data.data;
        })
        .catch(err => {});
    },
    addfirst() {
      this.category_first = true;
      this.category_second = false;
      this.showForm = true;
    },
    submitForm(formName) {
      if (!this.formData.categoryName) {
        this.$message.error("分类名称不能为空");
      } else {
        let param = {
          categoryName: this.formData.categoryName
        };
        this.submit_loading = true;
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
      }
    },
    // 编辑父节点
    categoryEdit(data) {
      this.rank = data.category_name;
      this.formData.categoryName = data.category_name;
      let param = {
        id: data.id,
        categoryName: ""
      };
    },
    // 确定删除
    confirmDel(data) {
      DeleteCategory({ categoryId: data.id })
        .then(res => {
          /**
           * es6 查找数组某一项索引位置
           */
          // 可以节省网络资源，但是可能存在多人操作时，最优先还是通过请求的方式
          let index = this.categoryData.findIndex(item => item.id == data.id);
          this.categoryData.splice(index, 1);
          // this.getCategoryData();
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
  background: #cb63d4;
  line-height: 50px;
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
