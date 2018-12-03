<template>
  <div style="display: inline-block; vertical-align: top">
    <el-button  style="position: relative; vertical-align: top">
      {{ info }}
      <input style="opacity: 0; cursor: pointer; position: absolute; left: 0; top: 0; width: 92px; height: 33px; padding: 0; border: 0"
             type="file" v-on:change="onUpload" accept="image/png,image/gif,image/jpeg,image/jpg">
    </el-button>

    <img v-bind:src="value" v-show="value" style="height: 60px; margin-left: 15px; vertical-align: top; border-radius: 3px">
  </div>
</template>

<script>
  import { upload } from "@/api/qiniu"
  export default {
    name: 'ImgUploader',
    props: ['value'],
    data(){
      return {
        "info": "选择图片"
      }
    },
    methods: {
      onUpload: function(e){
        if (e.target.files.length < 1){
          return;
        }

        upload(e.target.files[0], (res, url) => {
            this.$emit('input', url);
        }, err => {
            console.error(err)
        })
      },
    }
  }
</script>
