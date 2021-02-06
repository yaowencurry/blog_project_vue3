<template>
  <div class="height-full-screen main-bg w-flex flex-center">
    <el-input
      placeholder="请输入内容"
      v-model="password"
      class="input-with-select"
      style="width: 75%"
    >
      <template #append>
        <el-button
          type="primary"
          @click="handlePassword"
        >确认</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  name: 'AdminCheck',
  data () {
    return {
      password: ''
    }
  },
  methods: {
    handlePassword () {
      if (this.password === '000000') {
        this.$emit('update:value', '1')
        this.$store.commit('SAVE_IS_ADMIN', '1');
      } else {
        ElMessage.error({ message: '密码错误，管理员用户才可以提交文章', duration: 1000 })
      }
    },
  }
}

</script>
<style scoped>
</style>