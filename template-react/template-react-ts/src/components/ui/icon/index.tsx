import { HomeOutlined, TableOutlined, CopyOutlined } from '@ant-design/icons';
type IconComTypes = {
  type: string;
  iconStyle?: React.CSSProperties;
};
export const IconFont = (props: IconComTypes) => {
  const { type, iconStyle } = props;
  const style = { fontSize: '16px', color: '#fff', ...iconStyle };
  switch (type) {
    case 'HomeOutlined':
      return <HomeOutlined style={style} />;
    case 'TableOutlined':
      return <TableOutlined style={style} />;
    case 'CopyOutlined':
      return <CopyOutlined style={style} />;
    default:
      return <></>;
  }
};
