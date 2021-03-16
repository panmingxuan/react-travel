import { combineReducers, configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import { actionLog } from './middlewares/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//创建持久化数据配置
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

//联合所有reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearchSlice: productSearchSlice.reducer,
  user: userSlice.reducer,
});

//威力加强版的reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//增加redux-thunk 扩展dispatch支持函数类型的请求，完成异步请求action
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLanguage, actionLog));

//使用toolkit的Store创建redux的store
const store = configureStore({
  //传入reducer
  reducer: persistedReducer,
  //使用官方语法糖getDefaultMiddleware 导入默认的中间件方法（默认包含redux-thunk）
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  //是否开启redux-devTolls
  devTools: true,
});

//创建持久化store
const persistor = persistStore(store);

//通过类型的反向注入来获取现在及未来所有的store类型
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
