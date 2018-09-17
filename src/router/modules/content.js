/* 内容板块的路由配置 */

import Layout from '@/views/layout/Layout'

const contentRouter = {
  path: '/content',
  component: Layout,
  redirect: '/content/index',
  alwaysShow: true,
  meta: {
    title: '内容管理',
    icon: 'documentation'
  },
  children: [
    {
      path: '/content/label',
      component: () => import('@/views/label/index'),
      name: '标签管理',
      meta: {
        title: '标签管理',
        icon: 'label',
        noCache: true
      }
    },
    {
      path: '/content/question',
      component: () => import('@/views/question/question_list'),
      name: '问题管理',
      meta: {
        title: '问题管理',
        icon: 'question',
        noCache: true
      }
    },
    {
      path: '/content/question/edit',
      component: () => import('@/views/question/question_edit'),
      name: '新增问题',
      props: true,
      meta: { noCache: true, title: '新增问题' },
      hidden: true
    },
    {
      path: '/content/question/edit/:id',
      component: () => import('@/views/question/question_edit'),
      name: '编辑问题',
      props: true,
      meta: { noCache: true, title: '编辑问题' },
      hidden: true
    },
    {
      path: '/content/knowledge',
      component: () => import('@/views/knowledge/knowledge_list'),
      name: '知识点管理',
      meta: {
        title: '知识点管理',
        icon: 'knowledge'
      }
    },
    {
      path: '/content/knowledge/edit',
      component: () => import('@/views/knowledge/knowledge_edit'),
      name: '编辑知识点',
      props: true,
      meta: { noCache: true, title: '编辑知识点' },
      hidden: true
    },
    {
      path: '/content/knowledge/edit/:id',
      component: () => import('@/views/knowledge/knowledge_edit'),
      name: '编辑知识点',
      props: true,
      meta: { noCache: true, title: '编辑知识点' },
      hidden: true
    },
  ]
}
export default contentRouter
