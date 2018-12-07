<template>
    <div >
      <div class="question">
        <el-row type="flex" justify="center">
         <el-col :span="4">
           <div class="question-simple">
            <div class="question-simple-q">
              <p>Q :)</p>
              <div class="question-simple-name" v-text="randomQuestion.name"></div>
            </div>
            <hr style='border-top: 1px solid #3c3c3c; margin-bottom: 10px;'/>
            <div class="work-button">
              <button @click="go()" style="background-color:#3c7dba;width:80px;border-radius:6px;border-color:#3c7dba;color:#303133;font-size:20px">try</button>
              <button @click="skip()" style="background-color:rgba(0,0,0,0.2);width:80px;border-radius:6px;border-color:#3c7dba;color:#4467ab;font-size:20px">skip</button>
            </div>
           </div>
           
          </el-col>
          <el-col :span="8">
            <div class="question-des">
              <div class="question-des-body">
                <p>M :)</p>
                <div class="question-des-main" v-text="randomQuestion.description"></div>
              </div> 
              <hr style='border-top: 1px solid #262729;margin-bottom: 10px;'/>
              <div class="tip">
                <p>TIP: 本题<span v-text="randomQuestion.score"></span>分</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
       
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import * as types from '@/store/types'
export default {
  name: "Index",
  data() {
    return {
      randomQuestion: {}
    };
  },
  methods: {
    skip() {
      this.$ajax({
      method: 'post',
      url: '/api/getRandomQuestion',
      }).then (res => {
        this.randomQuestion = res.data
        console.log(res.data)
      })
    },
    go() {
      this.$router.push('/work?id=' + this.randomQuestion.id)
    }
  },
  mounted() {
    this.$ajax({
     method: 'post',
     url: '/api/getRandomQuestion',
    }).then (res => {
      this.randomQuestion = res.data
    })
    this.$ajax({
     method: 'get',
     url: '/api/getUserInfo',
    }).then (res => {
     console.log(res)
     this.$store.commit(types.USER, res.data)
    })
    
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
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
    height: 100%;
}
.question {
  margin-top: 1%; 
}
.question-simple {
  padding: 20px;
  background-color: #262729;
  height: 300px;
  width: 100%;
  color: aliceblue;
  font-size: 30px;
}

.question-des {
  padding: 20px;
  font-size: 30px;
  background-color: #3c3c3c;
  height: 300px;
  width: 100%;
  color:antiquewhite;
}

.question-simple-q {
  height: 50%;
  width: 100%;
}
.question-des-body {
  height: 50%;
  width: 100%;
}
.question-simple-name {
  text-align: center;
  width: 100%;
  height: 80%;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 30px; 
}

.question-des-main {
  text-align: center;
  width: 100%;
  height: 80%;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 30px; 
}
.work-button{
  margin-top: 30px;
  text-align: center;
}
.tip {
   margin-top: 26px;
   color:#75757f
}
.el-row {
  margin-bottom: 15px;
}
</style>
