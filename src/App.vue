<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row type="flex" :gutter="20" justify="space-between">
         <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" >
           <div> <img  @click="home()" src="../static/image/header.png" alt="" width="40px"></div>
         </el-col>
         <el-col  v-if="isLogin" :xs="10" :sm="6" :md="4" :lg="4" :xl="4" class='users'>
           <span @click.prevent="login()"><a href="#" class="login" >登录</a></span>
           &nbsp;
           <span @click.prevent="regist()"><a href="#" class="regist" >注册</a></span>
         </el-col>
         <el-col  else :xs="10" :sm="6" :md="4" :lg="4" :xl="4" class='users'>
           嘻嘻嘻已登录!
         </el-col>
        </el-row>   
        </el-header>
      <el-main>
        <router-view :key="$route.name"/>
      </el-main>
      <el-footer><el-row type="flex" justify="center">Copyright © 2018-2020 Powerd By: Jo</el-row></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    home () {
       this.$router.push('/')
    },
    login () {
      this.$router.push('/user/login')
    },
    regist () {
      this.$router.push('/user/sign')
    },
  },
  mounted: {
    
  }

}
</script>

<style>
  .el-header,
  .el-footer {
    background-color: #1f2020;
    color: #efefef;
    line-height: 60px;
    height: 50px;
    font-weight: bold;
  }

  .el-header {
    border: solid 1px black;
    width: auto;
    /* border-top-color :#f300f3;
    border-top-width: 3px; */
    background-color: black;
  }

  .el-main {
    background-color: #303133;
    color: #333;
    text-align: left;
    min-height: calc(100vh - 160px);
  }

  .users{
    font-size: 20px;
    font-weight: lighter;
    text-align: center;
  }
  .login, .regist{
    text-align: center;
    background-color: #efefef;
    color: #000 !important;
    border: solid 1px black;
    border-width: 4px;
    padding: 5px;
    font-size: 16px;
    overflow: hidden;
  }
  /* .regist {
    background-color: #efefef;
    color: #000 !important;
    border: solid 1px black;
    border-width: 4px;
    padding: 2px;
    font-size: 16px;
  } */

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
