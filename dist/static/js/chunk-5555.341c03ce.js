(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5555"],{Ksg7:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"d",function(){return o}),n.d(e,"c",function(){return s}),n.d(e,"a",function(){return l});var a=n("t3Un");function r(t){return Object(a.a)({url:"/questions",method:"get",params:t})}function o(t){return Object(a.a)({url:"/question",method:"post",data:t})}function s(t){return Object(a.a)({url:"/question",method:"get",params:t})}function l(t){return Object(a.a)({url:"/question/"+t,method:"delete"})}},OCW7:function(t,e,n){"use strict";var a=n("b8Ry");n.n(a).a},b8Ry:function(t,e,n){},zAQi:function(t,e,n){"use strict";n.r(e);var a=n("Ksg7"),r={name:"QuestionList",data:function(){return{questions:[],params:{page:0},editing:!1,count:0,current_delete:{},show_delete:!1}},mounted:function(){this.getData(0)},methods:{getData:function(t){var e=this;this.params.page=t,Object(a.b)(this.params).then(function(t){e.questions=[],e.count=t.data.count,t.data.data.forEach(function(t){e.questions.push(t)})}).catch(function(t){console.error(t)})},preDelete:function(t){this.current_delete=t,this.show_delete=!0},doDelete:function(){var t=this;Object(a.a)(this.current_delete.id).then(function(e){t.$message.success("删除成功"),t.getData(0)}).catch(function(e){e.response&&(e=e.response.data),t.$message.error(e)})}}},o=(n("OCW7"),n("KHd+")),s=Object(o.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-button",{attrs:{type:"primary",size:"small"}},[n("router-link",{attrs:{to:"/content/question/edit"}},[t._v("新增问题")])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.questions,border:""}},[n("el-table-column",{attrs:{prop:"id",label:"ID"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:"/content/question/edit/"+e.row.id}},[n("el-button",{attrs:{type:"primary",size:"small"}},[t._v("编辑")])],1),t._v(" "),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){t.preDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("el-pagination",{attrs:{layout:"prev, pager, next",total:t.count}}),t._v(" "),n("el-dialog",{attrs:{visible:t.show_delete,title:"确认删除问题？"},on:{"update:visible":function(e){t.show_delete=e}}},[n("el-form",{staticStyle:{width:"500px"},attrs:{"label-width":"80px"}},[n("el-form-item",{attrs:{label:"ID："}},[n("el-input",{attrs:{disabled:!0},model:{value:t.current_delete.id,callback:function(e){t.$set(t.current_delete,"id",e)},expression:"current_delete.id"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Name："}},[n("el-input",{attrs:{disabled:!0},model:{value:t.current_delete.name,callback:function(e){t.$set(t.current_delete,"name",e)},expression:"current_delete.name"}})],1)],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"small"},on:{click:function(e){t.show_delete=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"danger"},on:{click:t.doDelete}},[t._v("删 除")])],1)],1)],1)},[],!1,null,null,null);s.options.__file="question_list.vue";e.default=s.exports}}]);