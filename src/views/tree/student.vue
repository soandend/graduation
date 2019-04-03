<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>参赛选手信息查询</span>
    </div>
  <div class="queryStudent">
    <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
      <el-form-item label="学号：" prop="number">
        <el-input type="text" v-model="form.number" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input type="text" v-model="form.name" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="学院：" prop="school">
        <el-input type="text" v-model="form.school" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="专业：" prop="profession">
        <el-input type="text" v-model="form.profession" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <el-form-item label="班级：" prop="grade">
        <el-input type="text" v-model="form.grade" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" @click="doFilter" plain style="margin-left: 6vw;">查询</el-button>
        <el-button type="primary" @click="rest('form')" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>参赛选手信息列表</span>
      </div>
    <el-table
      :data="tableDataEnd"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="学号" prop="number">
      </el-table-column>
      <el-table-column align="center" label="姓名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="性别" prop="sex">
      </el-table-column>
      <el-table-column align="center" label="学院" prop="school">
      </el-table-column>
      <el-table-column align="center" label="专业" prop="profession">
      </el-table-column>
      <el-table-column align="center" label="班级" prop="grade">
      </el-table-column>
      <el-table-column align="center" label="手机" prop="phone">
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="emile">
      </el-table-column>
    </el-table>
    <el-pagination background
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
  // import {getList} from '@/api/table'

  export default {
    name:'student',
    data() {
      return {
        tableDataBegin: [
          {
            number: "3156010051",
            name: "王小虎",
            sex:'男',
            school: "计算机信息学院",
            profession:'计算机科学与技术',
            grade: "201503",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
          {
            number: "3156010052",
            name: "王小五",
            sex:'男',
            school: "计算机信息学院",
            profession:'计算机科学与技术',
            grade: "201503",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
          {
            number: "3156010053",
            name: "王小四",
            sex:'女',
            school: "计算机信息学院",
            profession:'数学与应用数学',
            grade: "201503",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
          {
            number: "3156010054",
            name: "王小三",
            sex:'女',
            school: "计算机信息学院",
            profession:'计算机科学与技术',
            grade: "201501",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
          {
            number: "3156010055",
            name: "王二虎",
            sex:'男',
            school: "计算机信息学院",
            profession:'数学与应用数学',
            grade: "201502",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
          {
            number: "3156010056",
            name: "王小二",
            sex:'男',
            school: "计算机信息学院",
            profession:'计算机科学与技术',
            grade: "201501",
            phone: "18815958187",
            emile:'617432954@qq.com'
          },
        ],
        tableDataEnd: [],
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        pageSize: 5,
        currentPage: 1,
        form: {
          number: '',
          name: '',
          school: '',
          grade: '',
          profession: ''
        }
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
      doFilter()
      {
        if (this.form.number == "" && this.form.name == ""  && this.form.school == "" && this.form.profession == "" && this.form.grade == "") {
          this.$message.warning("查询条件不能为空，至少一个！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableDataBegin.forEach((value, index) => {
          if (value) {
            if (value.number.indexOf(this.form.number) >= 0 && value.name.indexOf(this.form.name) >= 0
              && value.school.indexOf(this.form.school) >= 0 && value.profession.indexOf(this.form.profession) >= 0 && value.grade.indexOf(this.form.grade) >= 0) {
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

