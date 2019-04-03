<template>
  <div>
    <router-view></router-view>
    <div  v-if="seen">
    <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>赛事编排查询</span>
    </div>
  <div class="projectSetList">
    <el-form :model="form" ref="form" class="queryResult-box" style="margin-bottom: 20px;">
      <el-form-item label="项目名称：" prop="name">
        <el-input type="text" v-model="form.name" clearable prefix-icon="icon-inputmima" style="width: 30%"/>
      </el-form-item>
        <el-form-item label="比赛日期：" prop="date">
        <el-date-picker placeholder="选择时间" v-model="form.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" style="width: 30%"></el-date-picker>
      </el-form-item>
      <div style="display: block">
        <el-button type="primary" @click="doFilter" plain style="margin-left: 6vw;">查询</el-button>
        <el-button type="primary" @click="rest('form')" plain style="margin-left: 6vw;">重置</el-button>
      </div>
    </el-form>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>比赛项目列表</span>
      </div>
      <el-table
        :data="tableDataEnd"
        border
        fit
        highlight-current-row
        style="margin-bottom: 1vw"
        :default-sort = "{prop: 'date', order: 'ascenting'}">
        <el-table-column align="center" label="项目名称" prop="name">
        </el-table-column>
        <el-table-column align="center" label="性别要求" prop="sex">
        </el-table-column>
        <el-table-column align="center" label="比赛地点" prop="address">
        </el-table-column>
        <el-table-column align="center" label="比赛日期" prop="date">
        </el-table-column>
        <el-table-column align="center" label="比赛时间" prop="time">
        </el-table-column>
        <el-table-column align="center" label="报名人数" prop="number">
        </el-table-column>
        <el-table-column align="center" label="操作" prop="order">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            plain
            @click.native="detailInfo(scope.$index,scope.row)"
          >查看入场顺序</el-button>
            <!--<router-link  to="teacher/order" >查看入场顺序</router-link>-->
          </template>
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
    </div>
  </div>
</template>

<script>
  import {getList} from '@/api/table'

  export default {
    name:'teacherSetList',
    data() {
      return {
        seen:true,
        tableDataBegin: [
          {
            name: "女子五十米短跑",
            sex: "女",
            address: "北区田径场",
            date: "2018-09-09",
            time:'9:00-12:00',
            number: "4",
          },
          {
            name: "女子五十米短跑",
            sex: "女",
            address: "北区田径场",
            date: "2018-09-08",
            time:'9:00-12:00',
            number: "4",
          },
          {
            name: "男子五十米短跑",
            sex: "男",
            address: "北区田径场",
            date: "2018-09-09",
            time:'9:00-12:00',
            number: "4",
          }
        ],
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        form: {
          name: '',
          date: ''
        },
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/home/teacher'){
            this.seen = true;
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
        if (this.form.name == "" && this.form.date == "" ) {
          this.$message.warning("查询条件不能为空，至少一个！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableDataBegin.forEach((value, index) => {
          if (value) {
            if (value.date.indexOf(this.form.date) >= 0 && value.name.indexOf(this.form.name) >= 0) {
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
      // 跳转
      detailInfo:function(index,row){
        this.$router.push({ path: '/home/teacher/order', query: { row }})
        this.seen=false;
  }
    }
  }
</script>

