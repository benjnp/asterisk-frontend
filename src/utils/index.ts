import { isNil, omitBy } from 'lodash';

export const deleteKeyNil = (params: object) => {
  return omitBy(params, isNil);
};

export const isNilOrEmpty = (val: any) => {
  return isNil(val) || val === '';
};
