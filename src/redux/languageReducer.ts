import i18n from 'i18next';

export interface LanguageState {
  language: 'en' | 'zh';
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' },
  ],
};

export default (state = defaultState, action) => {
  //switch语句完善Reducer功能
  switch (action.type) {
    case 'change_language':
      //处理方式不标准，有副作用
      i18n.changeLanguage(action.payload);
      return { ...state, language: action.payload };
    case 'add_language':
      return { ...state, languageList: [...state.languageList, action.payload] };
    default:
      return state;
  }
};
