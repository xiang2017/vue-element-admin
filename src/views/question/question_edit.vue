<template>
  <div class="app-container">
    <el-form :model="question" label-width="120px" style="width: 800px">
      <h3>基本信息</h3>
      <el-form-item label="题目名：">
        <el-input v-model="question.name"/>
      </el-form-item>
      <el-form-item label="后台显示名：">
        <el-input v-model="question.bg_name"/>
      </el-form-item>
      <el-form-item label="问题难度：">
        <el-select v-model="question.question_difficulty" placeholder="选择问题难度">
          <el-option label="1" value="1"/>
          <el-option label="2" value="2"/>
          <el-option label="3" value="3"/>
          <el-option label="4" value="4"/>
          <el-option label="5" value="5"/>
        </el-select>
      </el-form-item>
      <el-form-item label="问题内容：">
        <tinymce v-model="question.content"/>
      </el-form-item>
      <el-form-item label="问题类型：">
        <el-select v-model="question.question_type" placeholder="选择问题类型">
          <el-option label="选择题" value="1"></el-option>
          <el-option label="填空题" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选项：" v-show="question.question_type == 1">
        <div v-for="(option, index) in question.options" v-bind:key="index" style="margin-bottom: 5px">
          <el-radio v-model="question.answer" v-bind:label="index" style="display: inline-block" name="quesion_answer">选我 </el-radio>
          <el-input v-show="option.option_type == 1" v-model="option.content" style="width: 500px; display: inline-block"></el-input>
          <el-button type="danger" size="mini" @click="removeOption(index)">删除</el-button>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="addOption">添加选项</el-button>
        </div>
      </el-form-item>
      <el-form-item label="正确答案：" v-show="question.question_type == 2">
        <el-input v-model=question.answer></el-input>
      </el-form-item>
      <el-form-item label="问题解析：">
        <el-input type="textarea" rows="2" placeholder="输入问题解析" v-model="question.answer_explain"></el-input>
      </el-form-item>

      <h3>标签信息</h3>
      <el-form-item label="选择标签：">
        <edit-lable v-model="question.labels"></edit-lable>
      </el-form-item>

      <h3>关联知识点</h3>
      <el-form-item label="关联知识点：">
        <choose-knowledge v-model="question.knowledge"></choose-knowledge>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" size="small" @click="save">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { saveOrUpdate, getQuestionInfo } from '@/api/question'
import EditLable from '@/components/Custom/EditLabel'
import ChooseKnowledge from '@/components/Custom/ChooseKnowledge'
export default {
  name: 'QuestionEdit',
  components: { Tinymce, EditLable, ChooseKnowledge },
  props: ['id'],
  data() {
    return {
      question: {
        id: 0,
        question_type: "1",
        name: '',
        bg_name: '',
        content: '',
        options: [
          {
            option_type: "1",
            content: ''
          },
          {
            option_type: "1",
            content: ''
          }
        ],
        answer: '',
        answer_explain: '',
        question_difficulty: "3",
        labels: [],
        knowledge: [],
      }
    }
  },
  methods: {
    addOption: function(){
      this.question.options.push({
        option_type: "1",
        content: ''
      });
    },
    removeOption(index){
      this.question.options.splice(index, 1);
    },
    save() {
      saveOrUpdate(this.question).then(res => {
        this.$message.success('保存成功');
        this.question.id = res.data.id;
      }).catch(error => {
        if (error.response) {
          error = error.response.data
        }
        this.$message.error(error);
      })
    },
    getQuestionInfo(id) {
      getQuestionInfo({ 'id': id }).then(res => {
        this.question = res.data;
      }).catch(error => {
        if (error.response){
          error = error.response.data;
        }
        this.$message.error(error)
      })
    }
  },
  mounted() {
    if (this.id != undefined){
      this.getQuestionInfo(this.id)
    }
  }
}
</script>

<style>

</style>
