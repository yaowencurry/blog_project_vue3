<template>
  <div class="time text-center">
    <span class="time-now main-color">
      {{
      state.time.dayVal 
      ? `${state.time.hourVal}:${state.time.minVal}:${state.time.senVal}` 
      : ''}}
    </span><br/>
    <span class="time-date main-color">{{
      state.time.dayVal 
      ? `${state.time.yearVal}年${state.time.monthVal}月${state.time.dateVal}日 周${state.time.dayVal}` 
      : ''}}</span>
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
  margin-bottom: 10px;
}
.time-now,
.time-date {
  font-weight: 500;
  /* color: #333; */
}
.time-now {
  display: inline-block;
  font-size: 28px;
}
</style>