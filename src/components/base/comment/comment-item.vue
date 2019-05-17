<template>
  <div class="comment-main">
      <div style='font-size:18px;margin-bottom:10px;'>
          <span @click="goZone()">
            <img :src="faceImage" width='50px' height='50' style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;"> {{comment.fromName}} 
          </span>
      </div>
      <div v-if="comment.toUserId.length == 0" class="comment-item">
            <p>于 {{comment.createTime}} 留言:</p>
            <span>{{comment.comment}}</span>
      </div>
      <div v-else class="comment-item">
            <p>于 {{comment.createTime}} 回复 {{comment.toName}}:</p>
            <span>{{comment.comment}}</span>
      </div>
      <span @click="replyshow"><button class="login" style="margin-top:10px;">回复</button></span>
      <div v-if="show" class="comment-reply">
        <input type="text" placeholder="说点什么吧..." class="comment" name="comment" :id="'comment' + index"/> 
        <input type="button" class="login" value="提交" @click="submit()" />
      </div>
      <br><br><hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        comment: {
         type: Object
        },
        index: {
            type: Number
        },
        fromToken: {
            type: String
        }

    },
     data () {
        return {
            faceImage: '',
            show: false
        };
    },
    methods: {
        replyshow () {
            this.show = !this.show
        },
        submit () {
            var comment = $('#comment' + this.index).val()
            var zoneId = this.comment.zone
            var fromUserId = this.comment.fromUserId
            this.$ajax({
                method: "post",
                url: "/api/leaveComment",
                data: {
                   comment: comment,
                   zone: zoneId,
                   toUserId: fromUserId,
                   token: this.fromToken,
                }
            }).then(res => {
                floatMessage(res.data)
                $(".trigger-info").click()
                //不刷新界面,重新读取数据
                var url = this.$route.path + '?zoneId=' + this.$route.query.zoneId + '&rand=' + Math.random()
                this.$router.push(url)
            });
            this.show = !this.show
        },
        goZone() {
             this.$router.push('/user/zone?zoneId=' + this.comment.zone + "&rand=" + Math.random())
        }
    },
    mounted() {
    this.faceImage = "../static/image/face/" + Math.floor(Math.random() * 27 + 1) + ".png";  
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
    .comment-main {
        color: #aaaaa9;
        padding: 20px;
    }
    .comment-item {
        background-color: rgb(28, 26, 23);
        padding: 10px;
        font-size: 20px;
     
    }
    a:active, a:hover {
        text-decoration:none;
        color: #eceff1;
        cursor: pointer;
    }
    .comment-reply {
        margin-top: 10px;
    }
    .comment {
        font-size: 20px;
    }
</style>
