import styles from './index.module.less';
const HomeView = () => {
  return (
    <div className={styles.home}>
      <h2>Echarts</h2>
      <div className={styles.charts}></div>
    </div>
  );
};

export default HomeView;
