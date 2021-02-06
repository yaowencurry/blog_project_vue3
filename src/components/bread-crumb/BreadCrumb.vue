<template>
  <div class="bread-crumb">
    <el-breadcrumb
      separator="/"
      class="main-color"
    >
      <el-breadcrumb-item
        :to="{ name: 'HomeIndex' }"
        class="main-color"
      >首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{routeName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export default {
  name: 'bread-crumb',
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem
  },
  computed: {
    routeName () {
      return this.$route.meta.title
    }
  }
}

</script>
<style  scoped>
.bread-crumb .el-breadcrumb {
  font-size: 16px;
}
span {
  font-size: 16px;
}
@media (prefers-color-scheme: dark) {
  :deep(.el-breadcrumb__inner.is-link) {
    color: #fff;
  }
}
</style>
