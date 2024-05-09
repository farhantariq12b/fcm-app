
export interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email?: string;
  password?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  accessToken: string | null;
  refreshToken: string | null;
}
