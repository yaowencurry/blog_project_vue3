<template>
  <div class="w-flex container">
    <span class="main-active-color">{{data.city}}</span>
    <span class="main-active-color">{{data.date}}</span>
    <span class="main-active-color">{{data.wea}}</span>
    <span class="main-active-color">实时温度：{{data.tem}}℃</span>
    <span class="main-active-color">天气建议：{{data.air_tips}}</span>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    // this.getWeather();
  },
  methods: {
    getWeather () {
      this.$api.getWeatherInfo({
        version: 'v61',
        appid: '41949958',
        appsecret: 'snu44pIY'
      }).then(res => {
        res && (this.data = res.data);
      })
    }
  }
}

</script>
<style  scoped>
.container {
  position: sticky;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  margin-bottom: 20px;
  background-color: #222222;
  z-index: 100;
}
</style>