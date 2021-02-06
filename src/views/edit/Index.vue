<template>
  <div
    class="edit"
    @keydown="handleCtrl"
  >
    <template v-if="isAdmin === '1'">
      <div class="edit-title">
        <el-input
          class="edit-title-input"
          placeholder="请输入文章标题..."
          v-model="title"
        ></el-input>
        <div
          class="edit-title-btn main-active-color"
          @click="handleConfirm"
        >立即发布</div>
      </div>
      <div class="w-flex">
        <el-tabs
          v-model="activeName"
          @tab-click="handleChangeType"
        >
          <el-tab-pane
            label="编辑"
            name="edit"
          ></el-tab-pane>
          <el-tab-pane
            label="预览"
            name="prew"
          ></el-tab-pane>
        </el-tabs>
        <div class="w-flex w-50">
          <Select
            style="margin: 0;margin-right: 10px"
            title="草稿文章"
            labelName="title"
            valueName="articalid"
            v-model:value="halfEditArticalId"
            :options="halfArticalList"
          />
          <div
            class="w-flex main-color font-size-12"
            style="min-width: 190px"
          >
            每
            <el-input
              style="width: 50px;text-align:center"
              v-model="autoSave"
            ></el-input>
            分钟自动保存一次草稿
          </div>
        </div>
      </div>
      <div class="edit-artical">
        <div
          class="edit-input"
          @click="handleClick"
          v-if="activeName === 'edit'"
          @keydown.tab="forbidTab($event)"
          @keyup.tab="replaceSpacing()"
        >
          <el-input
            id="edit-input"
            class="main-bg"
            type="textarea"
            ref="editInput"
            resize="none"
            :autosize="true"
            v-model="markDownCode"
            @input="editMarkDown"
          ></el-input>
        </div>
        <div
          v-if="activeName === 'prew'"
          v-html="markDownHtml"
          class="markdown p-10"
        ></div>
      </div>
      <div class="edit-footer">
        <a
          href="https://www.runoob.com/markdown/md-title.html"
          target="__blank"
        >了解markDown书写</a>
      </div>
      <el-dialog
        title="确定提交吗？"
        v-model="dialogVisible"
        width="50%"
      >
        <el-input
          v-model="detail"
          type="textarea"
          placeholder="请填写文章摘要..."
          :rows="5"
        ></el-input>
        <Select
          v-model:value="articalclass"
          title="文章分类"
          :options="classoptions"
        />
        <Select
          v-model:value="type"
          title="文章标签"
          :options="options"
        />
        <Select
          v-model:value="status"
          title="是否保存为草稿"
          :options="statusOption"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitData()"
            >确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </template>
    <AdminCheck
      v-else
      v-model:value="isAdmin"
    />
  </div>
</template>

<script>
import showdown from "showdown";
import { ElInput, ElDialog, ElMessage } from "element-plus";
import AdminCheck from './AdminCheck'
import Select from '@/components/packages/Select.vue'
import { ref, onMounted } from "vue";
import "@/assets/style/markdown.css";

