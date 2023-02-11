import { getAccountSlice } from '@redux/slices/accountSlice';
import { getAuthSlice } from '@redux/slices/authSlice';
import { initSocketStart } from '@redux/slices/socketSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useEffect } from 'react';

// export interface UseSocket

function useSocket(): any {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(getAuthSlice);
  const { account } = useAppSelector(getAccountSlice);
  const isLogin = token && account?.id;

  const onDispatchInitSocket = () => {
    dispatch(initSocketStart());
  };

  useEffect(() => {
    if (isLogin) {
      onDispatchInitSocket();
    }
  }, [isLogin]);
}

export default useSocket;
