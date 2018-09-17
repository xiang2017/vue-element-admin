<template>
  <div class="label-container">
    <div class="label-panel">
      <span v-for="(label, index) in value" v-bind:key="index" class="span-label">
        {{ label }}
        <i @click="removeIcon(index)">
          <svg-icon icon-class="remove" />
        </i>
      </span>
      <input class="label-input" v-model="input_label" @keyup.enter="addLabel" placeholder="输入标签并回车">
    </div>

    <div class="label-list">
      <h5 style="margin: 0">可选标签</h5>
      <span class="span-label" v-for="(label, index) in labels" v-bind:key="index" @click="addLabelFromOld(label.name)">{{ label.name }}</span>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/label'
export default {
  name: "EditLabel",
  props: ['value'],
  data(){
    return {
      input_label: '',
      labels: [],
      params: {
        page: 0,
        count_per_page: 50
      },
      all_load: false
    }
  },
  methods: {
    removeIcon(index) {
      var data = this.value.concat();
      data.splice(index, 1)
      this.$emit('input', data)
    },
    addLabelFromOld(name){
      this.input_label = name
      this.addLabel()
    },
    addLabel(){
      if (this.input_label == ''){
        return
      }
      for (let i = 0; i < this.value.length; i ++){
        if (this.value[i] == this.input_label) {
          return
        }
      }
      this.value.push(this.input_label)
      this.input_label = ''
      this.$emit('input', this.value);
    },
    getLabel() {
      fetchList(this.params).then(res => {
        res.data.forEach(e => {
          this.labels.push(e)
        })
        this.params.page ++
        if (res.data.length < this.params.count_per_page) {
          this.all_load = true
        }
      }).catch(error => {
        this.$message.error(error)
      })
    }
  },
  mounted (){
    this.getLabel();
  }
}
</script>
<style>
.label-container .label-panel {
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 3px;
  margin-bottom: 5px;
}
.label-container .span-label {
  display: inline-block;
  padding: 3px 4px;
  background-color: #888;
  color: white;
  font-size: 13px;
  margin-right: 3px;
  border-radius: 2px;
  line-height: 13px;
  cursor: pointer;
}
.label-container .label-input {
  border: none;
  display: inline-block;
  padding: 3px 4px;
  color: #333;
  outline: none;
  width: 300px;
}

.label-container .label-list {
  background-color: #f8f8f8;
  border-radius: 3px;
  padding: 8px 10px;
}
</style>


