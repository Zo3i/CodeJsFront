<template :key="key">
    <div>
        <div class="image">
        
        </div>
    <div class="main">
        
    </div>
    </div>
    
</template>

<script>
  import NProgress from 'NProgress'
  import * as types from '@/store/types'
export default {
  name: "Index",
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  },
  beforeCreate() {
  },
  created() {
  },
  components: {}
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
  min-height: calc(100vh - 160px);
}

.main {
    margin-top: 20px;
    width: 100%;
    height: 800px;
    background-color: cadetblue;
}

</style>
