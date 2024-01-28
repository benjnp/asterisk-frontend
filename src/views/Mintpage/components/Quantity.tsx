import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useAstNftSaleContract } from "@/hooks/useContract";
import { addComma } from "@/utils/number";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

// const InputNumberStyled = styled.div`
//   .ant-input-number {
//     .ant-input-number-input {
//       height: 60px;
//       line-height: 60px;
//       color: #ffffff;
//       text-align: center;
//     }
//     .ant-input-number-handler-wrap {
//       display: none;
//       font-size: 16px;
//     }
//   }
// `;

const Quantity = () => {
  // const [count, setCount] = useState<number>(0);
  const [totalNft, setTotalNft] = useState<number>(2450);
  const contractNFTSaleAddress =
    process.env.NEXT_PUBLIC_CONTRACT_NFT_SALE || "";
  const [airdrop, setAirdrop] = useState<number>(2500000);
  const [bonus, setBonus] = useState<number>(2000.5);
  const [total, setTotal] = useState<number>(2502000.5);

  const contractZksync = useAstNftSaleContract(contractNFTSaleAddress, false);
  // const increment = () => {
  //   setCount(count + 1);
  // };

  // const decrement = () => {
  //   if (count === 0) {
  //     return;
  //   }
  //   setCount(count - 1);
  // };

  // const onChangeInput = (value: number) => {
  //   console.log('changed', value);
  //   setCount(value ? value : 0);
  // };

  const getBoughtNft = async () => {
    try {
      const response = await contractZksync?.boughtNft();
      let boughtNft = response ? response : 0;
      const totalNft = 2450 - +boughtNft;
      setTotalNft(totalNft);
      if (+boughtNft === 0) {
        boughtNft = 1;
      }
      const currentAirdrop = 2500000 / +boughtNft;
      const currentBonus = 2000.5 - +boughtNft * 0.5;
      const total = +currentBonus.toFixed(1) + Math.floor(currentAirdrop);

      setAirdrop(Math.floor(currentAirdrop));
      setBonus(+currentBonus.toFixed(1));
      setTotal(total);
    } catch (error) {}
  };

  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      getBoughtNft();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container-sm mb-16">
      <h2 className="mb-6 text-[#ededed] text-center font-bold">Quantity</h2>
      <div className="flex items-end justify-center text-4xl text-[#cccccct] mb-10">
        <span className="text-[#ededed] font-medium md:text-6xl text-5xl -mb-1">
          {addComma(totalNft, 0)}
        </span>
        <span className="mx-4">/</span>
        <span>2,450</span>
      </div>
      <div className="flex flex-col items-center justify-left mt-8">
        <div className="justify-left">
          <div>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              Current Airdrop:
            </span>
            <span className="font-medium text-[24px] mx-2 leading-7 tracking-[.075em]">
              {addComma(airdrop, 0)}
            </span>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              AST/veAST
            </span>
          </div>
          <div>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              Current Bonus:
            </span>
            <span className="font-medium text-[24px] mx-2 leading-7 tracking-[.075em]">
              {addComma(bonus, 1)}
            </span>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              AST/veAST
            </span>
          </div>
          <div>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              Total:
            </span>
            <span className="font-medium text-[24px] mx-2 leading-7 tracking-[.075em]">
              {addComma(total, 1)}
            </span>
            <span className="font-light text-[16px] leading-7 tracking-[.075em]">
              /mint
            </span>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-left">
      </div>
      <div className="flex flex-row items-center justify-left">
      </div> */}
      {/* <div className="flex flex-row items-center justify-center">
        <Button icon={<PlusOutlined className='group-hover:text-white'/>} onClick={increment} className='bg-[#808080] border-none group '/>
        <InputNumberStyled>
          {' '}
          <InputNumber
            min={0}
            value={count}
            onChange={(value) => onChangeInput(value as number)}
            className="h-[60px] bg-black text-white mx-4"
          />
        </InputNumberStyled>

        <Button icon={<MinusOutlined className='group-hover:text-white'/>} onClick={decrement} className='bg-[#808080] border-none group '/>
      </div> */}
    </div>
  );
};

export default Quantity;
