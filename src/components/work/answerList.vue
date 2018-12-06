<template>
  <div>
    <div class="top">
      恭喜-----
    </div>
    <br>
    <div id = "answer">
      大佬的最佳实践
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
            $('#answer').append("<textarea id='answer-item"+ index +"'></textarea><br>")
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
.CodeMirror {
  font: 20px "Oxygen Mono", Helvetica, Arial, sans-serif;
  height: auto;
}
.CodeMirror-scroll {
  height: auto;
  overflow-y: hidden;
  overflow-x: auto;
}
.top{
  color: antiquewhite
}
</style>
