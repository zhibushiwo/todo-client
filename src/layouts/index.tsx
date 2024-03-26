import { Outlet } from 'umi';
import { Divider } from 'antd';
import styles from './index.less';
import Account from './Account';
import Search from './Search';
import Header from './Header';
import Nav from './Nav';
import BottomBar from './BottomBar';
import TaskList from './TaskList';
export default function Layout() {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.body}>
        <aside className={styles.aside}>
          <Account />
          <Search />
          <div className={styles.navs}>
            <Nav />
            <Divider />
            <TaskList />
          </div>

          <BottomBar />
        </aside>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
