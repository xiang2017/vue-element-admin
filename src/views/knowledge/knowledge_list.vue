<template>
  <div class="app-container">
    <el-button type="primary" size="small">
      <router-link to="/content/knowledge/edit">新增知识点</router-link>
    </el-button>

    <el-table :data="knowledge" border style="width: 100%; margin-top: 10px">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="know">
          <router-link v-bind:to="'/content/knowledge/edit/' + know.row.id">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { fetchList } from '@/api/knowledge'
export default {
  name: 'Knowledge',
  data() {
    return {
      knowledge: [],
      count: 0,
      params: {
        page: 0,
      }
    }
  },
  methods: {
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
<style>

</style>

