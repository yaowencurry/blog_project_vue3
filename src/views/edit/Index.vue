<template>
  <div class="edit">
    <div class="edit-title">
      <el-input
        class="edit-title-input"
        placeholder="请输入文章标题..."
        v-model="title"
      ></el-input>
      <div class="edit-title-btn" @click="handleConfirm">立即发布</div>
    </div>
    <div class="edit-artical">
      <div class="edit-input" @click="handleClick">
        <el-input
          type="textarea"
          ref="editInput"
          resize="none"
          :autosize="true"
          v-model="markDownCode"
          @input="editMarkDown"
        ></el-input>
      </div>
      <div v-html="markDownHtml" class="markdown"></div>
    </div>
    <div class="edit-footer">
      <a href="https://www.runoob.com/markdown/md-title.html" target="__blank"
        >了解markDown书写</a
      >
    </div>
    <el-dialog title="确定提交吗？" v-model="dialogVisible" width="30%">
      <el-input
        v-model="detail"
        type="textarea"
        placeholder="请填写文章摘要..."
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import showdown from "showdown";
import { ElInput, ElDialog } from "element-plus";
import { ref, onMounted } from "vue";
import { mapMutations } from "vuex";
import "@/assets/style/markdown.css";

export default {
  name: "ArticalEdit",
  components: {
    ElInput,
    ElDialog,
  },
  setup() {
    const markDownHtml = ref("");
    const markDownCode = ref("");
    const title = ref("");
    const detail = ref("");
    const dialogVisible = ref(false);
    var converter = new showdown.Converter();
    function editMarkDown(code) {
      markDownHtml.value = converter.makeHtml(code);
    }
    onMounted(() => {
      markDownCode.value =
        "*** \n# 一级标题 \n## 二级标题 \n### 三级标题\n`printf()`\n*斜体文本*\n_斜体文_\n**粗体文本**__粗体文本__\n***粗斜体文本***___粗斜体文本___\n```javascript\n$(document).\nready(function () {\n alert(123);\n});\n``` ";
    });
    return {
      markDownHtml,
      markDownCode,
      editMarkDown,
      title,
      dialogVisible,
      detail,
    };
  },
  methods: {
    ...mapMutations(["SAVE_ARTICAL"]),
    handleClick() {
      this.$refs.editInput.focus();
    },
    handleConfirm() {
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.dialogVisible = false;
      const data = {
        title: this.title,
        author: "姚文",
        count: String(parseInt(Math.random() * 1000)),
        readtimer: parseInt(Math.random() * 10),
        content: this.markDownHtml,
        originmarkdown: this.markDownCode,
        desc: this.detail
      };
      this.submitData(data)
    },
    submitData(data) {
      this.$api
      .ADD_ARTICAL(data)
      .then((res) => {
        if(res) {
          this.$router.push({name:'HomeIndex'})
        }
      });
    }
  },
};
</script>
<style src="../../assets/style/markdown.css"  scoped></style>
<style scoped>
.edit {
  width: 100%;
}
.edit-footer {
  border-top: 1px solid #e0e0e0;
  height: 20px;
  line-height: 20px;
  padding-left: 20px;
  box-sizing: border-box;
}
.edit-title :deep(.el-input__inner) {
  border: none;
  color: #333;
  font-weight: 700;
  font-size: 24px;
}
.edit-title-btn {
  width: 160px;
  height: 40px;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  background-color: #3a9efc;
  color: #fff;
  line-height: 40px;
}
.edit-title-input {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}
.edit-title {
  width: 100%;
  height: 50px;
  /* padding-right: 20px; */
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.edit-artical {
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.edit-input {
  width: 48%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  cursor: text;
  overflow: auto;
  box-sizing: border-box;
}
.edit-artical :deep(.el-textarea__inner) {
  border: none;
  height: 100%;
  font-size: 16px;
  color: #333;
  font-family: 微软雅黑;
}
.markdown {
  width: 49%;
  box-sizing: border-box;
  overflow: auto;
  padding: 30px 30px 0 0;
}

@media screen and (max-width: 480px) {
  .edit-artical {
    flex-direction: column;
  }
  .edit-input {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
  }
  .markdown {
    width: 100%;
    padding: 20px;
  }
}
</style>