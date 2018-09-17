<template>
  <div class="app-container">
    <el-button type="primary" size="small">
      <router-link to="/content/question/edit">新增问题</router-link>
    </el-button>
    <el-table
      :data="questions"
      border
      style="width: 100%; margin-top: 10px">
      <el-table-column
        prop="id"
        label="ID"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="created_at" label="创建时间"/>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="question">
          <router-link v-bind:to="'/content/question/edit/' + question.row.id">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="preDelete(question.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count">
    </el-pagination>

    <el-dialog :visible.sync="show_delete" title="确认删除问题？">
      <el-form label-width="80px" style="width: 500px">
        <el-form-item label="ID：">
          <el-input :disabled="true" v-model="current_delete.id"></el-input>
        </el-form-item>
        <el-form-item label="Name：">
          <el-input :disabled="true" v-model="current_delete.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="show_delete = false">取 消</el-button>
        <el-button size="small" type="danger" @click="doDelete">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, deleteQuestion } from '@/api/question'
export default {
  name: 'QuestionList',
  data() {
    return {
      questions: [],
      params: {
        page: 0
      },
      editing: false,
      count: 0,

      current_delete: {},
      show_delete: false,
    }
  },
  mounted() {
    this.getData(0)
  },
  methods: {
    getData(page) {
      this.params.page = page
      fetchList(this.params).then(response => {
        this.questions = []
        this.count = response.data.count
        response.data.data.forEach(e => {
          this.questions.push(e)
        })
      }).catch(error => {
        console.error(error)
      })
    },
    preDelete(row) {
      this.current_delete = row
      this.show_delete = true
    },
    doDelete() {
      deleteQuestion(this.current_delete.id).then(res => {
        this.$message.success("删除成功")
        this.getData(0)
      }).catch(error => {
        if (error.response) {
          error = error.response.data
        }
        this.$message.error(error);
      })
    }
  }
}
</script>

<style>

</style>
