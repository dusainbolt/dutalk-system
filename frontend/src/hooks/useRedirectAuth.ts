import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { useRouter } from 'next/dist/client/router';

export const useRedirectAuth = (props: { redirect: string; isEmptyToken: boolean }) => {
  const { token } = useAppSelector(getAuthSlice);
  const router = useRouter();
  const isClient = typeof window !== 'undefined';
  if (isClient && ((!props.isEmptyToken && !token) || (props.isEmptyToken && token))) {
    router.push(props.redirect || '/');
  }
  return token;
};
