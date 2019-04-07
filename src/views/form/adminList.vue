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
				style="width: 98%;margin-left: 1vw;margin-bottom: 1vw"
			>
				<el-table-column align="center" label="用户名" prop="username">
					<template slot-scope="scope">{{ scope.row.username }}</template>
				</el-table-column>
				<el-table-column align="center" label="姓名" prop="name">
					<template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column align="center" label="管理员类型" prop="type">
					<template slot-scope="scope">
						<span>普通管理员</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="邮箱" prop="email">
					<template slot-scope="scope">
						<span>{{ scope.row.email }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="电话号码" prop="phone">
					<template slot-scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" plain @click.native="deleteRow(scope.$index, list)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next, sizes, total, jumper"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="pagesize"
				:total="list.length"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
			<row-edit
				:fieldList="fieldList"
				:dialogFormVisible="dialogFormVisible"
				:row="row"
				@cancel="dialogFormVisible = false"
				@submit="submitEdit"
			></row-edit>
		</div>
	</el-card>
</template>

<script>
	import { getList } from "@/api/table";
	import RowEdit from "@/components/row-edit.vue";
	export default {
		name: "adminList",
		components: { RowEdit },
		data() {
			return {
        dialogFormVisible:false,
				editFormVisible: false, //默认不显示编辑弹层
				list: [],
				listLoading: true,
				pagesize: 5,
				currpage: 1,
				row: {},
				fieldList: [
					{
						b_cname: "用户名",
						b_ename: "username",
						type: "text"
					},
					{
						b_cname: "姓名",
						b_ename: "name",
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
			};
		},
		created() {
			this.fetchData();
		},
		methods: {
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
				axios("/mockDrink")
					.then(data => {
						console.log(new Date() - starttime);
						this.list = data.data.data;
					})
					.catch(err => {
						console.error(err);
						this.$alert("请求超时，刷新重试！");
					});
			},
			fetchData: function() {
				this.listLoading = true;
				getList(this.listQuery).then(response => {
					this.list = response.data.items;
					this.listLoading = false;
          
				});
			}
		},
		mounted() {
			this.getlist();
		}
	};
</script>
