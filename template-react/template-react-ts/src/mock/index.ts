import Mock from 'mockjs';

Mock.setup({ timeout: 1000 });

Mock.mock('/get_menu', function () {
  return Mock.mock({
    code: 200,
    msg: '',
    result: [
      {
        id: 1, //id
        parentId: 0, //父级id
        name: 'home', //路由文件路径、
        link: 'home', //path路由地址
        icon: 'HomeOutlined',
        meta: {
          //路由元信息
          title: '首页',
        },
      },
      {
        id: 2,
        parentId: 0,
        name: 'page_table',
        link: 'page_table',
        icon: 'TableOutlined',
        meta: {
          title: '页面',
        },
      },
      {
        id: 3,
        parentId: 0,
        name: 'multilevel',
        link: 'multilevel',
        icon: 'CopyOutlined',
        meta: {
          title: '页面',
        },
      },
      {
        id: 4,
        parentId: 3,
        name: 'multilevel/one',
        link: 'one',
        meta: {
          title: '页面一',
        },
      },
      {
        id: 5,
        parentId: 3,
        name: 'multilevel/default',
        link: 'default/:id',
        meta: {
          title: '页面一携带参数跳转',
          hideMenu: true,
          parentMenu: 'multilevel/one',
        },
      },
      {
        id: 5,
        parentId: 3,
        name: 'multilevel/two',
        link: 'two',
        meta: {
          title: '页面二',
        },
      },
      {
        id: 6,
        parentId: 3,
        name: 'multilevel/three',
        link: 'three',
        meta: {
          title: '页面三多级目录',
        },
      },
      {
        id: 7,
        parentId: 6,
        name: 'multilevel/three/three_one',
        link: 'three_one',
        meta: {
          title: '多级目录第一级',
        },
      },
    ],
  });
});

Mock.mock('/login', function () {
  return Mock.mock({
    code: 200,
    msg: '登陆成功',
    result: {
      token: '1234567890',
    },
  });
});

Mock.mock('/user/info', function () {
  return Mock.mock({
    code: 200,
    msg: '获取用户信息成功',
    result: {
      name: 'admin',
      userId: 1,
    },
  });
});
