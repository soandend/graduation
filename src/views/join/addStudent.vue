<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>裁判信息查询</span>
    </div>
  <div class="addStudent">
    <el-form :model="form" ref="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="学号：" prop="usernumber">
        <el-input type="text" v-model="form.usernumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="姓名：" prop="username">
        <el-input type="text" v-model="form.username" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="form.sex" label="female">女</el-radio>
        <el-radio v-model="form.sex" label="male">男</el-radio>
      </el-form-item>
      <el-form-item label="学院：" prop="college">
        <el-input type="text" v-model="form.college" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="专业：" prop="profession">
        <el-input type="text" v-model="form.profession" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="年级：" prop="grade">
        <el-input type="text" v-model="form.grade" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电话：" prop="phonenumber">
        <el-input type="text" v-model="form.phonenumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="邮箱：" prop="emile">
        <el-input type="text" v-model="form.emile" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create" plain style="margin-left: 6vw;">创建</el-button>
        <el-button type="primary" @click="rest('form')" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "addStudent",
    data() {
      return {
        form:{
          usernumber:'',
          username :'',
          sex:'female',
          college:'',
          profession:'',
          grade:'',
          phonenumber:'',
          emile:''
        }
      }
    },
    methods:{
      create(){
        this.$confirm("此操作将新建一个管理员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // rows.splice(index, 1);
            this.$message({
              type: "success",
              message: "创建成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消创建"
            });
          });
      },
      //重置
      rest(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
