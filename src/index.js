import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


import App from './App';
import fanucKanban from './components/fanucKanban/index';
import fanucGMReport from './components/fanucGMReport/index';
import fanucKanbanEN from './components/fanucKanbanEN/index';
import fanucGMReportEN from './components/fanucGMReportEN/index';
import './index.css';
//路由设置
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/*默认路由*/}
      <IndexRoute component={fanucKanban} />
      {/*path是url，component指向某个页面组件*/}
      <Route path="fanuc1" component={fanucKanban} />
      <Route path="fanuc2" component={fanucGMReport} />
      <Route path="fanuc1EN" component={fanucKanbanEN} />
      <Route path="fanuc2EN" component={fanucGMReportEN} />
    </Route>
  </Router>,
  document.getElementById('root')
);
