import transform from 'lodash/transform.js';

const getWrapper = () => {
  return (module) => {
    return transform(module, (result, value, key) => {
      result[key] = (...args) => value(...args).catch(args[2]);
    });
  };
};

export const wrapAsync = getWrapper();
