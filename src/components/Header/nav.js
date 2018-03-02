import { Menu } from 'antd';
import Link from 'umi/link';
import navConfig from './navConfig';
import css from './index.less';

const MenuItem = Menu.Item;

export default () => {
  const _style = {
    lineHeight: '62px',
    background: '#ececec',
  }
  const defaultKey = window.location.pathname;
  console.log(defaultKey);
  const nav = (
    <Menu 
      mode="horizontal" 
      selectedKeys={[defaultKey]}
      style={_style}
      >
      {
        navConfig.map(({ id, path, name }) => {
          return <MenuItem key={path}>
            <Link to={path}>{name}</Link>
          </MenuItem>
        })
      }
    </Menu>
  );
  
  return (
    <div className={css.nav}>
    {nav}
    </div>
  );
};