<template>
  <div class="score">
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
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="名次">
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
      <el-table-column label="年级专业" align="center">
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
      <el-table-column align="center" prop="created_at" label="成绩">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getList} from '@/api/table'

  export default {
    name:'score',
    data() {
      return {
        list: null,
        listLoading: true,
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
      queryResult: function () {

      },
      fetchData: function () {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

