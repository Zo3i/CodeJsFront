<template>
  <div class="loading">
      <div style='font-size:18px;margin-bottom:10px;'>
          <img :src="faceImage" width='50px' height='50' style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;"> {{answer.user.name}}
      </div>
      <textarea :id = "'answer-item' + answer.id"></textarea>
      <div style='padding:10px;font-size:20px;font-weight:bold'>
        <img v-show="isLike" @click="dislike()" class='like' :src="likeImage"  width='15px' height='15px' />
        <img v-show="!isLike" @click="like()" class='dislike'  :src='disLikeImage'  width='15px' height='15px' />
        <span style='padding:1px'>{{totalLike}}</span>
        <img v-show="isCollect" :src="collectImage" @click="disCollect()"  width='15px' height='15px'>
        <img  v-show="!isCollect" :src="discollectImage" @click="collect()"  width='15px' height='15px'>
        <span style='padding:1px'>{{totalCollect}}</span>  
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
            author: {}
        };
    },
    methods: {
        init() {
            var that = this;
            var editor = CodeMirror.fromTextArea(document.getElementById("answer-item" + this.answer.id), {
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
                    authorid: this.author.id,
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
                    authorid: this.author.id,
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
                    authorid: this.author.id,
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
                    authorid: this.author.id,
                    answerid: this.answer.id
                }
            }).then(res => {
                console.log("succee")
            })
        }
    },
    mounted() {
        console.log(this.answer)
     this.faceImage = "../static/image/face/" + Math.floor(Math.random() * 27 + 1) + ".png";
     this.isLike = this.answer.like 
     this.isCollect = this.answer.collect
     this.totalCollect = this.answer.totalCollect
     this.totalLike = this.answer.totalLike
     this.currentUser = JSON.parse(localStorage.user)
     this.author = this.answer.user
     this.init()
    },

}
</script>
<style>

</style>
