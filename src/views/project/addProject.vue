<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>裁判信息查询</span>
    </div>
  <div class="addProject">
    <el-form :model="form" class="queryResult-box" style="margin-bottom: 20px;">
      <el-form-item label="项目名称：" prop="projectname">
        <el-input type="text" v-model="form.projectname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="性别要求：" prop="sex">
        <el-input type="text" v-model="form.sex" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="比赛地点：" prop="address">
        <el-input type="text" v-model="form.address" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="比赛日期：" prop="time">
        <el-input type="text" v-model="form.time" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create" plain style="margin-left: 6vw;">创建</el-button>
        <el-button type="primary" v-on:click="reset" plain style="margin-left: 6vw;">重置</el-button>
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
          sex: '',
          address:'',
          time:'',
        }
      }
    },
  }
</script>

<style scoped>

</style>
