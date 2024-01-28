import { ICreateSignatureReq, INft, ISignture } from "@/types/nft";
import axiosApiInstance from "@/utils/axios";

export async function createSignature(request: ICreateSignatureReq) {
  const data = await axiosApiInstance.post(`/nft/signature`, request);
  return data.data as ISignture;
}

export async function getNft(id: number) {
  const data = await axiosApiInstance.get(`/nft/info/${id}`);
  return data.data as INft;
}