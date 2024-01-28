export interface ICreateSignatureReq {
  referralCode: string,
  walletId: string
}

export interface ISignture {
  isWhiteListed: boolean,
  orderId: string,
  referralCode: string,
  signature: string,
  timestamp: number,
  user: string,
}

export interface INft {
  name: string,
  image: string,
  description: string
  lotteryWin: boolean
}