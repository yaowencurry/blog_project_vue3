<template>
  <router-link
    style="margin:0;padding:0"
    v-if="$store.state.artical.isAdmin === '1'"
    :to="{name:'EditArtical',query: {articalid}}"
  >
    编辑
  </router-link>
</template>

<script>

export default {
  name: 'EditButton',
  props: {
    articalid: {
      type: String,
      required: true
    }
  }
}

</script>
<style scoped>
</style>