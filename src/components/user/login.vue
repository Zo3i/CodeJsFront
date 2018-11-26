<template>
    <div >
      <el-row type="flex" justify="left" class="body">
         <el-col :xs="12" :sm="12" :md="14" :lg="16" :xl="18">
           <div class="left">
             <div class="image"></div>
             <div class="des">Hello</div>
           </div>
         </el-col>
         <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
           <div class="main">
             <div class="top">
                 <pre id="console">
<span id="s_bar" style="display:block;height:10px;width:1px;background-image:linear-gradient(90deg,#67b04b,#67b04b);margin-bottom:-30px"></span>
<del>欢迎~</del><del>Welcome!</del><del>emmmmmmm</del>Hello There!
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank">Learn Java Script Here.<span style="background-image:url(../../../static/image/Ghost_Emoji.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span></a>
Happy Learning.<span style="background-image:url(../../../static/image/Yellow_Moon_Emoji.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span>
Happy Coding.<span style="background-image:url(../../../static/image/Sign_of_the_Horns_Emoji.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span>
########################</pre>
             </div>
             <div class="login-form">
               <br/><br/><br/><br/>
               <div class="login-form-body">
                <p style="font-size: 30px">登录</p>
                <el-row type="flex" justify="center" class="body login-form-item">
                  <el-col :span=12>
                  <input type="text" name="user" class="user" placeholder="请输入账号"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="center" class="body login-form-item">
                  <el-col :span=12>
                  <input type="password" name="password" class="password" placeholder="请输入密码"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="space-around" class="body login-form-item">
                  <el-col :span=24>
                  <input type="button" name="login" class="login" value="登录账户"/> 
                  <input type="button" name="login" class="login" value="忘记密码"/>
                  </el-col> 
                </el-row>
               </div>
             </div>
           </div>
         </el-col>    
      </el-row>     
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import Unsplash from 'unsplash-js';
export default {
  name: "Index",
  data() {
    return {
      imgUrl :""
    };
  },
  methods: {

  },
  mounted() {
    $('#console').t({
    speed:50,
    typing:function(elm,chr,left,total){
      console.log("total"+total)
      console.log(left)
      $('#s_bar').css({width:((left+1)*400)/total});
    }

});
  },
  beforeCreate() {
  },
  created() {

  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face{
    font-family: 'Oxygen Mono';
    src : url('../../../static/font/OxygenMono-Regular.ttf');
}
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
    height: 100%;
}
.image {
  background-image: url("https://source.unsplash.com/random/1300*800");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(4px);
  transform: scale(1.0001);
  width: 100%;
  height: 800px;
  float: left;
}
.body {
  
}
.main {
  width: 100%;
  background-color: black;
  height: 100%;
}
.left {
  width: 100%;
  height: 800px;
  position: relative;
  text-shadow: 2px 2px 4px #aaaaa9;
}
.des {
  width: 100%;
  position:absolute;
  line-height: 800px;
  color: white;
  text-align: center;
  font-size: 200px;
  font-family: "Oxygen Mono";
}
.top{
  height: 280px;
}
.login-form {
  background-color: #1f2020;
  height: 520px;
  width: 100%;
  color: antiquewhite;
  text-align: center;
}
.login-form-item {
  margin-top: 20px;
}
.user, .password{
  font-size: 20px;
  text-align: center;
  height: 40px;
  color: black;
}
#console {
  background-color: black;
  color:azure;
  font-size: 30px;
  font-family: "Oxygen Mono";
}
.login-form-body {
  margin-top: 50px;
}

</style>
