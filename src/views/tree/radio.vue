<template>
  <div>
    <router-view></router-view>
  <div class="radio" v-if="seen">
    <el-card class="box-card" style="margin: 1vw">
      <div slot="header" class="clearfix">
        <span>广播信息列表</span>
      </div>
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
      <el-table-column align="center" label="广播内容" :show-overflow-tooltip="true">
        <template slot-scope="scope" >
          {{scope.row.string}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="detailInfo(scope.$index, scope.row)"
          >查看详细信息</el-button>
          <!--<router-link  to="teacher/order" >查看入场顺序</router-link>-->
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
  </div>
</template>

<script>
  import {getList} from '@/api/table'

  export default {
    name:'radio',
    data() {
      return {
        seen:true,
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/home/radio'){
          this.seen = true;
        }
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
      },
      // 跳转
      detailInfo:function(index,row){
        this.$router.push({ path: '/home/radio/detail', query: { row }})
        this.seen=false;
      }
    },
    mounted() {
      this.getlist()
    }
  }
</script>

