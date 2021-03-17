import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkout } from '../shoppingCart/slice';
import axios from 'axios';

interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
};

//创建异步action获取数据
export const placeOrder = createAsyncThunk(
  //action的命名空间
  'order/placeOrder',
  async (parameters: { jwt: string; orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data;
  }
);

export const orderSlice = createSlice({
  //创建命名空间的名称
  name: 'order',
  //创建初始化数据
  initialState,
  //捆绑action和reducer
  //reducer为对象
  reducers: {},
  //扩展的reducer，存储异步action
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //异步action进行协调通信
    [checkout.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
