import { connect } from 'dva';

const About = () => {
  return (
    <div>
      关于
    </div>
  )
}

export default connect(({ global }) => ({ global }))(About);