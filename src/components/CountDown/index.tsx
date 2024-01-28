/* eslint-disable react-hooks/exhaustive-deps */
import { notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const CountDownComponent = ({ timeProp }: { timeProp: any }) => {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const countDownDate = moment(timeProp).utc().valueOf();
  let timer: any = null;
  let now = 0;
  let distance = 0;

  const calcCountDown = () => {
    const days =
      Math.floor(distance / (1000 * 60 * 60 * 24)) < 0 ? '00' : Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    const hours =
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 0
        ? '00'
        : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) > 9
        ? '' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        : '0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes =
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) < 0
        ? '00'
        : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) > 9
        ? '' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        : '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds =
      Math.floor((distance % (1000 * 60)) / 1000) < 0
        ? '00'
        : Math.floor((distance % (1000 * 60)) / 1000) > 9
        ? '' + Math.floor((distance % (1000 * 60)) / 1000)
        : '0' + Math.floor((distance % (1000 * 60)) / 1000);

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    now = moment().utc().valueOf();
    distance = countDownDate - now;
    calcCountDown();

    timer = setInterval(() => {
      now = moment().utc().valueOf();
      distance = countDownDate - now;
      calcCountDown();

      if (distance < 0) {
        setDays('00');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    timeProp && (
      <div className="flex justify-around">
        <div className="flex">
          <div className="md:mr-10 mr-8 text-center">
            <p className="font-light md:text-[60px] text-[48px] mb-5">{days}</p>
            <p className="font-light md:text-[18px] text-[16px] mb-0 text-[#ededed]">days</p>
          </div>
          <div className="md:mr-10 mr-8 text-center">
            <p className="font-light md:text-[60px] text-[48px] mb-5">{hours}</p>
            <p className="font-light md:text-[18px] text-[16px] mb-0 text-[#ededed]">hours</p>
          </div>
          <div className="md:mr-10 mr-8 text-center">
            <p className="font-light md:text-[60px] text-[48px] mb-5">{minutes}</p>
            <p className="font-light md:text-[18px] text-[16px] mb-0 text-[#ededed]">minutes</p>
          </div>
          <div className=" text-center">
            <p className="font-light md:text-[60px] text-[48px] mb-5">{seconds}</p>
            <p className="font-light md:text-[18px] text-[16px] mb-0 text-[#ededed]">seconds</p>
          </div>
        </div>
      </div>
    )
  );
};

export default CountDownComponent;
