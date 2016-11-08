import {Store} from 'redux';

export type TPWState = {};

export type TPWStore = Store<TPWState>;

export interface IBaseActions {
  setData(data: any): any;
}

export interface IBaseConnectedProp {
  data: any;
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
