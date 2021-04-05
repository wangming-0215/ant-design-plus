import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { MainLayout } from 'src/layouts';
import Login from 'src/pages/Login';
import React from 'react';

const NotFound = React.lazy(() => import('src/pages/NotFound'));
const Test: React.FC = styled('div')({ height: 10000 });

const routes: PartialRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: '/app/dashboard',
        element: <Test>Dashboard</Test>,
      },
      {
        path: '/app/form',
        children: [
          {
            path: '/',
            element: <Navigate to="/app/form/basic" replace />,
          },
          {
            path: '/basic',
            element: <Test>基础表单</Test>,
          },
          {
            path: '/step',
            element: <Test>分步表单</Test>,
          },
          {
            path: '/advanced',
            element: <Test>高级表单</Test>,
          },
        ],
      },
      {
        path: '/app/list',
        element: <Test>列表</Test>,
      },
      {
        path: '/app/details',
        element: <Test>详情</Test>,
      },
      {
        path: '/app/result',
        element: <Test>结果</Test>,
      },
      {
        path: '/app/exceptions',
        element: <Test>异常</Test>,
      },
      {
        path: '/app/profile',
        element: <Test>个人信息</Test>,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
];

export default routes;
