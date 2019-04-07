<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>成绩录入</span>
    </div>
    <div class="order">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="比赛项目：" prop="gamesname">
          {{form.gamesname}}
        </el-form-item>
        <el-form-item label="比赛地点：" prop="address">
          {{form.address}}
        </el-form-item>
        <el-form-item label="报名人数：" prop="number">
          {{form.number}}
        </el-form-item>
        <el-form-item label="比赛日期：" prop="date">
          {{form.date}}
        </el-form-item>
        <el-form-item label="比赛时间：" prop="time">
          {{form.times}}
        </el-form-item>
      </el-form>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>参赛学生列表</span>
          <el-button type="primary" plain style="margin-left: 3vw" @click="save">保存结果</el-button>
        </div>
        <el-table
          v-loading="listLoading"
          :data="list.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 98%;margin-left: 1vw;margin-bottom: 1vw"
          :default-sort = "{prop: 'date', order: 'ascenting'}">
          <el-table-column align="center" label="名次" prop="order">
            <template slot-scope="scope">
              {{scope.row.order}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="学号" prop="number">
            <template slot-scope="scope">
              {{scope.row.number}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" prop="name">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="性别" prop="sex">
            <template slot-scope="scope">
              {{scope.row.sex}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="学院" prop="school">
            <template slot-scope="scope">
              {{scope.row.school}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="专业" prop="profession">
            <template slot-scope="scope">
              {{scope.row.profession}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="班级" prop="grade">
            <template slot-scope="scope">
              {{scope.row.grade}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="比赛成绩" prop="grade">
            <template slot-scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          :total="list.length"
          :current-page="currentpage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </el-card>
    </div>
  </el-card>
</template>

<script>
  import {getList} from '@/api/table'

  export default {
    name:'order',
    data() {
      return {
        list:[],
        loading:true,
        currentpage: 1,
        pagesize: 5,
        flag: false,
        form: {
          gamesname: this.$route.query.row.gamesname,
          address: this.$route.query.row.address,
          number:this.$route.query.row.number,
          date:this.$route.query.row.date,
          times:this.$route.query.row.times,
        },
        row:{}
      }
    },
    watch: {
      // row(d) {
      //   console.log(this.row)
      //   this.form = JSON.parse(JSON.stringify(this.row));
      // }
    },
    created() {
      this.fetchData()
    },
    methods: {
      save(){
        this.$message(
          {
            type:'success',
            message:'保存成功'
          }
        )
      },
      handleCurrentChange(cpage) {
        this.currentpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      getlist() {
        let starttime = new Date();
        axios('/mockDrink').then(data => {
          console.log(new Date() - starttime)
          this.list = data.data.data;
        }).catch(err => {
          console.error(err)
          this.$alert('请求超时，刷新重试！')
        })
      },
      fetchData: function () {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      mounted() {
        this.getlist()
      }
    },
  }
</script>

