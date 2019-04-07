<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>裁判信息查询</span>
    </div>
    <div class="teacherSetList">
      <Search :items="items" @search="search"></Search>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>裁判信息列表</span>
        </div>
        <el-table
          v-loading="listLoading"
          :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
              {{ scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="比赛项目">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="比赛地点" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="比赛日期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="比赛时间">
            <template slot-scope="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click.native="deleteRow(scope.$index, list)">删除</el-button>
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
  import Search from "@/components/search-items.vue";

  export default {
    name:'teacherSetList',
    components:{Search},
    data() {
      return {
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form:{},
        items:[
          {
            c_name:'裁判姓名',
            e_name:'name',
            type:'input'
          },
          {
            c_name:'比赛项目',
            e_name:'gamesname',
            type:'input'
          },
          {
            c_name:'比赛地点',
            e_name:'address',
            type:'input'
          },
          {
            c_name:'比赛日期',
            e_name:'date',
            type:'date'
          },
        ],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      search(data){
        this.form = Object.assign({},data);
      },
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

