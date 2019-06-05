<!--<template>-->
<!--  <div class="main">-->
<!--    <el-row type="flex" justify="center">-->
<!--      <el-col :xs="12" :sm="16" :md="14" :lg="12" :xl="10">-->
<!--        <div class="main-left">-->
<!--          <el-col :xs="12" :sm="16" :md="14" :lg="12" :xl="10">-->
<!--            <div class="main-left-question-name">-->
<!--              <span>问题题目：</span>-->
<!--              <input type="text" class="name" id="name">-->
<!--            </div>-->
<!--            <div class="main-left-question-socre">-->
<!--              <span>问题分数：</span>-->
<!--              <input type="text" class="score" id="score">-->
<!--            </div>-->
<!--            <div class="main-left-question-des">-->
<!--              <span>问题简介：</span>-->
<!--              <textarea name="description" id="description" cols="30" rows="10"></textarea>-->
<!--            </div>-->
<!--            <div class="main-left-question-tasks"></div>-->
<!--          </el-col>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="12" :sm="16" :md="14" :lg="12" :xl="10">-->
<!--        <div class="main-right">-->
<!--          <p>初始化问题代码：</p>-->
<!--          <el-row type="flex" justify="center">-->
<!--            <textarea id="precode" ref="precode"></textarea>-->
<!--          </el-row>-->
<!--          <br>-->
<!--          <p>正确代码：</p>-->
<!--          <el-row type="flex" justify="center">-->
<!--            <textarea id="result" ref="result"></textarea>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import NProgress from "NProgress";-->
<!--export default {-->
<!--  name: "Index",-->
<!--  data() {-->
<!--    return {-->
<!--      precodeEditor: {},-->
<!--      resultEditor: {}-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    init() {-->
<!--      var that = this;-->
<!--      this.precodeEditor = CodeMirror.fromTextArea(this.$refs.precode, {-->
<!--        lineNumbers: true,-->
<!--        styleActiveLine: true,-->
<!--        theme: "monokai",-->
<!--        mode: "text/javascript",-->
<!--        indentWithTabs: true,-->
<!--        autofocus: true,-->
<!--        matchBrackets: true,-->
<!--        lineWrapping: true,-->
<!--        completeSingle: false,-->
<!--        // scrollbarStyle: null, //null隐藏滚动条-->
<!--        extraKeys: {-->
<!--          "Ctrl-Q": "autocomplete"-->
<!--        } //-->
<!--      });-->
<!--      var precodeEditor = this.precodeEditor;-->
<!--      precodeEditor.setSize("100%", "200px");-->
<!--      // editor.setValue("//your code here");-->
<!--      precodeEditor.setOption("extraKeys", {-->
<!--        // Tab键换成4个空格-->
<!--        Tab: function(cm) {-->
<!--          var spaces = Array(cm.getOption("indentUnit") + 1).join("  ");-->
<!--          cm.replaceSelection(spaces);-->
<!--        },-->
<!--        // F11键切换全屏-->
<!--        F11: function(cm) {-->
<!--          cm.setOption("fullScreen", !cm.getOption("fullScreen", true));-->
<!--        },-->
<!--        // Esc键退出全屏-->
<!--        Esc: function(cm) {-->
<!--          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);-->
<!--        }-->
<!--      });-->

<!--      this.resultEditor = CodeMirror.fromTextArea(this.$refs.result, {-->
<!--        lineNumbers: true,-->
<!--        styleActiveLine: true,-->
<!--        theme: "monokai",-->
<!--        mode: "text/javascript",-->
<!--        indentWithTabs: true,-->
<!--        autofocus: true,-->
<!--        matchBrackets: true,-->
<!--        lineWrapping: true,-->
<!--        completeSingle: false,-->
<!--        // scrollbarStyle: null, //null隐藏滚动条-->
<!--        extraKeys: {-->
<!--          "Ctrl-Q": "autocomplete"-->
<!--        } //-->
<!--      });-->
<!--      var resultEditor = this.resultEditor;-->
<!--      resultEditor.setSize("100%", "400px");-->
<!--      // editor.setValue("//your code here");-->
<!--      resultEditor.setOption("extraKeys", {-->
<!--        // Tab键换成4个空格-->
<!--        Tab: function(cm) {-->
<!--          var spaces = Array(cm.getOption("indentUnit") + 1).join("  ");-->
<!--          cm.replaceSelection(spaces);-->
<!--        },-->
<!--        // F11键切换全屏-->
<!--        F11: function(cm) {-->
<!--          cm.setOption("fullScreen", !cm.getOption("fullScreen", true));-->
<!--        },-->
<!--        // Esc键退出全屏-->
<!--        Esc: function(cm) {-->
<!--          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);-->
<!--        }-->
<!--      });-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    var that = this;-->
<!--    this.init();-->

<!--  },-->
<!--  beforeCreate() {-->

<!--  },-->
<!--  created() {},-->
<!--  components: {}-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--  body {-->
<!--    font: 14px "Oxygen Mono", "Helvetica Neue", "Helvetica", sans-serif;-->
<!--    min-height: 100%;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    background-color: #303133;-->
<!--  }-->
<!--  .CodeMirror {-->
<!--    font: 20px "Oxygen Mono", Helvetica, Arial, sans-serif;-->
<!--    height: auto;-->
<!--  }-->
<!--  .main{-->
<!--    height: 800px;-->
<!--    background-color: #1f2020;-->
<!--  }-->
<!--  .main-left{-->
<!--    height: 800px;-->
<!--    background-color: #9a9280;-->
<!--  }-->
<!--  .main-right{-->
<!--    height: 800px;-->
<!--    background-color: #c6c2ad;-->
<!--  }-->
<!--</style>-->
