<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>比赛项目查询</span>
    </div>
    <div class="project">
      <el-form :model="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="比赛项目：" prop="gamesname">
          <el-input type="text" v-model="form.gamesname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="比赛日期：" prop="gamesdate">
          <el-input type="text" v-model="form.gamesdate" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <div style="display: block">
          <el-button type="primary" v-on:click="queryResult" plain style="margin-left: 6vw;">查询</el-button>
          （注：可自由选择查询条件）
        </div>
      </el-form>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>比赛项目列表</span>
        </div>
        <el-table
          v-loading="listLoading"
          :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
          <el-table-column align="center" label="项目名称">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="性别要求">
            <template slot-scope="scope">
              女
            </template>
          </el-table-column>
          <el-table-column label="比赛地点" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比赛日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="比赛时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.score }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="报名人数">
            <template slot-scope="scope">
              <span>{{ scope.row.integer }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template slot-scope="scope">
              <span>查看入场顺序</span>
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
    name:'project',
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form: {
          gamesname: '',
          gamesdate: ''
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

