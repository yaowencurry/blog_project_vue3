<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  name: 'FunctionDetail',
  props: {
    content: {
      type: String
    }
  }
}

</script>
<style src="../../../assets/style/markdown.css"  scoped>
</style>