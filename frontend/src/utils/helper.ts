import { AppError } from '@type/context';

export default class Helper {
  static objValue = (object: any, key: any): any => {
    return object[key];
  };

  static delay = (timeMilliSecond = 1000) => new Promise((resolve) => setTimeout(() => resolve(null), timeMilliSecond));

  static splitString = (hex: string | null | undefined, numStart = 6, numEnd = 4): string => {
    if (!hex?.length) return '';
    if (hex?.length < numStart + numEnd) return hex;
    return `${hex?.substring(0, numStart)}...${hex.substring(hex.length - numEnd)}`;
  };

  static isOkResponse = (response: AppError) => {
    return !response?.error && !response.errorCode;
  };
}
