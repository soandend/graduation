<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="margin-bottom: 10px">欢迎使用农大运动会管理平台</div>
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <img src="@/assets/Warming-up.jpg" style=" width:100%;height:auto;"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 25px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
