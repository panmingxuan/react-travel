import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
};

//创建异步action获取数据
export const getShoppingCart = createAsyncThunk(
  //action的命名空间
  'shoppingCart/getShoppingCart',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    return data.shoppingCartItems;
  }
);
/*

*/

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const checkout = createAsyncThunk('shoppingCart/checkout', async (jwt: string, thunkAPI) => {
  const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/checkout`, null, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
  return data;
});

export const clearShoppingCartItem = createAsyncThunk(
  //action的命名空间
  'shoppingCart/clearShoppingCartItem',
  async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
    //返回axios调用
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
  }
);

export const ShoppingCartSlice = createSlice({
  //创建命名空间的名称
  name: 'shoppingCart',
  //创建初始化数据
  initialState,
  //捆绑action和reducer
  //reducer为对象
  reducers: {},
  //扩展的reducer，存储异步action
  extraReducers: {
    //获取商品操作
    [getShoppingCart.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //添加商品操作
    [addShoppingCartItem.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //清空购物车
    [clearShoppingCartItem.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //提交购物车
    [checkout.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
