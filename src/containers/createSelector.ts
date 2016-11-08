import {TConnectorsObject, TPWStore} from '../kernel/baseTypes';

export type TypeSelector<TOwnProps> = {
  shouldComponentUpdate: boolean,
  props: any,
  run: (props: TOwnProps) => void,
  error?: string
};

export function createSelector<TOwnProps>(
  connectors: TConnectorsObject,
  store: TPWStore,
  initOwnProps: TOwnProps
): TypeSelector<TOwnProps> {
  const selector: TypeSelector<TOwnProps> = {
    shouldComponentUpdate: true,
    props: store.getState(),
    // tslint:disable-next-line
    run: function runComponentSelector(currentOwnProps) {
      try {
        const nextProps = {};
        if (selector.error || nextProps !== selector.props) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = undefined;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    },
  };
  return selector;
}
