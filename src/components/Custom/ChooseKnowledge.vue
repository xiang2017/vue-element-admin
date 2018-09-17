<template>
  <div class="knowledge-container">
    <div class="knowledge-choosed">
      <span v-for="(v, index) in value" v-bind:key="index" class="knowledge-item">
        {{ v.name }}（{{ v.id }}）
        <i @click="removeKnowledge(index)">
          <svg-icon icon-class="remove" />
        </i>
      </span>
    </div>
    <el-button type="primary" @click="show_knowledge_list=true">选 择</el-button>

    <el-dialog :visible.sync="show_knowledge_list" title="选择知识点">
      <el-table :data="knowledge" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="know">
            <el-button type="primary" size="small" @click="choose(know.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList } from '@/api/knowledge'
export default {
  name: "ChooseKnowledge",
  props: ['value'],
  data(){
    return {
      show_knowledge_list: false,
      knowledge: [],
      params: {
        page: 0,
      }
    }
  },
  methods: {
    choose(know){
      // var data = this.value.concat();
      for (var i = 0; i < this.value.length; i ++){
        if (this.value[i].id == know.id){
          this.$message.warning("已被选过")
          return
        }
      }
      this.value.push(know)
      this.$emit('input', this.value)
      this.show_knowledge_list = false;
    },
    removeKnowledge(index){
      var data = this.value.concat();
      data.splice(index, 1)
      this.$emit('input', data)
    },
    getPageData(page) {
      this.params.page = page;
      fetchList(this.params).then(res => {
        this.knowledge = res.data.data
        this.count = res.data.count
      }).catch(error => {
        if (error.response) {
          error = error.response.data
        }
        this.$message.error(error)
      })
    }
  },
  mounted() {
    this.getPageData(0)
  }
}
</script>

<style scoped>
.knowledge-container {
  background-color: #f8f8f8;
  border-radius: 3px;
  padding: 8px 10px;
}
.knowledge-choosed {
  padding: 5px 0
}
.knowledge-choosed .knowledge-item {
  background-color: #888;
  border-radius: 3px;
  color: white;
  padding: 3px;
  font-size: 13px;
}
.knowledge-item i {
  cursor: pointer;
}
</style>

