import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, SxProps, Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { OptionSelect } from '@type/field';
import Constant from '@utils/constant';
import Date from '@utils/date';
import Helper from '@utils/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC } from 'react';

export const fieldSelectStyle = makeStyles({
  label: {
    top: -7,
    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
});

export interface FieldDateType {
  label?: string;
  placeholder?: string;
  className?: string;
  options: OptionSelect[];
  sx?: SxProps<Theme>;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldDate: FC<FieldDateType> = ({ label, className, sx, field }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const handleChange = (newValue): any => {
    setFieldValue(field?.name as string, newValue);
  };

  return (
    <Box sx={{ ...sx }} className={clsx(className)}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label={label}
          value={Date.renderDayjs(field?.value)}
          inputFormat={Constant.date.D_M_Y}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField size="small" {...params} error={isError} helperText={fieldTouch && fieldError} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default FieldDate;
