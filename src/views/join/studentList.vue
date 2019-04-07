<template>
  <div>
  <router-view></router-view>
  <div  v-if="seen">
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>参赛选手信息查询</span>
    </div>
    <div class="studentList">
      <Search :items="items" @search="search"></Search>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>参赛选手信息列表</span>
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
              {{ scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sex }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.school }}
            </template>
          </el-table-column>
          <el-table-column label="年级专业" align="center">
            <template slot-scope="scope">
              {{ scope.row.profession }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="手机">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" plain @click.native="deleteRow(scope.$index, list)">删除</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click.native="joinaction(scope.$index,scope.row)"
                >参赛</el-button>
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
  </div>
  </div>
</template>

<script>
  import {getList} from '@/api/table'
  import Search from "@/components/search-items.vue";
  import RowEdit from "@/components/row-edit.vue";

  export default {
    name:'studentList',
    components:{Search,RowEdit},
    data() {
      return {
        seen:true,
        dialogFormVisible:false,
        editFormVisible: false, //默认不显示编辑弹层
        items:[
          {
            c_name:'学生学号',
            e_name:'number',
            type:'input'
          },
          {
            c_name:'学生姓名',
            e_name:'name',
            type:'input'
          },
          {
            c_name:'所属学院',
            e_name:'school',
            type:'input'
          },
          {
            c_name:'所在专业',
            e_name:'profession',
            type:'input'
          },
          {
            c_name:'所在年级',
            e_name:'grade',
            type:'input'
          },
        ],
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form:{},
        row: {},
        fieldList: [
          {
            b_cname: "学号",
            b_ename: "number",
            type: "text"
          },
          {
            b_cname: "姓名",
            b_ename: "name",
            type: "input"
          },
          {
            b_cname: "性别",
            b_ename: "sex",
            type: "input"
          },
          {
            b_cname: "学院",
            b_ename: "school",
            type: "input"
          },
          {
            b_cname: "专业",
            b_ename: "profession",
            type: "input"
          },
          {
            b_cname: "年级",
            b_ename: "grade",
            type: "input"
          },
          {
            b_cname: "邮箱",
            b_ename: "email",
            type: "input"
          },
          {
            b_cname: "号码",
            b_ename: "phone",
            type: "input"
          }
        ]
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/join/studentList'){
          this.seen = true;
        }
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
      },
      // 跳转
      joinaction:function(index,row){
        this.$router.push({ path: '/join/studentList/join', query: { row }})
        this.seen=false;
      },
    },
    // computed: {},
    mounted() {
      this.getlist()
    }
  }
</script>

