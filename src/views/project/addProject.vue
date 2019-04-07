<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>裁判信息查询</span>
    </div>
  <div class="addProject">
    <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
      <el-form-item label="项目名称：" prop="projectname">
        <el-input type="text" v-model="form.projectname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="成绩单位：" prop="unit">
        <el-input type="text" v-model="form.unit" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="性别要求：" prop="sex">
        <el-input type="text" v-model="form.sex" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create('form')" plain style="margin-left: 6vw;">创建</el-button>
        <el-button type="primary" v-on:click="reset('form')" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "addProject",
    data() {
      return {
        form: {
          projectname: '',
          unit: '',
          sex:'',
        }
      }
    },
    methods:{
      create(){
        if(this.form.projectname === '' || this.form.unit === '' || this.form.sex === ''){
          this.$message({
            message: '请填写完整',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '创建完成',
            type: 'success'
          });
        }
      },
      //重置
      reset(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
