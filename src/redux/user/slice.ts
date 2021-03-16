import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

//创建异步action获取数据
export const signIn = createAsyncThunk(
  //action的命名空间
  'user/signIn',
  async (
    paramaters: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: paramaters.email,
      password: paramaters.password,
    });
    return data.token;
  }
);

export const userSlice = createSlice({
  //创建命名空间的名称
  name: 'user',
  //创建初始化数据
  initialState,
  //捆绑action和reducer
  //reducer为对象
  reducers: {
    //退出登录
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  //扩展的reducer，存储异步action
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return{...state,loading:true}
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
