import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/user/me');
      return data;
    },
    enabled: !!localStorage.getItem('refreshToken'),
    retry: false,
  });
};