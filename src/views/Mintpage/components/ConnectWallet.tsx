import Currency from "@/components/Currency";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useAstNftSaleContract } from "@/hooks/useContract";
import { useWallet } from "@/hooks/useWallet";
import { createSignature, getNft } from "@/services/nft";
import { INft } from "@/types/nft";
import { formatAddress } from "@/utils/address";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, message, notification } from "antd";
import { ethers } from "ethers";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MintNFTContext } from "..";
import ShowNFTModal from "./ShowNft";
import { CustomImage } from "@/components/CustomImage";
import { listWallet } from "@/config";

const ConnectWallet = () => {
  const { connect } = useWallet();
  const { account } = useActiveWeb3React();
  const { referCode } = useContext(MintNFTContext);
  const contractNFTSaleAddress =
    process.env.NEXT_PUBLIC_CONTRACT_NFT_SALE || "";
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>("");
  const [openShowNFTModal, setOpenShowNFTModal] = useState<boolean>(false);
  const [nftDetail, setNFTDetail] = useState<INft>();
  const [isShowBuyButton, setIsShowBuyButton] = useState<boolean>(true);

  const contractZksync = useAstNftSaleContract(contractNFTSaleAddress, true);

  const getPrice = (isWhiteListed: boolean, referralCode: string) => {
    const noCode = "NOCODE";
    let price = 0.33;
    const salePrice = 0.33;
    const whitelistPrice = 0.28;
    if (isWhiteListed && referralCode === noCode) {
      price = whitelistPrice;
    } else if (isWhiteListed && referralCode !== noCode) {
      price = whitelistPrice - (whitelistPrice * 5) / 100;
    } else if (!isWhiteListed && referralCode !== noCode) {
      price = salePrice - (salePrice * 5) / 100;
    }
    return ethers.utils.parseEther(price.toString());
  };

  const buyNFT = async () => {
    const response = await contractZksync?.boughtNft();
    let boughtNft = response ? response : 0;
    if (isLoading && !account) return;
    if (+boughtNft.toString() > 2454) {
      notification.error({ message: "NFT sold out" });
      return;
    }

    setLoading(true);
    setCurrentOrderId("");
    try {
      const data = {
        referralCode: referCode,
        walletId: account ? account : "",
      };
      const response = await createSignature(data);
      setCurrentOrderId(response.orderId);
      const options = {
        value: getPrice(response.isWhiteListed, response.referralCode),
      };
      const tx = await contractZksync?.buyNft(
        response.signature,
        response.orderId,
        response.timestamp,
        response.isWhiteListed,
        response.referralCode,
        response.user,
        options
      );
      const txwait = await tx?.wait();
      const nftBought = txwait?.events?.find(
        (item) => item.event === "NftBought"
      );
      const tokenID = nftBought?.args?.tokenId.toString();
      notification.success({ message: "Buy successfully" });
      const nftData = await getNft(tokenID);
      setNFTDetail(nftData);
      setOpenShowNFTModal(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error.data);
      if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        notification.error({
          message: "You declined the action in your wallet	",
        });
      }
      if (error && error.data) {
        notification.error({ message: error.data.message });
      }
      if (error && error.response && error.response.data) {
        notification.error({ message: error.response.data.message });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!account || !listWallet) return;
    const isShow = listWallet ? listWallet?.includes(account as string) : true;
    setIsShowBuyButton(isShow);
  }, [account]);

  return (
    <div>
      {!account ? (
        <Button
          className="uppercase !text-xl !py-4 !px-10 text-[#000] rounded-lg !h-[60px] bg-[#cccccc]"
          onClick={connect}
          size="large"
        >
          + Connect Wallet
        </Button>
      ) : (
        (
          <div>
            <Button
              className="uppercase !text-xl !py-4 !px-10 text-[#000] rounded-lg !h-[60px] bg-[#cccccc] disabled:bg-[#cccccc]"
              size="large"
              disabled
            >
              Sale Ended{" "}
              {isLoading && (
                <span className="absolute right-2">
                  <LoadingOutlined
                    style={{ color: "black", fontSize: "20px" }}
                  />
                </span>
              )}
            </Button>
            <div className="!text-xl !mt-2">{formatAddress(account)}</div>
          </div>
        )
      )}
      <ShowNFTModal
        isOpen={openShowNFTModal}
        onClose={(data) => {
          setOpenShowNFTModal(data);
        }}
      >
        <div className="bg-black flex flex-col items-center">
          {/* <Image
            
          /> */}

          <CustomImage
            src={nftDetail?.image as string}
            alt=""
            width="400"
            height="400"
            sizes="100vw"
            style={{ width: "100%", height: "auto", maxWidth: "400px" }}
          />
          <div className="text-[#ededed] p-4">
            {nftDetail?.lotteryWin && (
              <p className="text-lg mb-4 font-bold text-center">{`You WIN. You'll receive a rebate on the date to be announced by the team.`}</p>
            )}
            <span className="text-base mb-4 font-semibold">Description: </span>
            <p className="line-clamp-3">{nftDetail?.description}</p>
          </div>
        </div>
      </ShowNFTModal>
    </div>
  );
};

export default ConnectWallet;
