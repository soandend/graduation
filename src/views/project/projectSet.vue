<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>比赛项目查询</span>
    </div>
    <div class="projectList">
      <Search :items="items" @search="search"></Search>
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
              {{scope.row.gamesname}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="比赛地点">
            <template slot-scope="scope">
              {{scope.row.address}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="比赛日期">
            <template slot-scope="scope">
              {{scope.row.date}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="开始时间">
            <template slot-scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="结束时间">
            <template slot-scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <row-edit
          :fieldList="fieldList"
          :dialogFormVisible="dialogFormVisible"
          :row="row"
          @cancel="dialogFormVisible = false"
          @submit="submitEdit"
        ></row-edit>
      </el-card>
    </div>
  </el-card>
</template>

<script>
  import {getList} from '@/api/table'
  import Search from "@/components/search-items.vue";
  import RowEdit from "@/components/row-edit.vue";

    export default {
        name: "projectSet",
      components:{Search,RowEdit},
      data(){
          return{
            list: [],
            listLoading: true,
            pagesize: 5,
            currpage: 1,
            dialogFormVisible:false,
            editFormVisible: false, //默认不显示编辑弹层
            form:{},
            row: {},
            fieldList: [
              {
                b_cname: "项目名称",
                b_ename: "gamesname",
                type: "text"
              },
              {
                b_cname: "比赛地点",
                b_ename: "unit",
                type: "input"
              },
              {
                b_cname: "比赛日期",
                b_ename: "date",
                type: "date"
              },
              {
                b_cname: "开始时间",
                b_ename: "times",
                type: "select",
                option:[{value:'8时'},{value:'9时'},{value:'10时'},{value:'11时'},{value:'2时'},{value:'3时'},{value:'4时'},]
              },
              {
                b_cname: "结束时间",
                b_ename: "times",
                type: "select",
                option:[{value:'8时'},{value:'9时'},{value:'10时'},{value:'11时'},{value:'2时'},{value:'3时'},{value:'4时'},]
              }
            ],
            items:[
              {
                c_name:'项目名称',
                e_name:'number',
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
              }
            ],
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        search(data){
          // console.log(data)
          this.form = Object.assign({},data);
        },
        //点击编辑
        handleEdit(index, row) {
          this.dialogFormVisible = true;
          // this.editForm = Object.assign({}, row);
          this.row = row;
        },
        //编辑确认
        submitEdit(d){
          this.dialogFormVisible = false;
          console.log(d);
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

<style scoped>

</style>
