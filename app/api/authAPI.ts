import { LoginForm, LoginResponse, RegisterForm, RegisterResponse } from '@/redux/types/user';
import axios from 'axios';

export const registerUser = async (data: RegisterForm): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
      data,
      { withCredentials: true }
    );
    return response.data;  // <-- only the data, not the full response
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      jsonResponse: null,
      output: 0,
    };
  }
};

export const loginUser = async (data: LoginForm): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      jsonResponse: null,
      output: 0,
    };
  }
};


export const logoutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/logout`,
      {},
      { withCredentials: true }
    );

    return {
      success: true,
      message: response.data?.message || 'Logout successful',
    };
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }


    return {
      success: false,
      message: errorMessage,
    };
  }
};