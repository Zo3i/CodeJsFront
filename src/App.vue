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
    border: solid 1px black;
    width: auto;
    border-top-color :red;
    border-top-width: 3px;
    background-color: black;
  }

  .el-main {
    background-color: #303133;
    color: #333;
    text-align: left;
    min-height: calc(100vh - 160px);
  }

  ::-webkit-scrollbar {
  display: block;
  width: 0.5em;
  overflow: auto;
  height: 2em;

}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(48,49,51, 0.3);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(242,242,242, 0.5);
}
</style>
