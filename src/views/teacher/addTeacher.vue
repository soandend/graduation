<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>添加裁判</span>
    </div>
  <div class="addTeacher">
    <el-form :model="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="裁判姓名：" prop="teachername">
        <el-input type="text" v-model="form.teachername" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        &ensp;&ensp;&ensp;&nbsp;&nbsp;<el-input type="text" v-model="form.sex" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电话号码：" prop="phonenumber">
        <el-input type="text" v-model="form.phonenumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="emile">
        <el-input type="text" v-model="form.emile" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
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
    name: "addTeacher",
    data() {
      return {
        form:{
          teachername:'',
          sex:'',
          phonenumber:'',
          emile:''
        }
      }
    },
  }
</script>

<style scoped>

</style>
