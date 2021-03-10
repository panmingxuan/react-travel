export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: 'zh' | 'en';
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

export type LanguageActionType = ChangeLanguageAction | AddLanguageAction;

//创建language的action工厂

export const changeLanguageActionCreator = (languageCode: 'zh' | 'en'): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { name, code },
  };
};
