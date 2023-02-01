import { InputTopic } from '@type/topic';
import Validate from '@utils/validate';
import * as yup from 'yup';

export const valuesCreateTopic: InputTopic = {
  title: '',
  description: '',
};

export const validateCreateTopic = yup.object({
  title: yup
    .string()
    .required(Validate.require('Tiêu đề'))
    .min(5, Validate.during(5, 255))
    .max(255, Validate.during(5, 255)),
  description: yup
    .string()
    .required(Validate.require('Mô tả'))
    .min(5, Validate.during(5, 255))
    .max(255, Validate.during(5, 255)),
});
