<template>
  <div
    id="clock"
    class="m-auto m-bottom-20"
  >
    <ul class="minute">
      <li
        class="minute_item"
        v-for="item in 60"
        :style="{transform: `rotate(${6*item}deg)  translate(60px,50%)`}"
        :key="item"
      ></li>
    </ul>
    <ul class="hour">
      <li
        class="hour_item"
        v-for="item in 12"
        :style="{transform: `rotate(${360/12*item}deg)  translate(60px,50%)`}"
        :key="item"
      ></li>
    </ul>
    <ul class="point">
      <li class="hour"></li>
      <li class="min"></li>
      <li class="sec"></li>
      <li class="circle"></li>
    </ul>
  </div>
</template>
<script>
import { onBeforeUnmount } from 'vue'
export default {
  name: 'Clock',
  mounted () {
    let timer = setInterval(drawpoint, 1000);
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
    var time = new Date();
    var sec = time.getSeconds();
    var min = time.getMinutes();
    var hour = time.getHours();
    var subsec = (360 / 60);//秒针1s旋转6度
    var submin = (360 / 3600);//分针1s旋转0.1度
    var subhour = (360 / 12 / 3600);//时针1s旋转360/12/3600度

    var degsec = (subsec * sec - 90) % 360;//(6*s-90)%360
    var degmin = (submin * (min * 60 + sec) - 90) % 360; //(0.1*(m*60+s)-90)360%
    var deghour = (subhour * (hour * 3600 + min * 60 + sec) - 90) % 360; //防止超过360度的情况
    var _that = this;
    function drawpoint () {
      degsec += (360 / 60);
      degmin += (360 / 3600);
      deghour += (360 / 12 / 3600);

      degsec = degsec >= 360 ? 0 : degsec;
      degmin = degmin >= 360 ? 0 : degmin;
      deghour = deghour >= 360 ? 0 : deghour;
      _that.$nextTick(() => {
        document.body.querySelector(".point li.sec").style.transform = "rotate(" + degsec + "deg)"
        document.body.querySelector(".point li.min").style.transform = "rotate(" + degmin + "deg)"
        document.body.querySelector(".point li.hour").style.transform = "rotate(" + deghour + "deg)"
      })
    }
  }
}

</script>
<style scoped>
li {
  list-style: none;
}
#clock {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #292a37;
}
.minute_item,
.hour_item {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  transform-origin: left center;
}
.minute_item {
  width: 5px;
  height: 2px;
}
.hour_item {
  width: 10px;
  height: 2px;
}
.point li {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  transform-origin: left center;
}

.point li.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.point li.hour {
  width: 35px;
  height: 3px;
  margin-top: -1;
}
.point li.min {
  width: 45px;
  height: 2px;
  margin-top: -1;
}
.point li.sec {
  width: 65px;
  height: 1px;
  margin-top: -1;
}
</style>