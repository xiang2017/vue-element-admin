<template>
  <div class="app-container">
    <el-button type="primary" size="small" @click="addLabel">新增Label</el-button>
    <el-table
      :data="labels"
      border
      style="width: 100%; margin-top: 10px">
      <el-table-column
        prop="id"
        label="ID"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="created_at" label="创建时间"/>
      <el-table-column label="操作" width="100">
        <template slot-scope="label">
          <el-button type="text" @click="editLabel(label.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="editing" title="编辑 Label" width="500px">
      <el-form :model="currentLabel" label-width="80px">
        <el-form-item label="标签ID">
          <el-input v-model="currentLabel.id" :disabled="true" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="currentLabel.name" placeholder="填写标签名" style="width: 300px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="fialog-footer">
        <el-button size="small" @click="editing = false">取 消</el-button>
        <el-button type="primary" size="small" @click="saveLabel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, saveOrUpdate } from '@/api/label'
export default {
  name: 'Label',
  data() {
    return {
      labels: [],
      params: {
        page: 0
      },
      currentLabel: {
        id: '',
        name: ''
      },
      editing: false
    }
  },
  mounted() {
    this.getData(0)
  },
  methods: {
    getData(page) {
      this.params.page = page
      fetchList(this.params).then(response => {
        this.labels = []
        response.data.forEach(e => {
          this.labels.push(e)
        })
      }).catch(error => {
        console.error(error)
      })
    },
    addLabel() {
      this.currentLabel.id = 0
      this.currentLabel.name = ''
      this.editing = true
    },
    editLabel(label) {
      this.currentLabel.id = label.id
      this.currentLabel.name = label.name
      this.editing = true
    },
    saveLabel() {
      saveOrUpdate(this.currentLabel).then(response => {
        this.$message({
          message: '保存成功'
        })
        this.editing = false
        this.getData(0)
      }).catch(error => {
        console.error(error)
        this.$message({
          message: 'error',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>
