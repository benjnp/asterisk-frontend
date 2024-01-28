import React, { useRef, useEffect } from 'react'

const Canvas = (props: any) => {
  const {width, height, imageBackground} = props
  const font_size = 11;
  
  const canvasRef = useRef(null);
  
  const draw = (ctx: any, drops: any) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = font_size + "px serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    for( let i = 0; i < drops.length; i++ ) {
      const text = "*";
      ctx.fillText(text, i * font_size, drops[i] * font_size);
      if( drops[i] * font_size > height && Math.random() > 0.975 ) {
        drops[i] = 0;
      }
      drops[i] += Math.random() * 2;
    }
  }
  
  useEffect(() => {
    const canvas: any = canvasRef.current

    const context = canvas.getContext('2d')

    const columns = width / font_size;

    let timer: any = null;

    let drops: Array<number> = [];
    for(let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const render = () => {
      draw(context, drops)
    }

    timer = setInterval(() => {
      render()
    }, 25 - Math.floor(Math.random() * 10))

    return () => {
      clearInterval(timer);
    };

  })

  return (
    <canvas ref={canvasRef} width={width} height={height}/>
  )
}

export default Canvas