<template>
  <div>
    <router-view></router-view>
  <el-card class="box-card" style="margin: 1vw" v-if="seen">
    <div slot="header" class="clearfix">
      <span>器材借还查询</span>
    </div>
  <div class="rentList">
    <Search :items="items" @search="search"></Search>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>器材借还列表</span>
      </div>
    <el-table
      v-loading="listLoading"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="器材名称">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="租借数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="租借姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="租借电话" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="租借时间">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还电话">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还时间">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="归还时间">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="Return(scope.$index, scope.row)" v-if="scope.row.status==2">归还</el-button>
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
  </div>
</template>

<script>
  import {getList} from '@/api/table'
  import Search from "@/components/search-items.vue";

  export default {
    name:'rentList',
    components:{Search},
    data() {
      return {
        seen:true,
        dialogFormVisible:false,
        editFormVisible: false, //默认不显示编辑弹层
        list: [],
        listLoading: true,
        pagesize: 5,
        currpage: 1,
        form:{},
        items:[
          {
            c_name:'租借姓名',
            e_name:'name',
            type:'input'
          },
          {
            c_name:'租借电话',
            e_name:'phone',
            type:'input'
          },
          {
            c_name:'租借日期',
            e_name:'date',
            type:'input'
          },
          {
            c_name:'归还状态',
            e_name:'status',
            type:'input'
          },
          {
            c_name:'归还状态',
            e_name:'options',
            type:'select',
            options: [
              {
                value: '1',
                label: '已归还',
              }, {
                value: '2',
                label: '未归还',
              }, {
                value: '3',
                label: '不限',
              }
            ],
          }
        ],
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/kit/rentList'){
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
      //跳转
      Return(index,row){
        console.log(row)
        this.$router.push({path:'/kit/rentList/return',query:{row}})
        this.seen=false
      },
    },
    mounted() {
      this.getlist()
    }
  }
</script>

