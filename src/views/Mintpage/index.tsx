import { useZksyncProvider } from "@/hooks/useProviderOrSigner";
import { createContext, useEffect, useState } from "react";
import { Provider } from "zksync-web3";
import Banner from "./components/Banner";
import ConnectWallet from "./components/ConnectWallet";
import CountDown from "./components/CountDown";
import PriceList from "./components/PriceList";
import Quantity from "./components/Quantity";
import ReferralCode from "./components/ReferralCode";
import { formatEther } from "@ethersproject/units";
import SaleDetail from "./components/SaleDetail";
import { listWallet, targetChainId } from "@/config";

interface IMintNFTContextType {
  updateReferCode: (code: string) => void;
  referCode: string;
}

export const MintNFTContext = createContext<IMintNFTContextType>({
  updateReferCode: () => {},
  referCode: "",
});

const MintPageView = () => {
  const [referCode, setReferCode] = useState<string>("");

  return (
    <MintNFTContext.Provider
      value={{
        referCode,
        updateReferCode: (code: string) => setReferCode(code),
      }}
    >
      <Banner />
      <div className="mint-page">
        <div className="container-sm mt-5">
          <PriceList />
          <CountDown />
          <Quantity />
          <ReferralCode />
          <div className="container-sm flex justify-around">
            <ConnectWallet />
          </div>
        </div>
        <SaleDetail />
      </div>
    </MintNFTContext.Provider>
  );
};

export default MintPageView;
