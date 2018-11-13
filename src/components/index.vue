<template>
    <div >
      <div class="question">
        <el-row type="flex" justify="center">
         <el-col :span="4">
           <div class="question-simple">
             <p>Q :)</p>
            <div class="question-simple-name" v-text="randomQuestion.name">
            </div>
            <hr style='border-top: 1px solid #3c3c3c;'/>
            <div class="work-button">
              <button @click="go()" style="background-color:#3c7dba;width:80px;border-radius:6px;border-color:#3c7dba;color:#303133;font-size:20px">try</button>
              <button @click="skip()" style="background-color:rgba(0,0,0,0.2);width:80px;border-radius:6px;border-color:#3c7dba;color:#4467ab;font-size:20px">skip</button>
            </div>
           </div>
           
          </el-col>
          <el-col :span="8">
            <div class="question-des">
              <p>M :)</p>
              <div class="question-des-main" v-text="randomQuestion.description">
              </div>
              <hr style='border-top: 1px solid #262729;'/>
              <p style="color:#75757f">TIP: 本题<span v-text="randomQuestion.score"></span>分</p>
            </div>
          </el-col>
        </el-row>
      </div>
       
    </div>
</template>

<script>
  import NProgress from 'NProgress'
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
      url: '/getRandomQuestion',
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
     url: '/getRandomQuestion',
    }).then (res => {
      this.randomQuestion = res.data
      console.log(res.data)
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
  overflow: hidden;
}
.question-simple-name {
  text-align: center;
  width: 100%;
  height: 15%;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10%; 
}

.question-des {
  padding: 20px;
  font-size: 30px;
  background-color: #3c3c3c;
  height: 300px;
  width: 100%;
  color:antiquewhite;
}

.question-des-main {
  text-align: center;
  width: 100%;
  height: 50%;
  font-size: 18px;
  margin-top: 5%; 
  overflow: auto;
}
.work-button{
  margin-top: 20%;
  text-align: center;
}
.el-row {
  margin-bottom: 15px;
}
</style>
