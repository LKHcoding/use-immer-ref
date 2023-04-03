import { useCallback, useRef, useState } from 'react';
import produce, { Draft, freeze } from 'immer';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>, ReadOnlyRefObject<S>];

const isFunction = <S>(
  setStateAction: S | DraftFunction<S>
): setStateAction is DraftFunction<S> => typeof setStateAction === 'function';

type ReadOnlyRefObject<T> = {
  readonly current: T;
};

export function useImmerRef<S = any>(initialValue: S | (() => S)): ImmerHook<S>;
export function useImmerRef<S = undefined>(): ImmerHook<S>;
export function useImmerRef<S>(initialState?: S | (() => S)) {
  const [state, setState] = useState(freeze(initialState, true));
  const ref = useRef(state);

  const dispatch = useCallback((setStateAction: any) => {
    if (isFunction(setStateAction)) {
      const produced = produce(setStateAction);
      const result = produced(ref.current);
      ref.current = result;
      setState(result);
      return;
    }

    ref.current = freeze(setStateAction, true);
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}
