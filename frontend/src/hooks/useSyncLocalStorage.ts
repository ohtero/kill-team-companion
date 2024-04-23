import { useSyncExternalStore } from 'react';

export function useSyncLocalStorage(key: string) {
  function subscribe(listener: () => void) {
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  }
  function getSnapshot() {
    return window.localStorage.getItem(key);
  }
  return useSyncExternalStore(subscribe, getSnapshot);
}
