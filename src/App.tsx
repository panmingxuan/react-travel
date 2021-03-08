import React from 'react';
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* 使用Switch组件解决BrowserRouter路由堆叠，
            Switch组件每次只会匹配渲染一个路由组件
        */}
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/signIn' component={SignInPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/detail/:touristRouteId' component={DetailPage} />
          <Route render={() => <h1>404 Not Found 页面去火星了！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
