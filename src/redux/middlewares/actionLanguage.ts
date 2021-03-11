import { Middleware } from 'redux';
import { CHANGE_LANGUAGE } from '../language/languageActions';
import i18n from 'i18next';

//利用中间件的形式修改网站语言
export const actionLanguage: Middleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_LANGUAGE) {
    //处理方式不标准，有副作用
    i18n.changeLanguage(action.payload);
  }
  next(action);
};
