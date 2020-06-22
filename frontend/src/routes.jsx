import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/hoc/auth';




import Register from './components/register_login/register';
import Home from './components/home';
import Layout from './components/hoc/layout';
import UserDashboard from './components/user';
import WriteReview from './components/writereview';

import RegisterLogin from './components/register_login';

const Routes = () => {
  return (
    
      <Layout>
        <Switch>
          <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
          <Route path="/register" exact component={Auth(Register,false)}/>
          <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
          <Route path="/user/writereview" exact component={WriteReview}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Layout>
    
      
    
  );
}

export default Routes;
