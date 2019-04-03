<template>
  <el-card class="box-card" style="margin: 1vw">
  <div slot="header" class="clearfix">
    <span>广播信息列表</span>
  </div>
  <div class="radio">
    <el-button type="primary" v-on:click="create" plain style="margin-bottom: 20px;">添加广播</el-button>
    <el-card class="box-card" >
      <el-table
        v-loading="listLoading"
        :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="广播标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <a>详细信息</a>&emsp;&emsp;<a>删除</a>
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
    name:'radio',
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
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

