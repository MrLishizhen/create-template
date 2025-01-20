import { Outlet } from 'react-router';
const Three = () => {
  return (
    <div>
      三级界面
      <Outlet></Outlet>
    </div>
  );
};

export default Three;
