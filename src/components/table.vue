<template>
	<div class="view-table">
		<slot name="search"></slot>
		<el-table
			:header-cell-class-name="cellStyle"
			:data="tableData"
			:row-class-name="rowStyle"
			height="88%"
			style="width: 100%"
			v-loading="loading"
			@select="handleSelectionChange"
			@select-all="handleSelectAll"
		>
			<el-table-column width="60" label="头像" v-if="avatar">
				<template slot-scope="scope">
					<img :src="scope.row.avatar" alt style="width:30px;max-height:30px;border-radius:20px;">
				</template>
			</el-table-column>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column
				:sortable="item.b_ename == 'tm'"
				v-for="(item,index) of fieldList"
				:key="index"
				:label="item.b_cname"
				min-width="100"
				:width="item.width"
      >
				<template slot-scope="scope">
					<!-- <i class="el-icon-time"></i> -->
					<el-popover trigger="hover" placement="top" v-if="item.popover">
						<p>{{ scope.row[item.b_ename] }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">详情</el-tag>
						</div>
					</el-popover>
					<span
						v-if="!item.popover && !item.tag && !item.download"
						style="margin-left: 10px"
					>{{ scope.row[item.b_ename] }}</span>
					<el-tag
						v-if="item.tag"
						:type="{'通过':'success','待批准':'','拒绝':'info'}[scope.row[item.b_ename]]"
						size="medium"
					>{{ scope.row[item.b_ename] }}</el-tag>
					<el-button v-if="item.download" size="small" type="primary" @click="download(scope.row)">下载</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" v-if="action" min-width="200">
				<template slot-scope="scope">
					<el-button
						v-if="action.del"
						size="mini"
						type="danger"
						@click="delRow(scope.$index, scope.row)"
					>删除</el-button>
					<el-button v-if="action.isEdit" size="mini" @click="editRow(scope.$index, scope.row)">编辑</el-button>
					<upfile-load style="padding-left:10px;" v-if="action.upload" size="mini" @complete="complete">
						<template slot="content">
							<el-button type="primary" size="small" @click="upfile(scope.row)">上传</el-button>
						</template>
					</upfile-load>
				</template>
			</el-table-column>
		</el-table>
		<slot name="table-pagination"></slot>
	</div>
</template>

  <script>
	// import {downloadFile} from '../assets/common.js'
	// import UpfileLoad from "./upload-file";
	import Vue from "vue";
	export default {
		// components: { UpfileLoad },
		props: {
			fieldList: {
				type: Array,
				default: () => []
			},
			tableData: {
				type: Array,
				default: () => []
			},
			loading: {
				type: Boolean,
				default: true
			},
			action: {
				type: Object,
				default: () => {}
			},
			is_tag: {
				type: Boolean,
				default: false
			},
			avatar: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				cellStyle: (row, rowIndex) => {
					return "cell-style";
				},
				rowStyle: (row, rowIndex) => {
					return "row-style";
				},
				row: {}
			};
		},
		mounted() {
			this.$nextTick(() => {
				console.log(this.$refs.search);
			});
		},
		methods: {
			delRow(index, row) {
				this.$emit("delRow", row);
			},
			editRow(index, row) {
				this.$emit("editRow", row);
			},
			handleSelectionChange(rows) {
				this.$emit("getRows", rows);
			},
			handleSelectAll(rows) {
				console.log(rows);
				this.$emit("getRows", rows);
			},
			upfile(row) {
				this.row = row;
				this.$emit("upfile", row);
			},
			complete(imgUrl) {
				console.log(imgUrl);
				this.row.avatar = imgUrl;
				this.$emit("upfile", this.row);
			},
			download(row) {
				// window.open(row.homework_url);
				// downloadFile(row.homework_url)
				window.location.href = row.homework_url;
			}
		}
	};
</script>
<style lang='scss'>
	@import "../styles/transition.scss";
	.view-table {
		height: 100%;
		width: 100%;
		::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}
		.el-pagination {
			display: inline-block;
			float: right;
			margin: 5px;
		}
	}
	.el-table {
		// height: calc(100% - 50px);
		overflow: auto !important;
	}
	.el-table td {
		border: none !important;
	}
	.cell-style {
		background-color: #f3f6f9 !important;
		font-size: 16px !important;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px !important;
		// height: 72px;
		letter-spacing: 0px;
		color: #3b3b3b;
	}
	.row-style {
		height: 60px;
	}
</style>

