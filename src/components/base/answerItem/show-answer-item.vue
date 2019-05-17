<template>
  <div class="loading">
      <div style='font-size:18px;margin-bottom:10px;cursor: pointer;' >
<!--          <img :src="faceImage" @click="goCenter()" width='50px' height='50' style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;"> {{answer.name}}-->
        <div class="question-des1">问题：{{answer.questionName}} | 分数：{{answer.score}} | 完成人数： {{answer.completeCount}}</div>
      </div>
      <textarea :id = "'answer-item' + key"></textarea>
      <div style='padding:10px;font-size:20px;font-weight:bold'>
        <img v-show="isLike" @click="dislike()" class='like' :src="likeImage"  width='15px' height='15px' />
        <img v-show="!isLike" @click="like()" class='dislike'  :src='disLikeImage'  width='15px' height='15px' />
        <span style='padding:1px'>{{totalLike}}</span>
        <img v-show="isCollect" :src="collectImage" @click="disCollect()"  class='collect' width='15px' height='15px'>
        <img  v-show="!isCollect" :src="discollectImage" @click="collect()" class='discollect' width='15px' height='15px'>
        <span style='padding:1px'>{{totalCollect}}</span>
        <a :href="'#/work?id=' + questionId" class="question" @click="seeQuestion">查看问题</a> &nbsp;|&nbsp; <a :href="'#/work/answerList?questionId=' + questionId" class="question" @click="seeAnswer">所有答案</a>
      </div>
      <br><br><hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        answer: {
         type: Object
        },
        start: {
            type: Number
        },
        end: {
            type: Number
        }
    },
     data () {
        return {
            index: '',
            faceImage: '',
            isLike: false,
            isCollect: false,
            totalCollect: '',
            totalLike: '',
            likeImage: '../static/image/like.png',
            disLikeImage: '../static/image/dislike.png',
            collectImage: '../static/image/collect.png',
            discollectImage: '../static/image/discollect.png',
            currentUser: {},
            author: {},
            questionId: ''
        };
    },
    methods: {
        init() {
            var that = this;
            var editor = CodeMirror.fromTextArea(document.getElementById("answer-item" + this.key), {
                theme: "monokai",
                mode: "text/javascript",
                readOnly: true
            });
            editor.setValue(this.answer.answer);
            editor.setSize("auto", "auto");
        },
        collect () {
            this.isCollect = !this.isCollect
            this.totalCollect += 1
            this.$ajax({
                url: "/api/collect",
                method: "post",
                data: {
                    mobile: this.currentUser.mobile,
                    authorid: this.authorId,
                    answerid: this.answer.id
                }
            }).then(res => {
                console.log("succee")
            })
        },
        disCollect () {
            this.isCollect = !this.isCollect
            this.totalCollect -= 1
            this.$ajax({
                url: "/api/discollect",
                method: "post",
                data: {
                    mobile: this.currentUser.mobile,
                    authorid: this.authorId,
                    answerid: this.answer.id
                }
            }).then(res => {
                console.log("succee")
            })
        },
        like () {
            this.isLike = !this.isLike
            this.totalLike += 1
            this.$ajax({
                url: "/api/like",
                method: "post",
                data: {
                    mobile: this.currentUser.mobile,
                    authorid: this.authorId,
                    answerid: this.answer.id
                }
            }).then(res => {
                console.log("succee")
            })
        },
        dislike () {
            this.isLike = !this.isLike
            this.totalLike -= 1
            this.$ajax({
                url: "/api/dislike",
                method: "post",
                data: {
                    mobile: this.currentUser.mobile,
                    authorid: this.authorId,
                    answerid: this.answer.id
                }
            }).then(res => {
                console.log("succee")
            })
        },
        seeQuestion() {
            this.$router.push('/work?id=' + this.questionId)
        },
        seeAnswer () {
            this.$router.push('/work/answerList?questionId=' + this.questionId)
        },
        goCenter() {
            // console.log(this.answer)
            this.$router.push('/user/zone?zoneId='+ this.answer.zoneId)
        }
    },
    mounted() {
     this.isLike = this.answer.like 
     this.isCollect = this.answer.collect
     this.totalCollect = this.answer.totalCollect
     this.totalLike = this.answer.totalLike
     this.currentUser = JSON.parse(localStorage.user)
     this.authorId = this.answer.userId
     this.questionId = this.answer.questionId
     this.faceImageId = localStorage.userFaceId
     if (this.answer.userMobile == this.currentUser.mobile) {
         this.faceImage = "../static/image/face/" + localStorage.userFaceId + ".png";
     } else {
         this.faceImage = "../static/image/face/" + Math.floor(Math.random() * 27 + 1) + ".png";
     }
     this.init()
    },
    computed: {
       key: {
        // 计算属性:
        get () {
           return Math.floor(Math.random() * 9999999999999)
        },
        set () {
        }
      }
     }

}
</script>
<style>
    .question {
        color: #75757f;
        text-decoration: none;
    }
    a:active, a:hover {
        text-decoration:none;
        color: #eceff1;
        cursor: pointer;
    }
    .like {
        cursor: pointer;
    }
    .dislike {
        cursor: pointer;
    }
    .collect {
        cursor: pointer;
    }
    .discollect {
        cursor: pointer;
    }
   .question-des1 {
     font-size: 20px;
     font-weight: bold;
   }

</style>
