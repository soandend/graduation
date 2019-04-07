<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>服务站点信息添加</span>
    </div>
    <div class="party">
      <Search :items="items" :Search="Search" :Reset="Reset" :Add="Add"></Search>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>服务站点信息列表</span>
        </div>
        <el-table
          v-loading="listLoading"
          :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
          <el-table-column align="center" label="服务站点名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="服务站点地址" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.address }}</span>
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
    name:'party',
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
            c_name:'服务站点名称',
            e_name:'party',
            type:'input'
          },
          {
            c_name:'服务站点地址',
            e_name:'address',
            type:'input'
          }
        ],
        Search:false,
        Reset:true,
        Add:true,
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
      }
    },
    mounted() {
      this.getlist()
    }
  }
</script>

