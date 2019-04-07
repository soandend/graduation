<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>广播信息播报详情</span>
    </div>
    <div class="order">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="信息播报标题：" prop="name">
          {{form.name}}
        </el-form-item>
        <el-form-item label="播报时间：" prop="date">
          {{form.date}}
        </el-form-item>
        <el-form-item label="播报内容：" prop="content">
          {{form.content}}
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "detail",
      data(){
          return{
            form: {
              name: this.$route.query.row.title,
              date:this.$route.query.row.date,
              content:this.$route.query.row.string,
            },
        }
      }
    }
</script>

<style scoped>

</style>
