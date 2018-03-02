// import Home from './home';
// export default Home;
import { connect } from 'dva';

const Home = () => {
  return (
    <div>
      首页暂无内容
    </div>
  )
}

export default connect(({ global }) => ({ global }))(Home);