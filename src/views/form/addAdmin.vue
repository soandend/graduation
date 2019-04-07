<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>裁判信息查询</span>
    </div>
  <div class="addAdmin">
    <el-form :model="form" ref="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="用户名：" prop="username">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.username" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        &ensp;&ensp;&ensp;&nbsp;<el-input type="text" v-model="form.password" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="重复密码：" prop="repassword">
      <el-input type="text" v-model="form.repassword" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
    </el-form-item>
      <el-form-item label="真实姓名：" prop="realname">
        <el-input type="text" v-model="form.realname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电话号码：" prop="phonenumber">
        <el-input type="text" v-model="form.phonenumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="emile">
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
        name: "addAdmin",
      data() {
        return {
          form:{
            username:'',
            password:'',
            repassword:'',
            realname:'',
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
