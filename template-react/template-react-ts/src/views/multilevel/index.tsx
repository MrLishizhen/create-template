import styles from './index.module.less';
import { Outlet } from 'react-router';
const Multilevel = () => {
  return (
    <div className={styles.multilevel}>
      <Outlet />
    </div>
  );
};

export default Multilevel;
