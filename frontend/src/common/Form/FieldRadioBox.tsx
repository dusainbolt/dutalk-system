/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, SxProps, Theme } from '@mui/material';
import { OptionSelect } from '@type/field';
import Helper from '@utils/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC } from 'react';
import { FormLabel } from './FormLabel';

export interface FieldRadioBoxType {
  label?: string;
  className?: string;
  sx?: SxProps<Theme>;
  options: OptionSelect[];
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldRadioBox: FC<FieldRadioBoxType> = ({ label, options, className, sx, field }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const handleChange = (event) => {
    setFieldValue(field?.name as string, parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ mt: 2, ...sx }} className={clsx(className)}>
      <FormControl error={isError} fullWidth>
        <FormLabel fieldName={field?.name} label={label} />
        <RadioGroup name={field?.name} value={field?.value?.toString()} onChange={handleChange}>
          {options.map((item, index) => (
            <FormControlLabel key={index} value={item.value} label={item.label} control={<Radio size="small" />} />
          ))}
        </RadioGroup>
        {fieldTouch && fieldError && <FormHelperText>{fieldError}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default FieldRadioBox;
