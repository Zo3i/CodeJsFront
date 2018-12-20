<template>
  <div id="app">
    <el-container id="container">
      <el-header>
        <el-row type="flex" :gutter="20" justify="space-between">
         <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" >
           <div> <img  @click="home()" src="../static/image/header.png" alt="" width="50px"></div>
         </el-col>
         <el-col  v-if="GLOBAL.isLogin"  :xs="10" :sm="6" :md="4" :lg="4" :xl="4" class='users'>
           {{user.name}}
          <el-dropdown trigger="click"  size="medium" placement="bottom">
            <span class="el-dropdown-link">
              <img  :src="faceImage" alt="" width="50px" height="50"><span style="font-size:20px;color:white;padding:5px"> </span>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item @click.native="center()">个人中心</el-dropdown-item>
              <el-dropdown-item>留言板</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          &nbsp;&nbsp;&nbsp;
         </el-col>
         <el-col v-else :xs="10" :sm="6" :md="4" :lg="4" :xl="4" class='usersLog'>
           <span @click.prevent="login()"><a href="#" class="login" >登录</a></span>
           &nbsp;
           <span @click.prevent="regist()"><a href="#" class="regist" >注册</a></span>
           &nbsp;&nbsp;&nbsp;
         </el-col>

        </el-row>
        </el-header>
      <el-main>
        <router-view key="key" />
      </el-main>
      <el-footer><el-row type="flex" justify="center">Copyright © 2018-2020 Powerd By: Jo_ </el-row></el-footer>
    </el-container>
  </div>
</template>

<script>
import * as types from '@/store/types'
export default {
  name: 'App',
  data() {
    return {
      user: {},
      faceImage: "",
      faceImageId: ""
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
    logout () {
      this.$store.commit(types.LOGOUT)
      this.GLOBAL.isLogin = false
      this.$router.push('/user/login')
    },
    center () {
      this.$router.push('/user/center')
    }
  },
  beforeMount() {
    if (localStorage.user.indexOf("name") != -1 && localStorage.token != undefined && localStorage.token != "") {
      this.user = JSON.parse(localStorage.user)
      this.GLOBAL.isLogin = true
      this.faceImageId = localStorage.userFaceId
      this.faceImage = '../static/image/face/' + this.faceImageId + ".png"
    }
  },
  mounted() {

  },
  watch: {
    '$route':function(to, from){
        if (localStorage.user.indexOf("name") != -1 && localStorage.token != undefined && localStorage.token != "") {
          //获取用户信息
          this.$ajax({
            method: 'get',
            url: '/api/getUserInfo',
            }).then (res => {
              this.user = res.data
            })
          this.faceImageId = localStorage.userFaceId
          this.faceImage = '../static/image/face/' + this.faceImageId + ".png"
        }
    }
  },
  created() {

  },
  beforeCreate() {
    
  },
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + new Date(): this.$route + new Date()
    }
  },


}
</script>

<style>

  #app, #container { 
    padding:0px;
    margin:0px;
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    border:hidden;
  }
  .el-header {
    background-color: #1f2020;
    color: #aaaaa9;
    height: 50px;
    font-size: 10px;
    font-weight: bold;
    padding: 5px;
  }

  .el-footer {
    background-color: #1f2020;
    color: #aaaaa9;
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    height: 30px;
    line-height: 50px;
  }

  .el-header {
    border: solid 1px black;
    width: auto;
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
    text-align: right;
  }
  .usersLog {
    font-size: 20px;
    font-weight: lighter;
    text-align: right;
    line-height: 60px;
  } 
  .login, .regist{
    text-align: center;
    background-color: #efefef;
    color: #000 !important;
    border: solid 1px black;
    border-width: 1px;
    padding: 5px;
    font-size: 16px;
    overflow: hidden;
    border-radius: 4px;
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
