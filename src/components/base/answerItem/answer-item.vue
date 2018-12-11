<template>
  <div class="loading">
      <div style='font-size:18px;margin-bottom:10px;'>
          <img :src="faceImage" width='50px' height='50'> {{answer.user.name}}
      </div>
      <textarea :id = "'answer-item' + answer.id"></textarea>
      <div style='padding:10px;font-size:20px;font-weight:bold'>
        <img class='like' :src='like' @click="changeLike" width='15px' height='15px'>
        <span style='padding:1px'>{{totalLike}}</span>
        <img  :src="collect" @click="changeCollect"  width='15px' height='15px'>
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
     }
    },
     data () {
        return {
            index: '',
            faceImage: '',
            isLike: '',
            isCollect: '',
            totalCollect: '',
            totalLike: '',
            like: '',
            collect: '',
            likeImage: '../static/image/like.png',
            dislikeImage: '../static/image/dislike.png',
            collectImage: '../static/image/collect.png',
            discollectImage: '../static/image/discollect.png'
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
        changeCollect () {
            this.isCollect = !this.isCollect
            if (this.isCollect) {
                this.collect = this.collectImage
                this.totalCollect += 1
            } else {
                this.collect = this.discollectImage
                this.totalCollect -= 1
            }
        },
        changeLike () {
            this.isLike = !this.isLike
            if (this.isLike) {
                this.like = this.likeImage
                this.totalLike += 1
            } else {
                this.like = this.dislikeImage
                this.totalLike -= 1
            }
        }
    },
    mounted() {
     console.log(this.answer)
     this.faceImage = "../static/image/face/" + Math.floor(Math.random() * 27 + 1) + ".png";
     this.isLike = this.answer.like 
     this.like = this.isLike ? this.likeImage : this.dislikeImage
     this.isCollect = this.answer.collect
     this.collect = this.isCollect ? this.collectImage : this.discollectImage
     this.totalCollect = this.answer.totalCollect
     this.totalLike = this.answer.totalLike
     this.init()
    },

}
</script>
<style>

</style>
