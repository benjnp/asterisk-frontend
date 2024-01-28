import React from 'react'
import Image from 'next/image';
import CarouselCanvas from '../components/CarouselCanvas';
import { useWindowSize } from "@/hooks/useWindowSize"

const Banner = () => {
  const [width] = useWindowSize()
  const height = 500
  
  return (
    <div className='flex justify-center items-center relative'>
      <div className='flex justify-center items-center flex-col absolute'>
        <Image src="/images/secretkey.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lgh-[250px]' width={250} height={250} alt="" />
      </div>
      <CarouselCanvas width={width} height={height}/>
    </div>
  );
};

export default Banner;
