<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>器材录入</span>
    </div>
  <div class="addKit">
    <el-form :model="form" ref="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="器材名称：" prop="kitname">
        <el-input type="text" v-model="form.kitname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="存放地点：" prop="address">
        <el-input type="text" v-model="form.address" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="存放数量：" prop="kitnumber">
        <el-input type="text" v-model="form.sex" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create('form')" plain style="margin-left: 6vw;">录入</el-button>
        <el-button type="primary" v-on:click="reset('form')" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    name: "addKit",
    data() {
      return {
        form: {
          kitname: '',
          address: '',
          kitnumber: ''
        }
      }
    },
    methods:{
      create(){
        this.$confirm("确定参加比赛?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // rows.splice(index, 1);
            this.$message({
              type: "success",
              message: "参加成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      reset(formname){
          this.$refs[formname].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
