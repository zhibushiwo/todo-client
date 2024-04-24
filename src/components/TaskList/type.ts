import { ITodoList, ITodoGroup } from '@/type';
import { LIST_SYMBOL, GROUP_SYMBOL } from './constant';

export type TIndex = number | null | undefined;

export type TGIndex = number;

export type TSwitchPath = [TGIndex, TIndex?];

export interface IHandleSwitch {
  (prev: TSwitchPath, next: TSwitchPath): void;
}

export interface IDragList extends Partial<ITodoList> {
  index?: number;
  gIndex: number;
  type: typeof LIST_SYMBOL;
}

export interface IDragGroup extends Partial<ITodoGroup> {
  index: number;
  type: typeof GROUP_SYMBOL;
}
