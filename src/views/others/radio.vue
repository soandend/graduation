<template>
  <div>
    <router-view></router-view>
  <el-card class="box-card" style="margin: 1vw" v-if="seen">
    <div slot="header" class="clearfix">
      <span>广播信息添加</span>
    </div>
    <div class="party">
      <Search :items="items" :Search="Search" :Reset="Reset" :Add="Add"></Search>
      <el-card class="box-card" >
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
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="广播内容" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.string }}</span>
            </template>
          </el-table-column>
          <el-table-column label="广播日期" align="center">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click.native="deleteRow(scope.$index, list)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click.native="detailInfo(scope.$index, scope.row)"
              >查看详细信息</el-button>
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
  </div>
</template>

<script>
  import {getList} from '@/api/table'
  import Search from "@/components/search-items.vue";

  export default {
    name:'party',
    components:{Search},
    data() {
      return {
        seen:true,
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form:{},
        items:[
          {
            c_name:'广播标题',
            e_name:'title',
            type:'input'
          },
          {
            c_name:'广播内容',
            e_name:'string',
            type:'textarea'
          },
          {
            c_name:'广播日期',
            e_name:'date',
            type:'date'
          }
        ],
        Search:false,
        Reset:true,
        Add:true,
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/others/radio'){
          this.seen = true;
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      deleteRow(index, rows) {
        this.$confirm("此操作将删除该行记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            rows.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      create(){},
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
        this.$router.push({ path: '/others/radio/detail', query: { row }})
        this.seen=false;
      },
    },
    mounted() {
      this.getlist()
    }
  }
</script>

