<template :key="key">
    <div >
      <el-row type="flex" justify="left" class="body">
         <el-col :xs="12" :sm="12" :md="14" :lg="16" :xl="18">
           <div class="left">
             <div class="image"></div>
             <div class="des">World</div>
           </div>
         </el-col>
         <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
           <div class="main">
             <div class="top">
                 <pre id="console">
<span id="sign-bar" name="sign-bar" style="display:block;height:10px;width:1px;background-image:linear-gradient(90deg,#67b04b,#67b04b);margin-bottom:-30px"></span>
<del>欢迎~</del><del>Welcome!</del><del>emmmmmmm</del>欢迎来到,JavaScript代码场!
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank">来啦小弟!<span style="background-image:url(../../../static/image/Ghost_Emoji.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span></a>
Happy Every Day.<span style="background-image:url(../../../static/image/Yellow_Moon_Emoji.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span>
欢迎注册!<span style="background-image:url(../../../static/image/Clapping_Hands.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span>
<span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span><span style="background-image:url(../../../static/image/1f427.png);background-size:cover;display:inline-block;height:40px;width:40px;"></span></pre>
             </div>
             <div class="login-form">
               <br/><br/>
               <div class="login-form-body">
                <p style="font-size: 30px">注册</p>
                <el-row type="flex" justify="center" class="body login-form-item">
                  <el-col :span=12>
                  <p style="text-align: left">电话:</p>
                  <input type="text" name="mobile" class="user" id="mobile" placeholder="请输入手机号"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="center" class="body login-form-item">
                  <el-col :span=12>
                    <p style="text-align: left">名字:</p>
                  <input type="text" name="name" class="user" id="name" placeholder="你叫啥?"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="center" class="body login-form-item">
                  <el-col :span=12>
                    <p style="text-align: left">密码:</p>
                  <input type="password" name="password" id="password" class="password" placeholder="请输入密码"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="space-around" class="body login-form-item">
                  <el-col :span=24>
                  <input type="button" name="login" class="login" @click="sign()" value="注册账户"/> 
                  <input type="button" name="login" class="login" @click="login()" value="前往登录"/>
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
      imgUrl :"",
      key: ""
    };
  },
  methods: {
    sign() {
      var name = $('#name').val()
      var password = $('#password').val()
      var mobile = $('#mobile').val()

      if(!/^1[34578]\d{9}$/.test(mobile)){
        floatMessage("手机号不正确!")
        $(".trigger-info").click()
      } else {
        if (name.length <= 0 || name.length >= 20) {
           floatMessage("名字长度为0-20.")
           $(".trigger-info").click()
        } else {
          if (password.length <= 5 || password.length >= 18) {
             floatMessage("密码长度为6-18.")
             $(".trigger-info").click()
          } else {
            this.$ajax({
              method: 'post',
              url: '/api/sign?name=' + name + '&password=' + this.$md5(password) + '&mobile=' + mobile,
            }).then(res => {
              if (res) {
                 floatMessage(res.data)
                 $(".trigger-info").click()
                 this.$router.push('/user/login')
              }
            }).catch(err => {

            })
           
          }
        }
      }
    },
    login() {
      this.$router.push('/user/login')
    }
  },
  mounted() {
    this.key = Math.random() 
    $('#console').t({
    speed:50,
    typing:function(elm,chr,left,total){
      $('#sign-bar').css({width:((left+1)*400)/total});
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
