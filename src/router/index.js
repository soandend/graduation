import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/table',
    name: 'Home',
    meta: {title: '信息桌面', icon: 'home'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: '开闭幕式', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: '成绩浏览', icon: 'tree'}
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/tree/student'),
        meta: {title: '选手资料', icon: 'tree'}
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/tree/teacher'),
        meta: {title: '赛事编排', icon: 'tree'},
        children: [
          {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/tree/order'),
            hidden: true,
            meta: {title: '入场顺序'}
          },
        ]
      },
      {
        path: 'stutake',
        name: 'Stutake',
        component: () => import('@/views/tree/stutake'),
        meta: {title: '项目信息', icon: 'tree'}
      },
      {
        path: 'rent',
        name: 'Rent',
        component: () => import('@/views/tree/rent'),
        meta: {title: '器材信息', icon: 'tree'}
      },
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/tree/service'),
        meta: {title: '服务站点', icon: 'tree'}
      },
      {
        path: 'radio',
        name: 'Radio',
        component: () => import('@/views/tree/radio'),
        meta: {title: '信息播报', icon: 'tree'},
        children: [
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/tree/detail'),
            hidden: true,
            meta: {title: '信息详情'}
          },
        ]
      },

    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/adminList',
    name: 'Form',
    meta: {title: '管理员管理', icon: 'form'},
    children: [
      {
        path: 'adminList',
        name: 'AdminList',
        component: () => import('@/views/form/adminList'),
        meta: {title: '管理员列表', icon: 'form'}
      },
      {
        path: 'addAdmin',
        name: 'AddAdmin',
        component: () => import('@/views/form/addAdmin'),
        meta: {title: '新建管理员', icon: 'form'}
      }
    ]
  },
  {
    path: '/join',
    component: Layout,
    redirect: '/join/studentList',
    name: 'Join',
    meta: {title: '参赛报名管理', icon: 'form'},
    children: [
      {
        path: 'studentList',
        name: 'StudentList',
        component: () => import('@/views/join/studentList'),
        meta: {title: '选手资料', icon: 'form'},
        children: [
          {
            path: 'join',
            name: 'Join',
            component: () => import('@/views/join/join'),
            hidden: true,
            meta: {title: '报名比赛'}
          },
        ]
      },
      {
        path: 'addStudent',
        name: 'AddStudent',
        component: () => import('@/views/join/addStudent'),
        meta: {title: '添加选手', icon: 'form'}
      },
      {
        path: 'studentSetList',
        name: 'StudentSetList',
        component: () => import('@/views/join/studentSetList'),
        meta: {title: '报名审核', icon: 'form'}
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/projectList',
    name: 'Project',
    meta: {title: '比赛项目管理', icon: 'form'},
    children: [
      {
        path: 'projectList',
        name: 'ProjectList',
        component: () => import('@/views/project/projectList'),
        meta: {title: '项目查询', icon: 'form'}
      },
      {
        path: 'addProject',
        name: 'AddProject',
        component: () => import('@/views/project/addProject'),
        meta: {title: '项目创建', icon: 'form'}
      },
      {
        path: 'projectSet',
        name: 'ProjectSet',
        component: () => import('@/views/project/projectSet'),
        meta: {title: '项目设置', icon: 'form'}
      }
    ]
  },

  {
    path: '/score',
    component: Layout,
    redirect: '/score/scoreList',
    name: 'Score',
    meta: {title: '比赛成绩管理', icon: 'form'},
    children: [
      {
        path: 'scoreList',
        name: 'ScoreList',
        component: () => import('@/views/score/scoreList'),
        meta: {title: '成绩查询', icon: 'form'},
        children: [
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/score/detail'),
            hidden: true,
            meta: {title: '成绩录入'}
          },
        ]
      },
      {
        path: 'addScore',
        name: 'AddScore',
        component: () => import('@/views/score/addScore'),
        meta: {title: '成绩录入', icon: 'form'},
        children: [
          {
            path: 'add',
            name: 'Add',
            component: () => import('@/views/score/add'),
            hidden: true,
            meta: {title: '查看成绩详情'}
          },
        ]
      }
    ]
  },

  {
    path: '/kit',
    component: Layout,
    redirect: '/kit/kitList',
    name: 'Kit',
    meta: {title: '器材管理', icon: 'form'},
    children: [
      {
        path: 'kitList',
        name: 'KitList',
        component: () => import('@/views/kit/kitList'),
        meta: {title: '器材查询', icon: 'form'},
        children: [
          {
            path: 'rent',
            name: 'Rent',
            component: () => import('@/views/kit/rent'),
            hidden: true,
            meta: {title: '租借器材'}
          },
        ]
      },
      {
        path: 'addKit',
        name: 'AddKit',
        component: () => import('@/views/kit/addKit'),
        meta: {title: '器材录入', icon: 'form'}
      },
      {
        path: 'rentList',
        name: 'RentList',
        component: () => import('@/views/kit/rentList'),
        meta: {title: '器材借还', icon: 'form'},
        children: [
          {
            path: 'return',
            name: 'Return',
            component: () => import('@/views/kit/return'),
            hidden: true,
            meta: {title: '归还器材'}
          },
        ]
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/teacherList',
    name: 'Teacher',
    meta: {title: '裁判管理', icon: 'form'},
    children: [
      {
        path: 'teacherList',
        name: 'TeacherList',
        component: () => import('@/views/teacher/teacherList'),
        meta: {title: '裁判信息', icon: 'form'},
        children: [
          {
            path: 'join',
            name: 'Join',
            component: () => import('@/views/teacher/join'),
            hidden: true,
            meta: {title: '裁判参赛'}
          },
        ]
      },
      {
        path: 'addTeacher',
        name: 'AddTeacher',
        component: () => import('@/views/teacher/addTeacher'),
        meta: {title: '裁判创建', icon: 'form'}
      },
      {
        path: 'teacherSetList',
        name: 'TeacherSetList',
        component: () => import('@/views/teacher/teacherSetList'),
        meta: {title: '裁判赛事安排', icon: 'form'}
      }
    ]
  },

  {
    path: '/others',
    component: Layout,
    redirect: '/others/party',
    name: 'Others',
    meta: {title: '开幕式相关管理', icon: 'home'},
    children: [
      {
        path: 'party',
        name: 'Party',
        component: () => import('@/views/others/party'),
        meta: {title: '开闭幕式管理', icon: 'table'}
      },
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/others/service'),
        meta: {title: '服务站管理', icon: 'tree'}
      },
      {
        path: 'radio',
        name: 'Radio',
        component: () => import('@/views/others/radio'),
        meta: {title: '广播信息管理', icon: 'tree'},children: [
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/others/detail'),
            hidden: true,
            meta: {title: '信息详情'}
          },
        ]
      }
    ]
  },

  {
    path: '/print',
    component: Layout,
    redirect: '/print/score',
    name: 'Print',
    meta: {title: '相关资料打印', icon: 'home'},
    children: [
      {
        path: 'score',
        name: 'Score',
        component: () => import('@/views/print/score'),
        meta: {title: '成绩信息', icon: 'table'}
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/print/student'),
        meta: {title: '选手资料', icon: 'tree'}
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/print/order'),
        meta: {title: '入场顺序', icon: 'tree'}
      },
      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/print/project'),
        meta: {title: '赛事安排', icon: 'tree'}
      }
    ]
  },

  {
    path: '/person',
    component: Layout,
    redirect: '/person/updateInfo',
    name: 'Person',
    meta: {title: '个人中心', icon: 'user'},
    children: [
      {
        path: 'updateInfo',
        name: 'UpdateInfo',
        component: () => import('@/views/person/updateInfo'),
        meta: {title: '修改资料', icon: 'table'}
      },
      {
        path: 'updatePwd',
        name: 'UpdatePwd',
        component: () => import('@/views/person/updatePwd'),
        meta: {title: '修改密码', icon: 'tree'}
      }
    ]
  },


  {
    path: '/nested',//最外层
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',//第二层
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'Menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'Menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'Menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'Menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'Menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'Menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {title: 'menu2'}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: {title: 'External Link', icon: 'link'}
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true},

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
