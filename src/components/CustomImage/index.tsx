import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CustomImage = ({ ...props }) => {
  const [src, setSrc] = useState(props.src);
  
  useEffect(()=> {
    setSrc(props.src)
  },[props.src])

  const myLoader = ({ src, width, quality }: { src: string; width?: number; quality?: number }) => {
    return `${src ? src : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8awEAAhgBJ7gq3hkAAAAASUVORK5CYII='}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Image
      {...props}
      src={src ? src : '/images/item-default.svg'}
      onError={() => setSrc('/images/item-default.svg')}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8awEAAhgBJ7gq3hkAAAAASUVORK5CYII="
      loader={myLoader}
      alt={props.alt}
    />
  );
};
