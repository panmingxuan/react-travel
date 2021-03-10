import { createStore, combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';

//联合所有reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(rootReducer);

//通过类型的反向注入来获取现在及未来所有的store类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
