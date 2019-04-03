<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
  <div class="updatePwd">
    <el-form :model="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="旧密码：" prop="oldpwd">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.oldpwd" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpwd">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.newpwd" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm">
        <el-input type="text" v-model="form.confirm" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create" plain style="margin-left: 6vw;">确认修改</el-button>
        <el-button type="primary" v-on:click="reset" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "updatePwd",
    data() {
      return {
        form:{
          oldpwd :'',
          newpwd:'',
          confirm:''
        }
      }
    },
  }
</script>

<style scoped>

</style>
