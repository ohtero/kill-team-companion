import { useEffect, useReducer, useRef } from 'react';
import { TacOp } from '../../../types/data';

export function useGetTacOps() {
  const initState: FetchState = { data: null, pending: false, error: null };
  const [fetchResult, dispatch] = useReducer(reducer, initState);
  const cacheRef = useRef<TacOp[] | null>(null);

  interface FetchState {
    data: null | TacOp[];
    pending: boolean;
    error: string | null;
  }

  type FetchAction =
    | { type: 'fetchInit' }
    | { type: 'fetchSuccess'; payload: null | TacOp[] }
    | { type: 'fetchError'; error: string | null };

  function reducer(state: FetchState, action: FetchAction): FetchState {
    switch (action.type) {
      case 'fetchInit':
        return { ...state, pending: true, error: null };
      case 'fetchSuccess':
        return { ...state, pending: false, data: action.payload };
      case 'fetchError':
        return { ...state, pending: false, error: action.error };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    async function getTacOps(): Promise<void> {
      dispatch({ type: 'fetchInit' });
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/match/tac-ops`,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              'content-type': 'application/json'
            }
          }
        );
        if (!res.ok) {
          throw new Error();
        }
        const data = (await res.json()) as TacOp[];
        dispatch({ type: 'fetchSuccess', payload: data });
        cacheRef.current = data;
      } catch (error) {
        dispatch({ type: 'fetchError', error: 'Could not load Tac Ops' });
      }
    }

    if (cacheRef.current) {
      dispatch({ type: 'fetchSuccess', payload: cacheRef.current });
    } else {
      void getTacOps();
    }
  }, []);
  return fetchResult;
}
