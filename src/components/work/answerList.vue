<template>
  <div class="answer-list">
    <div class="answer-top">
      <div class="question-info">
        <el-row>
          <el-col :xs="18" :sm="18" :md="18" :lg="10" :xl="10">
            <div class="question-info-name">题目: {{question.name}}</div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="12">
            <div class="grid-content">分数: {{question.score}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="goodjob">{{goodjob}}</div>
    </div>
    <br>
    <div id="answer">
      <div v-for="(item, index) in answerlist" v-bind:key="item.id">
        <answerItem :answer="item" :key="index" v-if="index < (page * 5)"></answerItem>
      </div>
    </div>
    <div v-if="totle > 5 && totle > (page * 5)">
      <div  style=" text-align:center">
        <button id="load" @click="load" style="background-color:rgba(0,0,0,0.2);width:120px;border-radius:6px;border-color:#3c7dba;color:#84a3cc;font-size:20px">
          加载更多
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "NProgress";
import AnswerItem from '@/components/base/answerItem/answer-item'
export default {
  name: "Index",
  data() {
    return {
      answer: {},
      user: {},
      question: {},
      goodjob: "",
      answerlist: [],
      page: 1,
      totle: '',
      isScroll: true
    };
  },
  methods: {
    load() {
      this.page ++
       this.$nextTick(() => {
         if (this.totle > 5 && this.totle > (this.page * 5)) {
            this.isScroll = true
         }
      })
    },
    handleScroll (){
      var that = this
      $('.el-main').scroll(function () {
        var st = this.scrollTop;
        var height = this.clientHeight;
        var sh = this.scrollHeight;
              if (st + height >= sh && that.isScroll == true){
                  that.isScroll = false
                  st -= 300 
                  that.load()
              }
        });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.user = JSON.parse(localStorage.user)
    this.$ajax({
      url: "/otherApi/all.json",
      method: "post"
    }).then(res => {
      var content = res.data.content;
      var author = res.data.author;
      this.goodjob = content;
    })
  },
  beforeCreate() {},
  created() {
    new Promise(resolve => {
      //获取用户信息
      this.$ajax({
        method: "get",
        url: "/api/getUserInfo"
      }).then(res => {
        this.user = res.data;
        resolve(res.data);
      });
    }).then(data => {
      this.$ajax({
        method: "post",
        url: "/api/getAllAnwser",
        data: {
          questionId: this.$route.query.questionId,
        }
      }).then(res => {
          if (res.data.length == 0) {
              floatMessage("别偷看答案哦!")
              $(".trigger-info").click()
          }
          this.answerlist = res.data
          this.totle = res.data.length
        }).catch(err => {})
    })

    this.$ajax({
        method: "post",
        url: "/api/getQuestion/" + this.$route.query.questionId,
      }).then(res => {
          this.question = res.data
        }).catch(err => {})
  },
  components: {
    AnswerItem
  }
};
</script>

<style scoped>

body {
  font: 14px "Oxygen Mono", "Helvetica Neue", "Helvetica", sans-serif;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #303133;
}
/* ::-webkit-scrollbar {
    display: none; 
    width: 0.1em;
    overflow: auto;
} */
html {
  height: 100%;
}
.answer-list {
  color: #aaaaa9;
  padding: 10px;
}
.CodeMirror {
  font: 20px "Oxygen Mono", Helvetica, Arial, sans-serif;
  height: auto;
}
.cm-s-monokai.CodeMirror {
  background: #1e1f21;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
.answer-top {
  color: #aaaaa9;
  height: 200px;
}
.question-info {
  font-size: 30px;
  font-weight: bold;
  background-color: #1e1f21;
  height: 60px;
  padding: 10px;
}
.question-info-name {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodjob {
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  height: 100px;
  background-color: #1e1f21;
  line-height: 80px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  font-size: 25px;
  color: #67b04b;
}
</style>
