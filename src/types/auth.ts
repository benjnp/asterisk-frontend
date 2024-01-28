export interface ITokens {
  access: {
    expires: string;
    token: string;
  };
  refresh: {
    expires: string;
    token: string;
  };
}

export interface IAuth {
  tokens: ITokens;
  user: IUser;
}

export interface IUser {
  _id: string;
  address: string;
  role: string;
  banned: boolean;
  nonce: string;
  username: string;
  fullname?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRefreshToken {
  user: string;
  tokens: ITokens;
}
