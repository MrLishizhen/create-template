import Mock from 'mockjs';

Mock.setup({ timeout: 1000 });

Mock.mock('/get_menu', function () {
  return Mock.mock({
    code: 200,
    msg: '',
    result: [
      {
        id: 1,
        parentId: 0,
        name: 'home',
        link: 'home',
        meta: {
          title: '首页',
        },
      },
    ],
  });
});
