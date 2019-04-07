<template>
  <div>
    <router-view></router-view>
    <div  v-if="seen">
      <el-card class="box-card" style="margin: 1vw">
        <div slot="header" class="clearfix">
          <span>比赛项目查询</span>
        </div>
        <div class="projectSetList">
          <Search :items="items" @search="search"></Search>
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <span>比赛项目列表</span>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
              style="width: 98%;margin-left: 1vw;margin-bottom: 1vw"
              :default-sort = "{prop: 'date', order: 'ascenting'}">
              <el-table-column align="center" label="项目名称" prop="name">
                <template slot-scope="scope">
                  {{scope.row.gamesname}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="性别要求" prop="sex">
                <template slot-scope="scope">
                  {{scope.row.sex}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="比赛地点" prop="address">
                <template slot-scope="scope">
                  {{scope.row.address}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="比赛日期" prop="date">
                <template slot-scope="scope">
                  {{scope.row.date}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="比赛时间" prop="times">
                <template slot-scope="scope">
                  {{scope.row.times}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="报名人数" prop="number">
                <template slot-scope="scope">
                  {{scope.row.integer}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" prop="order">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click.native="detailInfo(scope.$index,scope.row)"
                  >成绩录入</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next, sizes, total, jumper"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              :total="list.length"
              :current-page="currentpage"
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
  import Search from "@/components/search-items.vue";

  export default {
    name:'teacherSetList',
    components:{Search},
    data() {
      return {
        pagesize: 5,
        currpage: 1,
        row: {},
        list: [],
        listLoading: true,
        seen:true,
        form:{},
        items:[
          {
            c_name:'项目名称',
            e_name:'gamesname',
            type:'input'
          },
          {
            c_name:'比赛日期',
            e_name:'date',
            type:'date'
          }
        ],
        currentpage: 1,
        pagesize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/score/addScore'){
          this.seen = true;
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      search(data){
        this.form = Object.assign({},data);
      },
      handleCurrentChange(cpage) {
        this.currentpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      //重置
      rest(formName) {
        this.$refs[formName].resetFields();
      },
      // 跳转
      detailInfo:function(index,row){
        this.$router.push({ path: '/score/addScore/add', query: { row }})
        this.seen=false;
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

