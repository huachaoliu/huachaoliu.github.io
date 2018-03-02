import css from './index.less';
import { Icon } from 'antd';
// import { getLocalStorage, setLocalStorage } from '../../utils';

export default (props) => {
  const {
    width,
    collapsible,
    collapsed,
    onCollapse,
    className,
  } = props;

  // let expect = collapsed;
  // if (collapsed) {
  //   setLocalStorage('collapsed', collapsed);
  // } else {
  //   expect = Boolean(getLocalStorage('collapsed'));
  //   if (!expect) {
  //     expect = collapsed;
  //   }
  // }
  // console.log(expect);
  const siderClass = css.sider + `${className ? ' ' + className : ''}`;
  const _style = {
    width: collapsed ? 80 : width,
  };

  // const toggle = () => {
  //   setLocalStorage('collapsed', null);
  //   onCollapse();
  // }

  const collapsedComponent = () => {
    const iconClass = collapsed ? 'menu-unfold' : 'menu-fold';
    return collapsible ? <div className={css.collapsed} onClick={onCollapse}>
      <Icon type={iconClass} />
    </div> : null;
  }

  return (
    <div className={siderClass} style={_style}>
      <div className={css.sideContent}>{props.children}</div>
      {collapsedComponent()}
    </div>
  )
};