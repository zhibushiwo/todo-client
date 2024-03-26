import { defineConfig } from 'umi'

type config = ReturnType<typeof defineConfig>;

const routes: config['routes'] = [
  { path: "/login", component: "@/pages/login" },
  { path: "/settings", component: "@/pages/settings" },
  {
    path: "/",
    redirect: "/myDay",
    component: "@/layouts",
    routes: [
      {
        path: "/assignedToMe",
        component: "@/pages/assignedToMe",
        name: "已分配给我"
      },
      {
        path: "/customized",
        component: "@/pages/customized",
      },
      {
        path: "/important",
        component: "@/pages/important",
        name: "重要"
      },
      {
        path: "/myDay",
        component: "@/pages/myDay",
        name: "我的一天"
      },
      {
        path: "/planned",
        component: "@/pages/planned",
        name: "计划内"
      },
      {
        path: "/search",
        component: "@/pages/search",
      },
      {
        path: "/tasks",
        component: "@/pages/tasks",
        name: "任务"
      },
    ]
  },
]

export default routes