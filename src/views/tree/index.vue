<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>比赛成绩查询</span>
    </div>
    <div class="queryResult">
      <el-form :model="form" class="queryResult-box" style="margin-bottom: 20px;" ref="form">
        <el-form-item label="学生学号：" prop="number" >
          <el-input type="text" v-model="form.number" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="学生姓名："  prop="name" >
          <el-input type="text" v-model="form.name" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="比赛项目：" prop="gamesname" >
          <el-input type="text" v-model="form.gamesname" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
        </el-form-item>
        <el-form-item label="比赛时间：" prop="date" >
        <!--<el-input type="text" v-model="form.date" clearable prefix-icon="icon-inputmima" style="width: 30%"/>-->
          <el-date-picker placeholder="选择时间" v-model="form.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width: 30%"></el-date-picker>
        </el-form-item>
        <div style="display: block">
          <el-button type="primary" @click="doFilter" plain style="margin-left: 6vw;">查询</el-button>
          <el-button type="primary" @click="rest('form')" plain style="margin-left: 6vw;">重置</el-button>
        </div>
      </el-form>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>比赛成绩浏览</span>
        </div>
        <el-table
          :data="tableDataEnd"
          border
          fit
          highlight-current-row
          style="margin-bottom: 1vw"
          :default-sort = "{prop: 'ranking', order: 'ascenting'}">
          <el-table-column align="center" label="名次" prop="ranking">
          </el-table-column>
          <el-table-column align="center" label="学号" prop="number">
          </el-table-column>
          <el-table-column align="center" label="姓名" prop="name">
          </el-table-column>
          <el-table-column align="center" label="场地" prop="address">
          </el-table-column>
          <el-table-column align="center" label="项目" prop="gamesname">
          </el-table-column>
          <el-table-column align="center" label="日期" prop="date">
          </el-table-column>
          <el-table-column align="center" label="成绩" prop="score">
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
  // import {getList} from '@/api/table'

  export default {
    data() {
      return {
        tableDataBegin: [
          {
            ranking: "1",
            number: "3156010051",
            name: "王小虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "女子五十米短跑",
            score: "1.03",
          },
          {
            ranking: "4",
            number: "3156010052",
            name: "王二虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "女子五十米短跑",
            score: "1.04",
          },
          {
            ranking: "3",
            number: "3156010053",
            name: "王三虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "女子五十米短跑",
            score: "1.05",
          },
          {
            ranking: "2",
            number: "3156010054",
            name: "王四虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "女子五十米短跑",
            score: "1.06",
          },
          {
            ranking: "5",
            number: "3156010000",
            name: "王六虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "女子五十米短跑",
            score: "1.06",
          },
          {
            ranking: "1",
            number: "3156010055",
            name: "王五虎",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "男子五十米短跑",
            score: "1.07",
          },
          {
            ranking: "2",
            number: "3156010056",
            name: "王小二",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "男子五十米短跑",
            score: "1.08",
          },
          {
            ranking: "3",
            number: "3156010057",
            name: "王小三",
            address:'北区田径场',
            date: "2018-09-09",
            gamesname: "男子五十米短跑",
            score: "1.09",
          }
        ],
        form:{
          number:'',
          name:'',
          gamesname:'',
          date:'',
        },
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false
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
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter()
      {
        if (this.form.number == "" && this.form.name == ""  && this.form.gamesname == "" && this.form.date == "") {
          this.$message.warning("查询条件不能为空，至少一个！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableDataBegin.forEach((value, index) => {
          if (value) {
            if (value.number.indexOf(this.form.number) >= 0 && value.name.indexOf(this.form.name) >= 0
                && value.gamesname.indexOf(this.form.gamesname) >= 0 && value.date.indexOf(this.form.date) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage = 1
        this.totalItems = this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag = true
      },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      //   this.pageSize = val;
      //   this.handleCurrentChange(this.currentPage);
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      //   this.currentPage = val;
      //   //需要判断是否检索
      //   if (!this.flag) {
      //     this.currentChangePage(this.tableDataEnd)
      //   } else {
      //     this.currentChangePage(this.filterTableData)
      //   }
      // },
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
      },
      handleSizeChange(psize) {
        this.pageSize = psize;
      },
    // 组件自带监控当前页码
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

