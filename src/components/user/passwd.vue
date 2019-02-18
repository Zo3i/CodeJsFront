<template :key="key">
    <div >
      <el-row type="flex" justify="left" class="body">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
           <div class="left">
             <div class="image"></div>
             <div class="passwd-des">
             <div class="passwd-form">
               <br/><br/>
               <div class="passwd-form-body">
                <p style="font-size: 30px">忘记密码</p>
                <el-row type="flex" justify="center" class="body passwd-form-item">
                  <el-col :span=12>
                  <!-- <p style="text-align: left">电话:</p> -->
                  <input type="text" name="mobile" class="user" id="mobile" placeholder="请输入手机号"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="center" class="body passwd-form-item">
                  <el-col :span=12>
                    <!-- <p style="text-align: left">名字:</p> -->
                  <input type="text" name="name" class="user" id="name" placeholder="验证码"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="center" class="body passwd-form-item">
                  <el-col :span=12>
                    <!-- <p style="text-align: left">密码:</p> -->
                  <input type="password" name="password" id="password" class="password" placeholder="请输入新密码"/> 
                  </el-col>  
                </el-row>
                <el-row type="flex" justify="space-around" class="body passwd-form-item">
                  <el-col :span=24>
                  <input type="button" name="login" class="login" @click="sign()" value="提交"/> 
                
                  </el-col> 
                </el-row>
             </div>
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
.passwd-des {
  width: 100%;
  color: white;
  font-size: 20px;
  font-family: "Oxygen Mono";
  position: absolute;
  top:10%;
}
.top{
  height: 280px;
}
.passwd-form {
  background-color: #3c3c3c78;
  height: 380px;
  width: 520px;
  margin: 0 auto;
  color: antiquewhite;
  text-align: center;

}
.passwd-form-item {
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
