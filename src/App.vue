<template>
  <div id="app">
    <el-container style="overflow: auto;">
      <el-header><img src="../static/image/header.png" alt="" width="40px"></el-header>
      <el-main>
    <router-view/>
      </el-main>
      <el-footer>Copyright © 2018-2020 Powerd By: Jo</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-header,
  .el-footer {
    background-color: #1f2020;
    color: #efefef;
    text-align: center;
    line-height: 60px;
    height: 50px;
    font-weight: bold;
  }

  .el-header {
    background-color: black;
  }

  .el-main {
    background-color: #303133;
    color: #333;
    text-align: left;
    min-height: calc(100vh - 160px);
  }
</style>
