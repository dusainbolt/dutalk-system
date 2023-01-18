import { AnyAction, Store } from 'redux';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { PayloadName } from '@redux/reducer';

export type SSRContext = GetServerSidePropsContext & {
  store: Store<any, AnyAction>;
};

export type SSGContext = GetStaticPropsContext & {
  store: Store<any, AnyAction>;
};

export interface AppError {
  error: string;
  errorCode: string;
  message: string;
}

export type ErrorAction = Record<PayloadName, AppError>;
