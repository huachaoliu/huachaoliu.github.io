import css from './index.less';
import Navigation from './nav';

export default (props) => {
  return (
    <div className={css.header}>
      <h2>MR·LIU</h2>
      <Navigation />
    </div>
  )
}