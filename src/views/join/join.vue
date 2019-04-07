<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>请填写所要报名的信息</span>
    </div>
    <div class="order">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="学号：" prop="number">
          {{form.number}}
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          {{form.name}}
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          {{form.sex}}
        </el-form-item>
        <el-form-item label="学院：" prop="school">
          {{form.school}}
        </el-form-item>
        <el-form-item label="专业：" prop="profession">
          {{form.profession}}
        </el-form-item>
        <el-form-item label="年级：" prop="grade">
          {{form.grade}}
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          {{form.phone}}
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          {{form.email}}
        </el-form-item>
        <el-form-item label="参赛项目：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        options: [
          {
          value: '1',
          label: '男子短跑'
        }, {
          value: '2',
          label: '男子长跑'
        }, {
          value: '3',
          label: '女子短跑'
        }, {
          value: '4',
          label: '女子长跑'
        }, {
          value: '5',
          label: '男子跳高'
        }],
        value: '',
        form:{
          number: this.$route.query.row.number,
          name: this.$route.query.row.name,
          sex:this.$route.query.row.sex,
          school:this.$route.query.row.school,
          profession:this.$route.query.row.profession,
          grade:this.$route.query.row.grade,
          phone:this.$route.query.row.phone,
          email:this.$route.query.row.email,
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
        // 跳转
        joinaction:function(){
          this.$router.push('/join/studentList')
        },
          }
    }
</script>

<style scoped>

</style>
