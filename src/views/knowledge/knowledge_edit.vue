<template>
  <div class="app-container">
    <el-form :model="knowledge" label-width="120px" style="width: 800px">
      <el-form-item label="名称：">
        <el-input v-model="knowledge.name"></el-input>
      </el-form-item>

      <el-form-item label="内容：">
        <tinymce v-model="knowledge.content"></tinymce>
      </el-form-item>
      
      <el-form-item label="标签">
        <edit-lable v-model="knowledge.labels"></edit-lable>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="save">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import EditLable from '@/components/Custom/EditLabel'
import { saveOrUpdate, getKnowledgeInfo } from '@/api/knowledge'
export default {
  name: "KnowledgeEdit",
  components: { Tinymce, EditLable },
  props: ['id'],
  data() {
    return {
      knowledge: {
        id: 0,
        name: "",
        content: "",
        labels: []
      }
    }
  },
  methods: {
    save() {
      saveOrUpdate(this.knowledge).then(res => {
        this.$message.success("保存成功")
        this.knowledge.id = res.data.id
      }).catch(error => {
        if (error.response) {
          error = error.response.data;
        }
        this.$message.error(error)
      })
    },
    getKnowledge(id) {
      getKnowledgeInfo(id).then(res => {
        this.knowledge = res.data;
      }).catch(err => {
        this.$message.error(err.response.data)
      });
    }
  },
  mounted() {
    if (this.id != undefined) {
      this.getKnowledge(this.id)
    }
  }
}
</script>
<style>

</style>
