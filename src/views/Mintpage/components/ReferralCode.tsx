import { Input } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect } from "react";
import { MintNFTContext } from "..";

const ReferralCode = () => {
  const { referCode, updateReferCode } = useContext(MintNFTContext);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateReferCode(value);
  };

  useEffect(() => {
    if (router.query && router.query.code) {
      updateReferCode(router.query.code as string);
    }
  }, [router]);

  return (
    <div className="container-sm mb-16 flex flex-col justify-center items-center">
      <h3 className="mb-6 text-[#ededed]">Referral Code (Optional)</h3>
      <Input
        size="large"
        className="h-[60px] max-w-[283px] lg:max-w-[388px] bg-black text-white text-center"
        value={referCode}
        onChange={handleChange}
      />
    </div>
  );
};

export default ReferralCode;
