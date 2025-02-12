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
        name: 'welcome', //路由文件路径、
        link: 'welcome', //path路由地址
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

Mock.mock('/get_pie_data', function () {
  return Mock.mock({
    code: 200,
    msg: '获取数据成功',
    result: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' },
    ],
  });
});

Mock.mock('/get_pie_data_total', function () {
  return Mock.mock({
    code: 200,
    msg: '获取数据成功',
    result: {
      total: 3147,
    },
  });
});

Mock.mock('/get_table_data', function () {
  return Mock.mock({
    code: 200,
    msg: '获取数据成功',
    result: {
      'result|10': [
        {
          'name|+1': ['Hello', 'Mock.js', '!'],
          key: '@integer(1, 100)',
          age: '@integer(20, 30)',
          address: '@county(true)',
        },
      ],
      total: 50,
    },
  });
});
