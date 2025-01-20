import { Button } from 'antd';
import { useNavigate } from 'react-router';
const One = () => {
  const navigate = useNavigate();
  return (
    <div>
      这是一级页面{' '}
      <Button
        onClick={() => {
          navigate('/layout/multilevel/default/100');
        }}
      >
        跳转二级页
      </Button>
    </div>
  );
};

export default One;
