<template>
  <div class="answer-list">
    <div class="top">
      <div class="question-info">
        <el-row>
          <el-col :span="6">
            <div class="question-info-name">
              题目: xxxxxx
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              分数:xxx
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="goodjob">恭喜!</div>
    </div>
    <br>
    <div id = "answer">
    </div>
  </div>
</template>

<script>
  import NProgress from 'NProgress'
  import VueMarkdown from 'vue-markdown';
export default {
  name: "Index",
  data() {
    return {
      answer: {},
      user: {},
    };
  },
  methods: {
    init(className, content) {
      console.log("className=" + className)
      console.log(content)
      console.log('#' + className)
      var that = this
      var editor = CodeMirror.fromTextArea(document.getElementById(className), {
        theme: "monokai",
        mode: "text/javascript",
        readOnly: true
      });
      editor.setValue(content)
      editor.setSize('auto','auto');
    }
  },
  mounted() {
     this.$ajax({
          method: 'post',
          url: '/getAllAnwser',
          data: {
            questionId: this.$route.query.questionId
          }
      }).then (res => {
          res.data.forEach( (element, index) => {
            console.log(element)
            var faceImage = '../static/image/face/' + Math.floor(Math.random() * 27 + 1)  + ".png"
            var mainContant = ""
            mainContant += "<textarea id='answer-item"+ index +"'></textarea>"
            mainContant += "<font-awesome-icon icon='coffee' />"
            mainContant += "<br><br><hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>"
            $('#answer').append("<div style='font-size:18px;margin-bottom:10px;'><img  src='"+ faceImage +"' width='50px' height='50'> xxx</div>")
            $('#answer').append(mainContant)
            this.init('answer-item' + index, element.answer)
          })
      }).catch(err => {

      }) 
  },
  beforeCreate() {

  },
  created() {
  },
  components: {
    VueMarkdown
  }
};
</script>

<style>
@font-face{
    font-family: 'Oxygen Mono';
    src : url('../../../static/font/OxygenMono-Regular.ttf');
}
body {
  font: 14px "Oxygen Mono","Helvetica Neue","Helvetica",sans-serif;
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
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodjob {
  padding: 10px;
  margin-top: 20px;
  font-size: 20px;
  height: 100px;
  background-color: #1e1f21
}
</style>
