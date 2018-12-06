<template>
  <div>
    <h1>hello</h1>
    <textarea id="code" ref="code"></textarea>
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
      editor:{}
    };
  },
  methods: {
    init() {
      var that = this
      this.editor = CodeMirror.fromTextArea(this.$refs.code, {
        theme: "monokai",
        mode: "text/javascript",
        readOnly: true
      });
      var editor = this.editor;
      editor.setSize('auto','auto');
    }
  },
  mounted() {
    this.init()

  },
  beforeCreate() {

  },
  created() {
    this.$ajax({
          method: 'post',
          url: '/getAllAnwser',
          data: {
            questionId:"1059605785811202048"
          }
      }).then (res => {
          console.log(res)
          this.editor.setValue(res.data[0].answer)
      }).catch(err => {

      })
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
</style>