export default {
  name: "ArticalEdit",
  components: {
    ElInput,
    ElDialog,
    AdminCheck,
    Select
  },
  setup () {
    const markDownHtml = ref("");
    const markDownCode = ref("");
    const title = ref("");
    const detail = ref("");
    const dialogVisible = ref(false);
    var converter = new showdown.Converter();
    function editMarkDown (code) {
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
  data () {
    return {
      autoSave: 1,
      activeName: 'edit',
      articalid: null,
      isPromissionAxios: true,
      isAdmin: '0',
      password: '',
      articalclass: '1',
      type: '1',
      status: '0',
      isEditHalfArtical: false,
      halfArticalList: [],
      halfEditArticalId: null
    }
  },
  computed: {
    options () {
      return [{
        value: '1',
        label: 'HTML',
      }, {
        value: '2',
        label: 'CSS',
      }, {
        value: '3',
        label: 'JAVASCRIPT',
      }]
    },
    classoptions () {
      return [{
        value: '1',
        label: '博客文章'
      }, {
        value: '2',
        label: '函数库'
      }]
    },
    statusOption () {
      return [{
        value: '1',
        label: '正式发布'
      }, {
        value: '0',
        label: '保存为草稿'
      }]
    }
  },
  watch: {
    markDownCode: {
      handler () {
        this.handeAnySave();
      }
    },
    halfEditArticalId (newVal) {
      this.getArticalDetail(newVal);
    }
  },
  async created () {
    await this.getHalfArticalList();
    this.isAdmin = this.$store.state.artical.isAdmin;
    const { articalid } = this.$route.query;
    articalid ? this.getArticalDetail(articalid) : false
  },
  methods: {
    handleCtrl (e) {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
        e.preventDefault()
        this.submitData();
      }
    },
    forbidTab (e) {
      console.log(e);
      e.preventDefault();
    },
    replaceSpacing (e) {
      console.log(e);
      let input = document.getElementById('edit-input');
      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      this.markDownCode = this.markDownCode.substring(0, startPos) + "\t" + this.markDownCode.substring(endPos)
      setTimeout(() => {
        input.setSelectionRange(startPos + 1, startPos + 1);
        input.focus();
      }, 10)
    },
    handeAnySave () {
      if (!this.isPromissionAxios || !this.title || this.isEditHalfArtical) return

      this.isPromissionAxios = false;

      this.submitData();
      const saveTime = this.autoSave * 60 * 1000;
      let timer = setTimeout(() => {
        this.isPromissionAxios = true;
        clearTimeout(timer);
      }, saveTime > 0 ? saveTime : 3000);

    },
    handleChangeType () {
      console.log(this.activeName)
    },
    handleClick () {
      this.$refs.editInput.focus();
    },
    handleConfirm () {
      this.dialogVisible = true;
    },
    handleSubmit () {
      this.dialogVisible = false;
      const data = {
        title: this.title,
        author: "姚文",
        count: String(parseInt(Math.random() * 1000)),
        readtimer: parseInt(Math.random() * 10),
        content: this.markDownHtml,
        originmarkdown: this.markDownCode,
        desc: this.detail,
        articalclass: this.articalclass,
        type: this.type,
        status: this.status
      };
      return data
    },
    submitData () {
      const data = this.handleSubmit();
      if (this.articalid) {
        this.updateArtical({ ...data, articalid: this.articalid });
      } else {
        this.addArtical(data);
      }
    },
    updateArtical (data) {
      this.$api.UPDATE_ARTICAL(data, false)
        .then(res => {
          res && this.saveAfter();
        })
    },
    addArtical (data) {
      this.$api
        .ADD_ARTICAL(data, false)
        .then((res) => {
          if (res) {
            this.articalid = res.articalid;
            this.saveAfter();
          }
        });
    },
    saveAfter () {
      if (this.status === '1') {
        if (this.articalclass === '1') {
          this.$router.push({ name: 'HomeIndex' })
        } else {
          this.$router.push({ name: 'Function' })
        }
      } else {
        ElMessage.success({ message: '保存成功', duration: 800 })
      }
    },
    getArticalDetail (articalid) {
      this.isEditHalfArtical = true;
      this.$api.GET_ARTICAL_DETAIL({ articalid })
        .then((res) => {
          if (res.code === 200) {
            const { originmarkdown, articalid, title, content, desc, articalclass, type, status } = res.data;
            this.articalid = articalid;
            this.markDownHtml = originmarkdown;
            this.title = title;
            this.markDownHtml = content;
            this.markDownCode = originmarkdown;
            this.detail = desc;
            this.articalclass = articalclass;
            this.type = type;
            this.status = status;
          }
        })
    },
    getHalfArticalList () {
      return new Promise((resolve, reject) => {
        this.$api.GET_ARTICAL_LIST({ status: '0' }).then((res) => {
          if (res) {
            this.halfArticalList = res;
            resolve()
          } else {
            reject();
          }
        });
      })
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.edit-artical {
  width: 100%;
  height: calc(100vh - 156px);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.edit-input {
  width: 100%;
  height: 100%;
  cursor: text;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fff;
}
:deep(.el-textarea__inner),
:deep(.el-input__inner) {
  font-family: 微软雅黑;
}
.edit-artical :deep(.el-textarea__inner) {
  border: none;
  height: 100%;
  font-size: 16px;
  color: #333;
}

@media (prefers-color-scheme: dark) {
  :deep(.el-input__inner),
  :deep(.el-textarea__inner),
  .edit-input {
    background-color: #666;
    color: #eee;
  }
  .edit-title :deep(.el-input__inner),
  .edit-input {
    border: 1px solid #999;
  }
}
.markdown {
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
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