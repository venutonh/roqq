import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/hoc/auth';
import User from './components/hoc/user';


import Register from './components/register_login/register';
import Home from './components/home';
import Layout from './components/hoc/layout';
import UserDashboard from './components/user_dashboard';
import WriteReview from './components/writereview';
import RegisterLogin from './components/register_login';
import ArticlePage from './components/article';


const Routes = () => {
  return (
    
      <Layout>
        <Switch>
          <Route path="/user/dashboard" exact component={Auth(UserDashboard,'NegRedirect')}/>
          <Route path="/register" exact component={Auth(Register,'PosRedirect')}/>
          <Route path="/register_login" exact component={Auth(RegisterLogin,'PosRedirect')}/>
          <Route path="/user/writereview" exact component={Auth(WriteReview,'NegRedirect')}/>
          <Route path="/article/review/:id" exact component={Auth(ArticlePage,'Check')}/>
          <Route path="/" exact component={Auth(Home,'Check')}/>
        </Switch>
      </Layout>
    
      
    
  );
}

export default Routes;
