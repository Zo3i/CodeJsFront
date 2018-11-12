<template>
    <div>
            <div class="top">
                <div class="main-left">
                  <p style="font-size: 20px;font-weight: bold;color: whitesmoke">QUESTION: {{randomQuestion.name}}</p>
                  <hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>
                <div>
                    {{randomQuestion.description}}
                </div>
                </div>
                <div class="main-right">
                    <textarea id="code" ref="code"></textarea>
                </div>
            </div>
            <div class="below">
                <div class="result">
                  <template v-show="flag">
                    <div ref="result">
                      <p style="font-size: 20px;font-weight: bold;color: whitesmoke">RESULT:</p>
                      <ol v-html="result" style="list-style-type: square">
                      </ol>
                    </div>
                  </template>
                  <div id="error" ref="error" v-show="!flag"></div>
                </div>
                <div class="task">
                  <p style="font-size: 20px;font-weight: bold;color: whitesmoke">TASKS:</p>
                      <ol ref="task">
                        <li v-for="task in tasks" :key = task.id>
                          {{task.task}}
                          <hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>
                        </li>
                      </ol>
                      <div class="submit">
                        <div class="check">
                          <button @click="cal()" v-if="cheked" style="background-color:#3c7dba;width:80px;border-radius:6px;border-color:#3c7dba;color:#303133">run</button>
                          <button v-else style="background-color:rgba(0,0,0,0.2);width:80px;border-radius:6px;border-color:#3c7dba;color:#4467ab">提交</button>
                        </div>
                      </div>
                </div>
            </div>
    </div>
</template>

<script>
  import NProgress from 'NProgress'
export default {
  name: "Index",
  data() {
    return {
      result: "",
      consoleRes: "",
      editor: {},
      treeData: [],
      randomQuestion: {},
      tasks: {},
      flag: true,
      cheked: true,
      right: 0,
      submitPay:""
    };
  },
  methods: {
    init() {
      var that = this
      this.editor = CodeMirror.fromTextArea(this.$refs.code, {
        lineNumbers: true,
        styleActiveLine: true,
        theme: "monokai",
        mode: "text/javascript",
        indentWithTabs: true,
        autofocus: true,
        matchBrackets: true,
        lineWrapping: true,
        completeSingle: false,
        // scrollbarStyle: null, //null隐藏滚动条
        extraKeys: {
          "Ctrl-Q": "autocomplete"
        } //
      });
      var editor = this.editor;
      editor.setSize('auto','400px');
      // editor.setValue("//your code here");
      editor.setOption("extraKeys", {
        // Tab键换成4个空格
        Tab: function(cm) {
          var spaces = Array(cm.getOption("indentUnit") + 1).join("   ");
          cm.replaceSelection(spaces);
        },
        // F11键切换全屏
        F11: function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen", true));
        },
        // Esc键退出全屏
        Esc: function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      });
      editor.on("change", function (){
        that.codeChange()
      })
    },
    cal() {
      //初始化
      this.right = 0
      this.flag = true
      var task = this.randomQuestion.questionTasksList
      var that = this
      this.result = ""
      this.consoleRes = ""
      var editor = this.editor
      var temp = ""
      for (var i in task) {
        var func = task[i].task.split("=")[0]
        var answer = task[i].task.split("=")[1]
        console.oldLog(func)
        try {
          temp = eval(editor.getValue() + func)
          console.oldLog(answer.replace(temp, ''))
          if (answer.replace(temp, '').trim() == '""'
              || answer.replace(temp, '').trim() == "''"
              || answer.replace(temp, '').trim() == '' ) {
            //累计正确答案的数量
            this.right++
            that.result += "<li style='color:#67b04b;font-size: 22px'>正确!</li>"
            that.result += "<hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>"
          } else {
            that.result +=
              "<li>我们希望得到的答案是:  " + answer + "</li>" + " <li style='color:#bb1b19'>您的答案是:  " + temp + "</li>";
            that.result += "<hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>"
          }
        } catch (ex) {
          //处理异常事件
          that.flag = false
          this.treeData = [
            {
              text: "Catch Error(部分信息，可能因浏览器而异)",
              nodes: [
                {
                  text: "Error message",
                  nodes: [
                    {
                      text: ex.message,
                      color: "#bb1b19"
                    }
                  ]
                },
                {
                  text: "Error name",
                  nodes: [
                    {
                      text: ex.name,
                      color: "#bb1b19"
                    }
                  ]
                }
              ]
            }
          ];
          $("#error").treeview({ data: this.treeData });
        }
      }
      if (this.right == task.length) {
        this.cheked = false
      }
    },
    log(str) {
      this.consoleRes += str + "\r\n";
    },
    codeChange() {
      this.cheked = true
    }
  },
  mounted() {
    var that = this;
    this.init();
    //获取随机问题
    var editor = this.editor;

     this.$ajax({
          method: 'post',
          url: '/getRandomQuestion',
      }).then (res => {
          this.randomQuestion = res.data
          console.oldLog(res)
          //设置题目
          editor.setValue(res.data.questionInit);
          //设置全局task
          that.tasks = res.data.questionTasksList
      }).catch(err => {

      })
    console.log = this.log;
  },
  beforeCreate() {
    //替换console
    console.oldLog = console.log;
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
  display: flex;
  flex-direction: column;
  background-color: #303133;
}
html {
    height: 100%;
}
.CodeMirror {
  font: 20px "Lucida Grande", Helvetica, Arial, sans-serif;
}


.main-left {
  letter-spacing: 0.1em;
  overflow :auto;
  flex-grow: 1;
  color: #fcf5ed;
  background-color: #1f2020;
  /* background-clip: content-box; */
  padding: 20px;
  width: 50%;
  height: 400px;
  margin: 10px;
}
.main-right {
  flex-grow: 1;
  width: 50%;
  height: 400px;
  margin: 10px;
}
.result {
  margin: 10px;
  height: 400px;
  width: 50%;
  padding: 10px;
  flex-grow: 1;
  overflow: auto;
}
.task {
  color: #fcf5ed;
  height: 200px;
  width: 50%;
  padding: 10px;
  flex-grow: 1;
}
.top{
    display: flex;
}
.below {
    display: flex;
}
#error {
    background-color: #3c3c3c;
    color: black
}
.result{
  color: white;
  background-color: #1f2020
}

::-webkit-scrollbar {
  display: block;
  width: 0.5em;
  overflow: auto;
  height: 2em;

}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(48,49,51, 0.3);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 6px rgba(242,242,242, 0.5);
}
.task{
  background-color: black;
  font-size: 20px;
  height: 400px;
  padding: 10px;
  margin: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.submit{
  margin-top: auto;
  /* push to bottom */
  align-self: flex-start;
  /* collapse to own width */
  margin-left: auto;
  /* centering */
  margin-right: auto;
}
.questionName {
  background-color: #77f93a;
}

</style>
