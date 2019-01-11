<template :key="key">
    <div ref="box">
        <div class="image"></div>

        <div class="container">
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
        </div>


        <div class="main">
            <div class="leave-comment">
                <div id="comment-form">
                    <input type="text" placeholder="说点什么吧..." id="comment" name="comment"/>
                    <input type="hidden" id = "touser" name="touser" >
                    <input type="button" value="提交" @click="submit()" />
                </div>
            </div>
            <div class="comment" v-for="(item, index) in commentList" v-bind:key="item.id">
                <commentItem :comment="item" :index="index" :fromMobile="user.mobile" :key="index"></commentItem>
            </div>
        </div>
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import * as types from '@/store/types'
  import CommentItem from '@/components/base/comment/comment-item'
export default {
  name: "Index",
  data() {
    return {
        face : '../static/image/face/1.png',
        user: {},
        zoneId: '',
        commentList: [],
    };
  },
  methods: {
      submit () {
            // console.log($('#comment-form').serializeArray());
            var comment = $('#comment').val()
            var touser = $('#touser').val()
            this.$ajax({
                method: "post",
                url: "/api/leaveComment",
                data: {
                   comment: comment,
                   zone: this.zoneId,
                   toUserId: touser,
                   fromMobile: this.user.mobile
                }
            }).then(res => {
                console.log(res)
                floatMessage(res.data)
                $(".trigger-info").click()  
            });
      }

  },
  mounted() {
      //获取用户信息
      this.$ajax({
        method: "get",
        url: "/api/getUserInfo"
      }).then(res => {
        this.user = res.data;
      });
      this.zoneId = this.$route.query.zoneId


    new Promise(resolve => {
        this.$ajax({
            method: "get",
            url: "/api/getComment?zoneId=" + this.zoneId
        }).then(res => {
            this.commentList = res.data
            console.log(res)
            resolve()
        });
    }).then(data => {
      })
  },
  beforeCreate() {
  },
  created() {
  },
  components: {
      CommentItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face{
    font-family: 'Oxygen Mono';
    src : url('../../../static/font/OxygenMono-Regular.ttf');
}
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;


  display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
}
html {
    height: 100%;
}

.image {
  background-image: url("https://source.unsplash.com/random");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.0001);
  width: 100%;
  min-height: calc(100vh - 180px);
}

.main {
    margin-top: 40px;
    width: 100%;
    /* height: 800px; */
    background-color: #262729;
}
.title {
    font-size: 30px;
    text-align: center;
}
#comment-form {
    padding: 20px;
    font-size: 20px;
    text-align: center
}



.container {
    position: relative;
    width: 24px;
    height: 24px;
}
.chevron {
    position: absolute;
    width: 28px;
    height: 8px;
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
    animation: move 3s ease-out infinite;
}
.chevron:first-child {
    animation: move 3s ease-out 1s infinite;
}
.chevron:nth-child(2) {
    animation: move 3s ease-out 2s infinite;
}
.chevron:before,
.chevron:after {
    content: ' ';
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: #fff;
}
.chevron:before {
    left: 0;
    transform: skew(0deg, 30deg);
}
.chevron:after {
    right: 0;
    width: 50%;
    transform: skew(0deg, -30deg);
}
@keyframes move {
    25% {
        opacity: 1;
    }
    33% {
        opacity: 1;
        transform: translateY(30px);
    }
    67% {
        opacity: 1;
        transform: translateY(40px);
    }
    100% {
        opacity: 0;
        transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
    }
}
.text {
    display: block;
    margin-top: 75px;
    margin-left: -30px;
    font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: .25;
    animation: pulse 2s linear alternate infinite;
}
@keyframes pulse {
    to {
        opacity: 1;
    }
}


</style>
