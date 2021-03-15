import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

//创建异步action获取数据
export const searchProduct = createAsyncThunk(
  //action的命名空间
  'productSearchSlice/searchProduct',
  async (
    paramaters: {
      keywords: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    //配置搜索的url
    let url = `http://123.56.149.216:8080/api/TouristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
    if (paramaters.keywords) {
      url += `&keyword=${paramaters.keywords}`;
    }
    const response = await axios.get(url);
    return { data: response.data, pagination: JSON.parse(response.headers['x-pagination']) };
  }
);

export const productSearchSlice = createSlice({
  //创建命名空间的名称
  name: 'productSearchSlice',
  //创建初始化数据
  initialState,
  //捆绑action和reducer
  //reducer为对象
  reducers: {},
  //扩展的reducer，存储异步action
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
