export type TypeSelector = {
  shouldComponentUpdate: boolean,
  props: any,
  run: (props: any) => void,
  error?: string
};

export function createSelector(sourceSelector: any, getState: any, initProps: any) {
  const selector: TypeSelector = {
    shouldComponentUpdate: true,
    props: sourceSelector(getState(), initProps),
    run: function runComponentSelector(currentProps) {
      try {
        const nextProps = sourceSelector(getState(), currentProps);
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
