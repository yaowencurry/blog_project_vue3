<template>
  <div>
    <iframe
      id="iframe"
      width="100%"
      src="https://standardjs.com/rules-zhcn.html#javascript-standard-style"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'BookIndex',
  setup () {
    onMounted(() => {
      const screeHeight = document.documentElement.clientHeight || document.body.clientHeight;

      const iframe = document.getElementById('iframe')
      iframe.height = (screeHeight - 60) + 'px'
    })
  }
}

</script>
<style lang="scss" scoped>
</style>