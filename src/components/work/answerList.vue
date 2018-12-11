<template>
  <div class="answer-list">
    <div class="top">
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
      <div v-for="item in answerlist" v-bind:key="item.id">
        <answerItem :answer="item"></answerItem>
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
      page: 1
    };
  },
  methods: {
    load() {
      var that = this
      var begin = (this.page - 1) * 3;
      var end = this.page * 3;
      this.answerlist.some((element, index) => {
        if (index >= begin && index < end) {
          var faceImage =
            "../static/image/face/" +
            Math.floor(Math.random() * 27 + 1) +
            ".png";
          var mainContant = ""
          var isLike = element.isLike
          var isCollect = element.isCollect
          var likeNum = element.totalLike
          var collectNum = element.totalCollect
          var isLikeImg = isLike
            ? "../static/image/like.png"
            : "../static/image/dislike.png"
          var isCollectImg = isCollect
            ? "../static/image/collect.png"
            : "../static/image/discollect.png"
          mainContant += "<textarea id='answer-item" + index + "'></textarea>";
          mainContant +=
            "<div style='padding:10px;font-size:20px;font-weight:bold'><img class='like' data-answer-id="+ element.id +" data-cuser-id="+ that.user.mobile +" data-user-id="+ element.user.id +"  src='" +
            isLikeImg +
            "' width='15px' height='15px'><span style='padding:10px'>" +
            likeNum +
            "</span>  "
          mainContant +=
            "<img  src='" +
            isCollectImg +
            "' width='15px' height='15px'><span style='padding:10px'>" +
            collectNum +
            "</span>  </div>";
          mainContant +=
            "<br><br><hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>";
          $("#answer").append(
            "<div style='font-size:18px;margin-bottom:10px;'><img  src='" +
              faceImage +
              "' width='50px' height='50'> " +
              element.user.name +
              "</div>"
          );
          $("#answer").append(mainContant);
          this.init("answer-item" + index, element.answer)
        }
      });
      var loadBtn =
        '<div  style=" text-align:center"><button id="load" style="background-color:rgba(0,0,0,0.2);width:120px;border-radius:6px;border-color:#3c7dba;color:#84a3cc;font-size:20px">加载更多</button></div>';
      var over =
        '<div style="text-align:center;font-size:18px">######我是有底线的#######<div>';
      if (end >= this.answerlist.length) {
        $("#answer").append(over);
      } else {
        $("#answer").append(loadBtn);
        this.page += 1
      }
      this.$nextTick().then(() => {
      $('#load').on('click',function(){
        that.load()
        $('#load').remove()
     })

     this.$nextTick().then(() => {
       $('.like').on('click', function (e) {
         $(e.currentTarget).attr('src', '../static/image/like.png')
         console.log(e.currentTarget.dataset)
       })
     })
})
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.user)
    console.log(localStorage.user)
    this.$ajax({
      url: "/otherApi/all.json",
      method: "post"
    }).then(res => {
      console.log(res);
      var content = res.data.content;
      var author = res.data.author;
      this.goodjob = content;
    });
  },
  beforeCreate() {},
  created() {
    this.$ajax({
      method: "post",
      url: "/api/getAllAnwser",
      data: {
        questionId: this.$route.query.questionId
      }
    }).then(res => {
        this.question = res.data[0].question;
        this.answerlist = res.data;
        console.log(res.data)
        // this.load();
      }).catch(err => {})
  },
  components: {
    AnswerItem
  }
};
</script>

<style>
@font-face {
  font-family: "Oxygen Mono";
  src: url("../../../static/font/OxygenMono-Regular.ttf");
}
body {
  font: 14px "Oxygen Mono", "Helvetica Neue", "Helvetica", sans-serif;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #303133;
}
html {
  height: 100%;
}
.answer-list {
  color: white;
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
.top {
  color: white;
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
