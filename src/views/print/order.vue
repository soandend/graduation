<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>比赛入场顺序查询</span>
    </div>
  <div class="order">
    <el-form :model="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="比赛项目：" prop="gamesname">
        <el-input type="text" v-model="form.gamesname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="比赛时间：" prop="gamestime">
        <el-input type="text" v-model="form.gamestime" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="queryResult" plain style="margin-left: 6vw;">查询</el-button>
      </div>
    </el-form>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>比赛入场顺序</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="入场顺序">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学号">
        <template slot-scope="scope">
          {{ scope.row.string }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="比赛项目">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="比赛日期">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.date}}</span>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination background
                     layout="prev, pager, next, sizes, total, jumper"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pagesize"
                     :total="list.length"
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
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form: {
          gamesname: '',
          gamestime: ''
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleCurrentChange(cpage) {
        this.currpage = cpage;
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
      }
    },
    mounted() {
      this.getlist()
    }
  }
</script>

