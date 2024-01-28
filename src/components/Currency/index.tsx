import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { FC, PropsWithChildren } from 'react';

import { formatEther } from '@ethersproject/units';

type Value = string | number | undefined | BigNumber;

interface Props extends PropsWithChildren {
  value: Value;
  isWei?: boolean;
  rounded?: boolean;
  decimal?: number;
}

const getValue = (value: Value, isWei: boolean | undefined, rounded: boolean | undefined, decimal = 3) => {
  let valueShow = '---';
  let fullValue = '---';
  let isRounded = false;
  try {
    if (!isNil(value)) {
      const valueTemp = value instanceof BigNumber ? value.toFixed() : value;
      const valTemp = isWei ? formatEther(valueTemp) : valueTemp;
      const valueBig = BigNumber(valTemp);
      if (valueBig.isNaN()) {
        throw new Error();
      }
      const valueStr = valueBig.toFixed(decimal, BigNumber.ROUND_FLOOR);
      valueShow = BigNumber(valueStr).toFormat();
      fullValue = valueBig.toFormat();
      isRounded = valueShow !== fullValue;

      if (rounded && valueBig.gt(10 ** 3)) {
        valueShow = '> 1,000';
        isRounded = true;
      } else if (rounded && valueBig.lt(10 ** -3)) {
        valueShow = '< 0.001';
        isRounded = true;
      }
    }
  } catch {
    valueShow = '---';
    fullValue = '---';
    isRounded = false;
  }
  return {
    value: valueShow,
    fullValue,
    isRounded,
  };
};

const Currency: FC<Props> = ({ value, isWei, rounded, decimal }) => {
  const { value: valueShow, isRounded, fullValue } = getValue(value, isWei, rounded, decimal);
  if (!isRounded) return <>{valueShow}</>;
  return <Tooltip title={fullValue}>{valueShow}</Tooltip>;
};

export default Currency;
