<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>参赛选手信息查询</span>
    </div>
  <div class="studentSetList">
    <el-form :model="form" class="queryResult-box" style="margin-bottom: 20px">
      <el-form-item label="学生学号：" prop="usernumber">
        <el-input type="text" v-model="form.usernumber" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="学生姓名：" prop="username">
        <el-input type="text" v-model="form.username" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="比赛项目：" prop="project">
        <el-input type="text" v-model="form.project" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="比赛日期：" prop="gamedate">
        <el-input type="text" v-model="form.gamedate" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="审核状态：" prop="check">
        <el-radio v-model="form.check" label="failed">未通过</el-radio>
        <el-radio v-model="form.check" label="successed">通过</el-radio>
        <el-radio v-model="form.check" label="unlimited">不限</el-radio>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="queryResult" plain style="margin-left: 6vw;">查询</el-button>
      </div>
    </el-form>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>参赛选手列表</span>
      </div>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
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
      <el-table-column label="比赛项目" align="center">
        <template slot-scope="scope">
          女
        </template>
      </el-table-column>
      <el-table-column label="学院" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="比赛场地" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="比赛日期">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="审核状态">
        <template slot-scope="scope">
          <span>通过</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <a>编辑状态</a>
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
    name:'studentSetList',
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form: {
          usernumber: '',
          username: '',
          project: '',
          gamedate:'',
          check:'unlimited'
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

