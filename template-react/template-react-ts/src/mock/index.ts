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
        meta: {
          //路由元信息
          title: '首页',
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
