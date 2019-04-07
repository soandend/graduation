<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>请填写所要租借器材的信息</span>
    </div>
    <div class="order">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="器材名称：" prop="username">
          {{form.username}}
        </el-form-item>
        <el-form-item label="存放地点：" prop="address">
          {{form.address}}
        </el-form-item>
        <el-form-item label="器材数量：" prop="number">
          {{form.number}}
        </el-form-item>
        <el-form-item label="在库数量：" prop="integer">
          {{form.integer}}
        </el-form-item>
        <el-form-item label="租借数量：">
          <el-input type="text" v-model="form.rentnumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
          <el-form-item label="租借姓名：">
        <el-input type="text" v-model="form.name" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="租借电话：">
        <el-input type="text" v-model="form.phone" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
        <el-button type="primary" v-on:click="create('form')" plain style="margin-left: 6vw;">创建</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "join",
    data()
    {
      return {
        form:{
          number: this.$route.query.row.number,
          username: this.$route.query.row.username,
          address:this.$route.query.row.address,
          integer:this.$route.query.row.integer,
          rentnumber:'',
          phone:'',
          name:''
        }
      }
    },
    methods:{
      create(){
        this.$confirm("确定租借?", "提示", {
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
      }
    }
  }
</script>

<style scoped>

</style>
