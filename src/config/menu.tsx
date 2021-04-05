export type Menu = {
  name: string;
  path: string;
  icon?: JSX.Element;
  children?: Menu[];
  authority?: string | string[]; // ’或‘的关系
};

const menus: Menu[] = [
  {
    name: 'Dashboard',
    path: '/app/dashboard',
  },
  {
    name: '表单',
    path: '/app/form',
    children: [
      {
        name: '基础表单',
        path: '/app/form/basic',
        authority: ['admin'],
      },
      {
        name: '分步表单',
        path: '/app/form/step',
      },
      {
        name: '高级表单',
        path: '/app/form/advanced',
      },
    ],
  },
  {
    name: '列表',
    path: '/app/list',
  },
  {
    name: '详情',
    path: '/app/details',
  },
  {
    name: '结果',
    path: '/app/result',
  },
  {
    name: '异常',
    path: '/app/exceptions',
  },
  {
    name: '个人信息',
    path: '/app/profile',
  },
];

export default menus;
