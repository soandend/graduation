<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>管理员列表</span>
    </div>
  <div class="adminList">
    <el-table
      v-loading="listLoading"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="用户名" prop="username">
        <template slot-scope="scope">
          {{ scope.row.string }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" prop="name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理员类型" prop="type">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="emile">
        <template slot-scope="scope">
          <span>078786745@qq.com</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话号码" prop="phone">
        <template slot-scope="scope">
          <span>12243454657</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click.native="deleteRow(scope.$index, list)"
          >删除</el-button>
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
    <!--<el-dialog title="编辑"-->
               <!--:visible.sync="editFormVisible"-->
               <!--:close-on-click-modal="false"-->
               <!--class="edit-form"-->
               <!--:before-close="handleClose">-->
      <!--<el-form :model="editForm" label-width="80px" ref="editForm">-->
        <!--<el-form-item label="用户名" prop="username">-->
          <!--{{editForm.username}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="姓名" prop="name">-->
          <!--<el-input v-model="editForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="管理员类型" prop="type">-->
          <!--<el-input v-model="editForm.type" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="号码" prop="phone">-->
          <!--<el-input v-model="editForm.phone" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="邮箱" prop="emile">-->
          <!--<el-input v-model="editForm.emile" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click.native="handleCancel('editForm')">取消</el-button>-->
        <!--<el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
  </el-card>
</template>

<script>
  import { getList } from '@/api/table'
  import RowEdit from '@/components/row-edit.vue';
  export default {
    name:'adminList',
    components:{RowEdit},
    data() {
      return {
        editFormVisible: false, //默认不显示编辑弹层
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        editForm:{
          username:'',
          name:"",
          type:'',
          phone:"",
          emile:'',
        },

      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //点击编辑
      handleEdit(index, row) {
        this.editFormVisible = true;
        console.log(row)
        this.editForm = Object.assign({}, row);
      },

      //点击关闭dialog
      handleClose(done) {
        this.editFormVisible = false;
      },

      //点击取消
      handleCancel(formName) {
        this.editFormVisible = false;
      },

      //点击更新
      handleUpdate(forName) {
        // console.log(this.editForm.username)
        // 更新的时候把弹出来的表单中的数据写到要修改的表格中
        var postData = {
          username: this.editForm.username,
          name: this.editForm.name,
          phone: this.editForm.phone,
          emile: this.editForm.emile,
      }
        //这里再向后台发个post请求重新渲染表格数据
        this.editFormVisible = false;
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将删除改行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
