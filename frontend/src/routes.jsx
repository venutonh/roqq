import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';



import Register from './components/register_login/register';
import Home from './components/home';
import Layout from './components/hoc/layout';

import RegisterLogin from './components/register_login';

const Routes = () => {
  return (
    
      <Layout>
        <Switch>
          <Route path="/register" exact component={Register}/>
          <Route path="/register_login" exact component={RegisterLogin}/>
          <Route path="/" exact component={Home}/>
          
      
         
        </Switch>
      </Layout>
    
      
    
  );
}

export default Routes;
