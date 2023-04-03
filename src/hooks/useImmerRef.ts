import { useCallback, useRef, useState } from 'react';
import produce, { Draft, freeze } from 'immer';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

const isFunction = <S>(
  setStateAction: S | DraftFunction<S>
): setStateAction is DraftFunction<S> => typeof setStateAction === 'function';

type ReadOnlyRefObject<T> = {
  readonly current: T;
};

type UseImmerRef = {
  <S>(initialState: S | (() => S)): [S, Updater<S>, ReadOnlyRefObject<S>];
  <S = undefined>(): [S | undefined, Updater<S | undefined>, ReadOnlyRefObject<S | undefined>];
};
export const useImmerRef: UseImmerRef = <S>(initialState?: S | (() => S)) => {
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
};
