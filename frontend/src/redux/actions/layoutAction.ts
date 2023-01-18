import { PayloadName } from '@redux/reducer';
import { AppDialog } from '@type/layout';

export type OpenDialogAction = Record<PayloadName, AppDialog>;
