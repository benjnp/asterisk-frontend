import React from 'react'
import Image from 'next/image';
import CarouselCanvas from '../../../components/CarouselCanvas';
import { useWindowSize } from "@/hooks/useWindowSize"
import styled from 'styled-components';

const TextDescription = styled.p.attrs({
  className: 'md:text-[30px] text-[24px] font-bold mb-[60px] flex justify-around text-center',
  })`
      @media only screen and (max-width: 769px) {
        font-size: 25px;
      }
      @media only screen and (max-width: 576px) {
        font-size: 20px;
      }
  `;

const Banner = (props: any) => {
  const [width] = useWindowSize()
  const height = 500

  return (
    <div className='flex justify-center items-center relative'>
      <div className='flex justify-center items-center flex-col absolute'>
        <TextDescription>astSecretkey Mint Sale</TextDescription>
        <div className="flex justify-around mt-8">
          <Image src="/images/secretkey.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lgh-[250px]' width={250} height={250} alt="" />
        </div>
      </div>
      <CarouselCanvas width={width} height={height}/>
    </div>
  );
};

export default Banner;
