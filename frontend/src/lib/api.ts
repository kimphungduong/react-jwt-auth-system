import api from './axios';

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post('/user/register', data);
  return response.data;
};