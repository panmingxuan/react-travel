import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';

//正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
//推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
//推荐信息api调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

//定义action的类型
interface FetchRecommendProductsStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductsFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductAction =
  | FetchRecommendProductsStartAction
  | FetchRecommendProductsSuccessAction
  | FetchRecommendProductsFailAction;

export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductsStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  };
};

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductsSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductsFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  };
};

//使用thunk处理异步请求
// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
export const giveMeDataActionCreator = (): ThunkAction<
  void,
  RootState,
  unknown,
  RecommendProductAction
> => async (dispatch, getState) => {
  dispatch(fetchRecommendProductStartActionCreator());
  try {
    const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections');
    dispatch(fetchRecommendProductSuccessActionCreator(data));
  } catch (error) {
    dispatch(fetchRecommendProductFailActionCreator(error.message));
  }
};
