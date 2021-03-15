import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

//使用createAsyncThunk创建异步action方法，并简单使用
// export const getProductDetail = createAsyncThunk(
//   //action的命名空间
//   'productDetail/getProductDetail',
//   async (touristRouteId: string, thurnkAPI) => {
//     thurnkAPI.dispatch(productDetailSlice.actions.fetchStart());
//     try {
//       const { data } = await axios.get(
//         `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
//       );
//       thurnkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
//     } catch (error) {
//       thurnkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message));
//     }
//   }
// );

//创建异步action获取数据
export const getProductDetail = createAsyncThunk(
  //action的命名空间
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
  }
);

export const productDetailSlice = createSlice({
  //创建命名空间的名称
  name: 'productDetail',
  //创建初始化数据
  initialState,
  //捆绑action和reducer
  //reducer为对象
  reducers: {
    fetchStart: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  //扩展的reducer，存储异步action
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
