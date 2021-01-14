<template>
  <div class="time">
    <span class="time-date">{{
      state.time.dayVal 
      ? `${state.time.yearVal}年${state.time.monthVal}月${state.time.dateVal}日 周${state.time.dayVal}` 
      : ''}}</span>
    <span class="time-now">
      {{
      state.time.dayVal 
      ? `${state.time.hourVal}:${state.time.minVal}:${state.time.senVal}` 
      : ''}}
    </span>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';

export default {
  name: 'MyTime',
  setup () {
    const state = reactive({
      time: {
        yearVal: '--',
        monthVal: '',
        dateVal: '',
        hourVal: '',
        minVal: '',
        senVal: '',
        dayVal: ''
      }
    })
    const dayList = ['日', '一', '二', '三', '四', '五', '六'];
    onBeforeMount(() => {
      setInterval(() => {
        const nowDate = new Date();
        state.time.yearVal = nowDate.getFullYear();
        state.time.monthVal = nowDate.getMonth() + 1;
        state.time.dateVal = nowDate.getDate();
        state.time.hourVal = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
        state.time.minVal = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
        state.time.senVal = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
        state.time.dayVal = dayList[nowDate.getDay()];
      }, 1000);
    })
    return {
      state
    }
  }
}

</script>
<style scoped>
.time {
  position: sticky;
  top: 0;
  height: 40px;
  margin-bottom: 10px;
  text-align: center;
  background: #fafafa;
  line-height: 40px;
  box-shadow: 1px 2px 9px 1px rgba(0, 0, 0, 0.1);
}
.time-now,
.time-date {
  font-weight: 500;
  color: #3f84f1;
}
.time-now {
  display: inline-block;
  width: 70px;
}
</style>