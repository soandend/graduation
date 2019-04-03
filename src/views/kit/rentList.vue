<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>器材借还查询</span>
    </div>
  <div class="rentList">
    <el-form :model="form" class="queryResult-box" style="padding: 20px;">
      <el-form-item label="租借姓名：" prop="rentname">
        <el-input type="text" v-model="form.rentname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="租借电话：" prop="rentphone">
        <el-input type="text" v-model="form.rentphone" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="租借器材：" prop="rentkit">
        <el-input type="text" v-model="form.rentkit" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="租借日期：" prop="rentdate">
        <el-input type="text" v-model="form.rentdate" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" v-on:click="queryResult" plain style="margin-left: 6vw;">查询</el-button>
      (注：可自由选择查询条件)
      </div>
    </el-form>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>器材借还列表</span>
      </div>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="器材名称">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="租借数量" align="center">
        <template slot-scope="scope">
          <span>2</span>
        </template>
      </el-table-column>
      <el-table-column label="租借姓名" align="center">
        <template slot-scope="scope">
          <span>李四</span>
        </template>
      </el-table-column>
      <el-table-column label="租借电话" align="center">
        <template slot-scope="scope">
          <span>123456789900</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="租借时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还姓名">
        <template slot-scope="scope">
          <span>张三</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还电话">
        <template slot-scope="scope">
          <span>123456789900</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还时间">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态">
        <template slot-scope="scope">
          <span>已归还</span>
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
    name:'rentList',
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form: {
          rentname:'',
          rentphone: '',
          rentdate: '',
          rentkit:''
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

