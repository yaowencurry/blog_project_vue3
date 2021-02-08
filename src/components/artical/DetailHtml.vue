<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  name: 'DetailHtml',
  props: {
    content: String
  }
}

</script>
<style src="../../assets/style/markdown.css"  scoped>
</style>