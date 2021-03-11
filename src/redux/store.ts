import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';

//联合所有reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

//增加redux-thunk 扩展dispatch支持函数类型的请求，完成异步请求action
const store = createStore(rootReducer, applyMiddleware(thunk));

//通过类型的反向注入来获取现在及未来所有的store类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
