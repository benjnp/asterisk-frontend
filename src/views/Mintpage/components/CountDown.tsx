import CountDownComponent from '@/components/CountDown';

const CountDown = () => {
  return (
    <div className="mt-[70px] mb-16 mx-8 lg:mx-0">
      <h2 className="text-center font-bold md:mb-5 mb-8">Count down</h2>
      <CountDownComponent timeProp={new Date(Date.UTC(2023, 4, 14, 15, 0, 0))} />
      <div className="flex flex-row justify-center">
        <div className='flex flex-col rounded border border-white border-solid text-center mr-3 mt-11 py-8 px-4 lg:px-8 opacity-50'>
          <p className="font-bold text-[16px]">Start</p>
          <p className='font-light text-[16px] mb-0'>2023-05-13</p>
          <p className='font-light text-[16px] mb-0'>12:00pm(UTC)</p>
        </div>
        <div className='flex flex-col rounded border border-white border-solid text-center mt-11 py-8 px-4 lg:px-8'>
          <p className="font-bold text-[16px]">End</p>
          <p className='font-light text-[16px] mb-0'>2023-05-14</p>
          <p className='font-light text-[16px] mb-0'>15:00pm(UTC)</p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
