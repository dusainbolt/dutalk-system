import dayjs from 'dayjs';
import Constant from './constant';
import { timeAgo } from './timeAgo';

export default class Date {
  static readonly oneHours = 60 * 60;

  static isDayjs = (value) => value instanceof dayjs;

  static renderDayjs = (value) => (Date.isDayjs(value) ? value : dayjs(value));

  static toDateStr = (value, format = Constant.date.D_M_Y) => Date.renderDayjs(value).format(format);

  static toDateHoursStr = (value, format = Constant.date.D_M_Y_H_M) => Date.renderDayjs(value).format(format);

  static generateDuration = (value: string) => {
    return timeAgo(value);
  };

  static diff = (smallDate: string, bigDate: string) => {
    return Date.renderDayjs(bigDate).diff(Date.renderDayjs(smallDate));
  };
}
