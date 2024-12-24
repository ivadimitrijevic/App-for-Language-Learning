import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['currentUser'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
