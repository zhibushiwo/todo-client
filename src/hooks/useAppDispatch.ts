import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

export const useAppDispatch = useDispatch.withTypes<Dispatch>();
