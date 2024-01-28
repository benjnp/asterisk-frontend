import React, { memo } from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
  prefix?: React.ReactNode;
}

const ButtonCustom = memo((props: Props) => {
  const { prefix, text, onClick = () => {}, className = '' } = props;

  return (
    <div
      className={`flex items-center cursor-pointer whitespace-nowrap px-[10px] py-3 text-white text-sm px-4 bg-[#0A84FF] rounded-lg font-sfprotext ${className}`}
      onClick={onClick}
    >
      {prefix}
      <div className="font-medium ">{text}</div>
    </div>
  );
});

ButtonCustom.displayName = 'ButtonCustom';

export default ButtonCustom;
