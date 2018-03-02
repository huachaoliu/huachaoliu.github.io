import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import('/home/dx/app/misliu/misliu.github.io/src/global.less');
import Layout from '/home/dx/app/misliu/misliu.github.io/src/layouts/index.js';
import { routerRedux } from 'dva/router';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


export default function() {
  return (
<Router history={window.g_history}>
  <Layout><Switch>
    <Route exact path="/about" component={require('../about/page.js').default} />
    <Route exact path="/classify" component={require('../classify/page.js').default} />
    <Route exact path="/helper" component={() => <div>Compiling...</div>} />
    <Route exact path="/home" component={() => <div>Compiling...</div>} />
    <Route exact path="/" component={require('../index.js').default} />
    <Route exact path="/log" component={require('../log/page.js').default} />
  </Switch></Layout>
</Router>
  );
}
