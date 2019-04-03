<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>器材情况查询</span>
    </div>
    <div class="stutakeSetList">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="租借者姓名：" prop="rentname">
          <el-input type="text" v-model="form.rentname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="租借者电话：" prop="rentphone">
          <el-input type="text" v-model="form.rentphone" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="租借的日期：" prop="rentdate">
          <el-date-picker placeholder="选择时间" v-model="form.rentdate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width: 30%"></el-date-picker>
        </el-form-item>
        <div style="display: block">
          <el-button type="primary" @click="doFilter" plain style="margin-left: 6vw;">查询</el-button>
          <el-button type="primary" @click="rest('form')" plain style="margin-left: 6vw;">重置</el-button>
        </div>
      </el-form>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>运动器材租借列表</span>
        </div>
        <el-table
          :data="tableDataEnd"
          border
          fit
          highlight-current-row
          style="margin-bottom: 1vw">
          <el-table-column align="center" label="器材名称" prop="equipname">
          </el-table-column>
          <el-table-column align="center" label="数量" prop="number">
          </el-table-column>
          <el-table-column align="center" label="租借者姓名" prop="rentname">
          </el-table-column>
          <el-table-column align="center" label="租借者电话" prop="rentphone">
          </el-table-column>
          <el-table-column align="center" label="租借时间" prop="rentdate">
          </el-table-column>
          <el-table-column align="center" label="归还者姓名" prop="returnname">
          </el-table-column>
          <el-table-column align="center" label="归还者电话" prop="returnphone">
        </el-table-column>
          <el-table-column align="center" label="归还时间" prop="returndate">
          </el-table-column>
          <el-table-column align="center" label="状态" prop="status">
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="totalItems"
          :current-page="currentPage"
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
    name:'teacherSetList',
    data() {
      return {
        tableDataBegin: [
          {
            equipname: "篮球",
            number: "20",
            rentname: "张三",
            rentphone: "12232232332",
            rentdate:'2019-04-02',
            returnname:'李四',
            returnphone:'13343232323',
            returndate:'2019-04-02',
            status:'归还',
          },
          {
            equipname: "足球",
            number: "20",
            rentname: "张四",
            rentphone: "18815958187",
            rentdate:'2019-04-01',
            returnname:'李四',
            returnphone:'13343232323',
            returndate:'2019-4-2',
            status:'归还',
          },
          {
            equipname: "羽毛球",
            number: "20",
            rentname: "张五",
            rentphone: "12232232332",
            rentdate:'2019-04-02',
            returnname:'李四',
            returnphone:'13343232323',
            returndate:'2019-4-2',
            status:'归还',
          },
        ],
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        form: {
          rentname: '',
          rentphone:'',
          rentdate: ''
        },
      }
    },
    created() {
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
    },
    methods: {
      doFilter() {
        if (this.form.rentname == "" && this.form.rentphone == "" && this.form.rentdate == "") {
          this.$message.warning("查询条件不能为空，至少一个！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableDataBegin.forEach((value, index) => {
          if (value) {
            if (value.rentname.indexOf(this.form.rentname) >= 0 && value.rentphone.indexOf(this.form.rentphone) >= 0 && value.rentdate.indexOf(this.form.rentdate) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });
        this.currentPage = 1
        this.totalItems = this.filterTableDataEnd.length
        this.currentChangePage(this.filterTableDataEnd)
        this.flag = true
      },
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
      },
      handleSizeChange(psize) {
        this.pageSize = psize;
      },
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      },
      //重置
      rest(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

