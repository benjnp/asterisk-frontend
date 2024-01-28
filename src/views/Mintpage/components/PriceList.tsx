const PriceList = () => {
  return (
    <div className="text-base mx-7 md:mx-0 md:mt-[68px] mt-[80px]">
      <h2 className="mb-8 text-[#ededed] text-center font-bold">Price List</h2>
      {/* <div className="px-10 py-4 flex justify-between border-t-0 border-l-0 border-r-0 border-b border-solid border-b-[#808080]">
        <h2 className="font-bold">Price List</h2>
      </div> */}
      <div className="md:px-10 px-3 py-4 flex justify-between border-t-0 border-l-0 border-r-0 border-b border-solid border-b-[#808080]">
        <span>Public</span>
        <span className="font-bold">0.33 ETH</span>
      </div>
      <div className="md:px-10 px-3 py-4 flex justify-between border-t-0 border-l-0 border-r-0 border-b border-solid border-b-[#808080]">
        <span>Referral Code (5% off)</span>
        <span className="font-bold">0.3135 ETH</span>
      </div>
      <div className="md:px-10 px-3 py-4 flex justify-between border-t-0 border-l-0 border-r-0 border-b border-solid border-b-[#808080]">
        <span>WL</span>
        <span className="font-bold">0.28 ETH</span>
      </div>
      <div className="md:px-10 px-3 py-4 flex justify-between">
        <span>WL + Referral Code</span>
        <span className="font-bold">0.266 ETH</span>
      </div>
    </div>
  );
};

export default PriceList;
