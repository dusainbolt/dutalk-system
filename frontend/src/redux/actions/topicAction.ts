import { PayloadName } from '@redux/reducer';
import { GetMyTopicsDto, InputTopic, Topic } from '@type/topic';

export type AddTopicStartAction = Record<PayloadName, InputTopic>;
export type AddTopicSuccessAction = Record<PayloadName, Topic>;
export type GetMyTopicsStartAction = Record<PayloadName, GetMyTopicsDto>;
export type GetMyTopicsSuccessAction = Record<PayloadName, Topic[]>;
