export function autoBindMethod<T extends Function>(
  target: Object,
  key: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  // typed-autobind-decorator
  const fn: any = descriptor.value;

  return {
    configurable: true,

    get() {
      if (this === fn.prototype) {
        return fn;
      }
      return fn.bind(this);
    },

    set(newValue: any) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue,
      });
      return newValue;
    },
  };
}
