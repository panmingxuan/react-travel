import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';

//从泛型上添加RootState的类型描述，解耦组件和store中的state
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
