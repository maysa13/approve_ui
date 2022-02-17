import React from 'react';
/* Plugin */
import { HashRouter, Route, Switch } from "react-router-dom"
/* Helper */
import PrivateRoute from './helper/PrivateRoute'
/* Component */
import JasOauth2Callback from './component/JasOauth2Callback'
/* Page */
import PageListApprove from './page/approveList'
import LoginPage from './page/LoginPage'
import PageNotFoundPage from './page/PageNotFoundPage'
import './App.css';
import 'antd/dist/antd.less';

function App() {
  return (
    <HashRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route exact path="/:access_token(access_token=.*)" component={JasOauth2Callback} />
            <PrivateRoute exact path="/" component={PageListApprove} />
            <Route component={PageNotFoundPage} />
          </Switch>
        </div>
    </HashRouter>
  );
}

export default App;


