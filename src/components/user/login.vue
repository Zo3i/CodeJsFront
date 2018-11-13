<template>
    <div >
        <img src="https://source.unsplash.com/random/1200x400" alt="" />
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import Unsplash from 'unsplash-js';
export default {
  name: "Index",
  data() {
    return {
      imgUrl :""
    };
  },
  methods: {

  },
  mounted() {
    const unsplash = new Unsplash({
        applicationId: "{32305f8c7e7ba17539c2d6ecdf134224f1c1b1f2ea4bd4148f7ae1998397db9a}",
        secret: "{01c7ded43e497a2cd3d09adc6b3970a48bd8b3b5204c99889feca0124bdbfca5}",
        callbackUrl: "{urn:ietf:wg:oauth:2.0:oob}"
    });
    unsplash.photos.getRandomPhoto({ username: "naoufal" })
    .then(json => {
        console.log(json)
        this.imgUrl = json.url
    });
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
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
    height: 100%;
}

</style>
