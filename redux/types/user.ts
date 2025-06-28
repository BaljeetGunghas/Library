export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;
  jsonResponse: User | null;
  output: number;
}

export interface LoginResponse extends RegisterResponse {}
