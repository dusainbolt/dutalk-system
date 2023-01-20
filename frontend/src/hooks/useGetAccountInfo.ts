import { getAccountSlice, getAccountStart } from '@redux/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { useEffect } from 'react';

export const useGetAccountInfo = (token: string) => {
  const { isLoadedAccount } = useAppSelector(getAccountSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && !isLoadedAccount) {
      dispatch(getAccountStart());
    }
  }, [isLoadedAccount, token]);
};
