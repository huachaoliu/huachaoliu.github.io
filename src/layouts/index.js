import { Layout } from 'antd';
import { connect } from 'dva';
import css from './index.less'
import Sider from '../components/Sider';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = (props) => {
  const { global, dispatch } = props;
  const { collapsed } = global;
  const toggle = () => {
    dispatch({ type: 'global/changeCollapsed' });
  };

  const headerProps = {
    height: 300,
  };

  console.log(props.children);

  return (
    <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <Layout className={css.main}>
        <Header {...headerProps} />
        <div className="content">{props.children}</div>
        <Footer />
      </Layout>
      <Sider
        width={320}
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        >
        <div>哈哈</div>
      </Sider>
    </Layout>
  );
}

export default connect(({ global }) => ({ global }))(App);
