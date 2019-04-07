<template>
  <el-card class="box-card" style="margin: 1vw">
    <div slot="header" class="clearfix">
      <span>开闭幕信息列表</span>
    </div>
  <div class="queryParty"><!-- loading保护罩 -->
    <el-table
      v-loading="listLoading"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 98%;margin-left: 1vw;margin-bottom: 1vw">
      <el-table-column align="center" label="场次" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开/闭幕式主题">
        <template slot-scope="scope">
          {{ scope.row.party}}
        </template>
      </el-table-column>
      <el-table-column label="举办地点" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="举办日期" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" prop="created_at" label="开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.time }}</span>
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
  </div>
  </el-card>
</template>

<script>
import { getList } from '@/api/table'

export default {
  // filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'gray',
    //     deleted: 'danger'
    //   }
    //   return statusMap[status]
    // }
  // },
  data() {
    return {
      list: [],
      listLoading: true,
      pagesize: 5,
      currpage: 1,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
