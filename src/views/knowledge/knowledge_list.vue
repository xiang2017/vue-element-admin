<template>
  <div class="app-container">

    <div>
      <el-select v-model="params.label_id" placeholder="请选择标签">
        <el-option
          v-for="item in labels"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <el-button @click="getPageData(0)">搜索</el-button>

      <el-button type="primary" style="margin-left: 10px">
        <router-link to="/content/knowledge/edit">新增知识点</router-link>
      </el-button>
    </div>

    <el-table :data="knowledge" border style="width: 100%; margin: 10px 0">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="label_name" label="标签名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="know">
          <router-link v-bind:to="'/content/knowledge/edit/' + know.row.id">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      @current-change="whenPageChose"
      :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { fetchList as labelList } from '@/api/label'
import { fetchList } from '@/api/knowledge'
export default {
  name: 'Knowledge',
  data() {
    return {
      knowledge: [],
      count: 0,
      params: {
        page: 0,
        label_id: ''
      },
      labels: [],
    }
  },
  methods: {
    whenPageChose(e){
      this.getPageData(e - 1);
    },
    getPageData(page) {
      this.params.page = page;
      fetchList(this.params).then(res => {
        this.knowledge = res.data.data;
        this.count = res.data.count;
      }).catch(error => {
        if (error.response) {
          error = error.response.data
        }
        this.$message.error(error)
      })
    },
    getLabels (){
      labelList({page: 0}).then(response => {
        this.labels = [{
          "id": 0,
          "name": "所有标签"
        }];
        response.data.forEach(e => {
          this.labels.push(e)
        });
      }).catch(error => {
          console.error(error)
      })
    }
  },
  mounted() {
    this.getPageData(0)
    this.getLabels();
  }
}
</script>
<style>

</style>

