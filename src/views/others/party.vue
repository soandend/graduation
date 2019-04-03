<template>
  <el-card class="box-card" style="margin: 1vw">
  <div slot="header" class="clearfix">
    <span>开闭幕式列表</span>
  </div>
  <div class="party">
    <el-form :model="form" class="queryResult-box" style="margin-bottom: 20px;">
      <el-form-item label="开闭幕名称：" prop="partyname">
        <el-input type="text" v-model="form.partyname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="举办地址：" prop="address">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.address" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="举办日期：" prop="date">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.date" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="举办时间：" prop="time">
        &nbsp;&nbsp;&nbsp;<el-input type="text" v-model="form.time" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="create" plain style="margin-left: 7vw;">添加</el-button>
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
      <el-table-column align="center" label="开幕式名称">
        <template slot-scope="scope">
          {{ scope.row.string }}
        </template>
      </el-table-column>
      <el-table-column label="举办地点" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="举办日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column label="举办时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <a>删除</a>
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
    name:'party',
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form: {
          partyname: '',
          address: '',
          date: '',
          time:''
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

