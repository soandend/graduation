<template>
  <el-dialog title="编辑记录" :visible.sync="dialogFormVisible">
    <div style="padding:0 100px;">
      <el-form label-position="left" label-width="80px">
        <el-form-item v-for="(item,index) of fieldList" :key="index" :label="item.b_cname">
          <el-input v-model="form[item.b_ename]" v-if="item.type === 'input'"></el-input>
          <el-date-picker
            v-model="form[item.b_ename]"
            type="date"
            placeholder="选择日期时间"
            v-if="item.type === 'date'"
          ></el-date-picker>
          <span v-if="item.type == 'text'">{{form[item.b_ename]}}</span>
          <el-select v-if="item.type == 'select'" v-model="form[item.b_ename]" placeholder="请选择">
            <el-option v-for="innerItem of item.option" :key="innerItem.value" :label="innerItem.label"
                       :value="innerItem.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      fieldList: {
        type: Array,
        default: () => []
      },
      row: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        form: {}
      };
    },
    watch: {
      row(d) {
        this.form = JSON.parse(JSON.stringify(this.row));
      }
    },
    mounted() {
    },
    methods: {
      cancel() {
        this.$emit("cancel");
      },
      submit() {
        this.$emit("submit", this.form);
        this.$message({
          type: "success",
          message: "提交成功!"
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  .content {
    height: 100%;
    width: 100%;
  }
</style>
