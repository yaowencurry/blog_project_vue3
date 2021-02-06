<template>
  <el-select
    v-model="data"
    style="width: 100%;margin-top: 15px;"
    :placeholder="'请选择'+title"
  >
    <el-option
      v-for="item in options"
      :key="item[valueName]"
      :label="item[labelName]"
      :value="item[valueName]"
    ></el-option>
  </el-select>
</template>

<script>
import { ElSelect, ElOption } from "element-plus";

export default {
  components: {
    ElSelect,
    ElOption
  },
  props: {
    title: {
      type: String
    },
    options: {
      type: Array
    },
    value: {
      type: String
    },
    labelName: {
      type: String,
      default: 'label'
    },
    valueName: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      data: ''
    }
  },
  watch: {
    value: {
      handler (newVal) {
        if(!newVal) return
        this.data = newVal;
      },
      immediate: true
    },
    data: {
      handler (newVal) {
        this.$emit('update:value', newVal)
      }
    },
    labelName(newVal) {
      console.log(newVal);
    }
  },
}

</script>
<style scoped>
</style>