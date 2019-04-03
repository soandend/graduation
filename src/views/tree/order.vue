<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>入场顺序查看</span>
    </div>
    <div class="order">
      <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
        <el-form-item label="比赛项目：" prop="name">
          {{form.name}}
        </el-form-item>
        <el-form-item label="比赛地点：" prop="address">
          {{form.address}}
        </el-form-item>
        <el-form-item label="报名人数：" prop="number">
        {{form.number}}
        </el-form-item>
        <el-form-item label="比赛日期：" prop="date">
          {{form.date}}
        </el-form-item>
        <el-form-item label="比赛时间：" prop="time">
          {{form.time}}
        </el-form-item>
      </el-form>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>入场顺序列表</span>
        </div>
        <el-table
          :data="tableDataEnd"
          border
          fit
          highlight-current-row
          style="margin-bottom: 1vw"
          :default-sort = "{prop: 'order', order: 'ascenting'}">
          <el-table-column align="center" label="入场顺序" prop="order">
          </el-table-column>
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
    name:'order',
    data() {
      return {
        tableDataBegin: [
          {
            order: "1",
            number: "3156010055",
            sex: "女",
            name: "张三",
            school: "计算机信息学院",
            profession:'软件工程',
            grade: "201503",
          },
          {
            order: "2",
            number: "3156010057",
            sex: "女",
            name: "张四",
            school: "计算机信息学院",
            profession:'软件工程',
            grade: "201502",
          },
          {
            order: "3",
            number: "3156010056",
            sex: "女",
            name: "张五",
            school: "计算机信息学院",
            profession:'软件工程',
            grade: "201504",
          },
        ],
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        form: {
          name: this.$route.query.row.name,
          address: this.$route.query.row.address,
          number:this.$route.query.row.number,
          date:this.$route.query.row.date,
          time:this.$route.query.row.time,
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
    }
  }
</script>

