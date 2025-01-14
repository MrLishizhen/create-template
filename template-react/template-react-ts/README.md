# React18 + redux + react-router + antd + typescript

## 项目介绍

这是一个使用 React18 + redux + react-router + antd + typescript 的项目模板。在使用前你需要确保你的编辑器中有 [ESlint](https://eslint.org/)、[Prettier](https://prettier.io)、[TypeScript](https://www.typescriptlang.org/)、[Stylelint](https://stylelint.io) 的插件。

如果你的编辑器没有这些插件，你可以使用 [VSCode](https://code.visualstudio.com/)，并安装这些插件。

- eslint：ESlint
- prettier：Prettier - Code formatter
- typescript：TypeScript
- stylelint：Stylelint

## 项目结构

```
├── .vscode
├── public
├── src
│   ├── api 请求文件
│   ├── assets  静态资源
│   ├── components  公共组件
│   ├── hooks  自定义hook
│   ├── layout  布局组件
│   ├── mock  mock数据
│   ├── redux  redux相关文件
│   ├── router  路由配置
│   ├── utils  公共方法
│   ├── views  页面组件
│   ├── axios.d.ts axios类型声明文件
│   ├── index.css 全局样式
│   └── mian.tsx 入口文件
│   └── vite-env.d.ts vite类型声明文件
│
├── .env.development 开发环境配置
├── .env.preview 预览环境配置
├── .env.production 生产环境配置
├── .gitignore git忽略文件
├── .prettierignore  prettier忽略文件
├── .prettierrc  prettier配置文件
├── .stylelintrc.json stylelint配置文件
├── eslint.config.js eslint配置文件
├── index.html 入口html文件
├── package.json 依赖文件
├── tsconfig.app.json ts配置文件
├── tsconfig.json ts配置文件
├── tsconfig.node.json ts配置文件
├── vite.config.ts vite配置文件
```

## 路由配置

### 路由数据格式

```js
    {
        id: 1, //id
        parentId: 0, //父级id
        name: 'home', //路由文件路径、
        link: 'home', //path路由地址
        meta: {
          //路由元信息
          title: '首页',
        },
    },
```

### 路由配置

```
├── router
│   ├── index.tsx 路由主文件(路由生成、路由懒加载、路由重定向)
│   ├── route.tsx 获取路由组件
│   ├── utils.tsx 公共方法
```

#### 增加鉴权校验

针对除login之外的所有界面，如果你希望单独鉴权，请改造`src/router/utils.tsx`文件中的`auth`方法。

```js
// 判断是否登陆
useEffect(() => {
  if (pathname === LOGIN) {
    return;
  } else {
    if (!auth()) {
      navigate(LOGIN, { replace: true });
    }
  }
}, [pathname, navigate]);
```

## 项目运行

```bash
pnpm install
pnpm run dev
```

## 项目打包

```bash
pnpm run build
```
