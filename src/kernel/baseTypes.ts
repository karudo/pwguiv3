import {Store} from 'redux';

export type TPWState = {};

export type TPWStore = Store<TPWState>;

export interface IBaseConnectedPropMeta {
  ready: boolean; // ?
  loading: boolean;
}

export interface IBaseActions {
  setData(data: any): any;
  setMeta?(meta: IBaseConnectedPropMeta): IBaseConnectedPropMeta;
}

export interface IBaseConnectedProp {
  data: any;
  meta?: IBaseConnectedPropMeta;
  actions: IBaseActions;
}

export interface IConnector {
  select(state: TPWState, props: any): IBaseConnectedProp;
}

export type TConnectorsObject = {
  [key: string]: IConnector
};

export interface IConnectorConstructor {
  new (store: TPWStore): IConnector;
}
