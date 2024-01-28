import React, { useEffect, useState } from 'react'
import Image from "next/image";
import CarouselCanvas from '../../../components/CarouselCanvas';
import { useWindowSize } from "@/hooks/useWindowSize"
import DiscordButton from '../components/DiscordButton';

const Banner = (props: any) => {
    const [width, height] = useWindowSize()
    const [logoSpin, setLogoSpin] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setLogoSpin(false)
        }, 4000);
    })
    return (
        <div className='flex justify-center items-center relative'>
            <div className='flex justify-center items-center absolute flex-col md:flex-row'>
                {
                    logoSpin 
                    ? 
                    <Image
                        src="/images/logo_ani.png"
                        width={100}
                        height={100}
                        className="w-[50px] h-[57px] md:w-[100px] md:h-[110px]"
                        alt="icon"
                    />
                    :
                    <Image
                        src="/images/hexa-logo.png"
                        width={100}
                        height={100}
                        className="w-[50px] h-[57px] md:w-[100px] md:h-[110px]"
                        alt="icon"
                    />
                }
                <p className='mt-10 md:ml-10 text-[28px] md:text-[30px] lg:text-4xl'>CRYPTO UNLEASHED</p>
            </div>
            <CarouselCanvas width={width} height={height}/>
            <DiscordButton />
        </div>
    )
}

export default Banner