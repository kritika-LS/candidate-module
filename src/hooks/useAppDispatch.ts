import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import { AppDispatch } from '../store/types';
import { RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
