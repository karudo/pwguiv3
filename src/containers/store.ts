import {createStore} from 'redux';
// import { reducers } from './reducers/index';
declare const window: any;

const reducers = (x: number): number => x;

const recoverState = () => ({});

export const store = createStore(
  reducers,
  recoverState(),
  window.devToolsExtension && window.devToolsExtension()
);

