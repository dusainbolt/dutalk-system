import { PayloadName } from '@redux/reducer';
import { Account } from '@type/account';

export type GetAccountSuccessAction = Record<PayloadName, Account>;
