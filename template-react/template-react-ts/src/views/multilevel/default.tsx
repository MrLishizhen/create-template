import { useParams } from 'react-router';
const DefaultCom = () => {
  const params = useParams();
  //   const location = useLocation();
  //   console.log(location, 'location', params);
  return (
    <div>
      这是一个详情页
      <div>id是{params.id}</div>
    </div>
  );
};

export default DefaultCom;
