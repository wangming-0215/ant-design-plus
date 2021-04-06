import React from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';

const NotFound = React.lazy(() => import('src/pages/404'));
const Forbidden = React.lazy(() => import('src/pages/403'));
const MainLayout = React.lazy(() => import('src/layouts/MainLayout'));
const Login = React.lazy(() => import('src/pages/Login'));

const Test: React.FC = styled('div')({ height: 10000 });

const routes: PartialRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: '/app',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Test>Dashboard</Test>,
      },
      {
        path: '/form',
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
        path: '/list',
        element: <Test>列表</Test>,
      },
      {
        path: '/details',
        element: <Test>详情</Test>,
      },
      {
        path: '/result',
        element: <Test>结果</Test>,
      },
      {
        path: '/exceptions',
        element: <Test>异常</Test>,
      },
      {
        path: '/profile',
        element: <Test>个人信息</Test>,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
];

export default routes;
