<template>
  <div>
    <div
      ref="editor"
      style="text-align:left"
    ></div>
    <!-- <button v-on:click="getContent">查看内容</button> -->
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
  watch: {
    editorContent (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    getContent: function () {
      alert(this.editorContent)
    }
  }
}

</script>
<style  scoped>
</style>
