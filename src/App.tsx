import React, { useEffect } from 'react';
import styles from './App.module.css';
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from './pages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

//创建私有路由
const PrvateRouter = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: 'signIn' }} />
    );
  };
  return <Route render={routeComponent} {...rest} />;
};

function App() {
  const jwt = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

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
          <Route path='/search/:keywords?' component={SearchPage} />
          <PrvateRouter
            isAuthenticated={jwt !== null}
            path='/shoppingCart'
            component={ShoppingCartPage}
          />
          <PrvateRouter
            isAuthenticated={jwt !== null}
            path='/placeOrder'
            component={PlaceOrderPage}
          />
          <Route render={() => <h1>404 Not Found 页面去火星了！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
