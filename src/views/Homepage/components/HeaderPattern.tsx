import {useState} from "react";
import { TypeAnimation } from 'react-type-animation';
import handleViewport, { type InjectedViewportProps } from 'react-in-viewport';

interface Props {
  title: string;
}

interface InternalProps {
  show: boolean
}

const HeaderHoc = (props: InjectedViewportProps<HTMLDivElement> & InternalProps & Props) => {
  const { inViewport, forwardedRef, title, show } = props;

  return (
    <div className="header-pattern" ref={forwardedRef}>
      {
        show && 
        <TypeAnimation
          sequence={[
            title,
            1000
          ]}
          wrapper="h2"
          cursor={true}
          repeat={0}
          className="text-[24px] md:text-[50px]"
          style={{ display: 'inline-block' }}
        />
      }
      {
        !show && 
        <TypeAnimation
          sequence={[
            '',
          ]}
          wrapper="h2"
          cursor={true}
          repeat={0}
          className="text-[24px] md:text-[50px]"
          style={{ display: 'inline-block' }}
        />
      }
    </div>
    );
};

const ViewportHeader = handleViewport(HeaderHoc);

const HeaderPattern = (props: Props) => {
  const { title } = props

  const [show, setShow] = useState(false)

  const showHeader = () => {
    setShow(true)
  }

  return (
    <ViewportHeader title={title} show={show} onEnterViewport={showHeader} />
  );
};

export default HeaderPattern;
