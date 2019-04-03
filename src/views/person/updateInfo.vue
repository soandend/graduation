<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>编辑个人资料</span>
    </div>
  <div class="updateInfo">
    <el-form :model="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="用户名：" prop="usernumber">
        <el-input type="text" v-model="form.usernumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="姓名：" prop="username">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.username" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电话：" prop="phonenumber">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.phonenumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="邮箱：" prop="emile">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.emile" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create" plain style="margin-left: 5vw;">修改</el-button>
        <el-button type="primary" v-on:click="reset" plain style="margin-left: 5vw;">重置</el-button>
      </div>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "updateInfo",
    data() {
      return {
        form:{
          usernumber:'',
          username :'',
          phonenumber:'',
          emile:''
        }
      }
    },
  }
</script>

<style scoped>

</style>
