/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, FormControl, FormHelperText, Select, SxProps, Theme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { OptionSelect } from '@type/field';
import Helper from '@utils/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC } from 'react';
import { FormLabel } from './FormLabel';

export const fieldSelectStyle = makeStyles({
  label: {
    top: -7,
    '&.MuiInputLabel-shrink': {
      top: 0,
    },
  },
});

export interface FieldSelectType {
  label?: string;
  className?: string;
  options: OptionSelect[];
  sx?: SxProps<Theme>;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
  fieldProps?: any;
}

const FieldSelect: FC<FieldSelectType> = ({ label, options, className, field, sx, fieldProps }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  // const styles = fieldSelectStyle();

  const handleChange = (event) => {
    setFieldValue(field?.name as string, event.target.value);
  };

  options = options?.length ? [{ label: '', value: '' }].concat(options) : options;

  return (
    <Box
      sx={{
        mt: 2,
        ...sx,
        '& .Mui-disabled': {
          background: '#ebebeb',
        },
      }}
      className={clsx(className)}
    >
      <FormControl error={isError} fullWidth>
        <FormLabel fieldName={field?.name} label={label} />
        <Select
          labelId={`${field?.name}-label`}
          id={field?.name}
          name={field?.name}
          size="small"
          value={field?.value}
          onChange={handleChange}
          {...fieldProps}
          // placeholder={placeholder}
          // label={label}
          // inputProps={{
          //   required,
          // }}
        >
          {options?.map((item, index) => (
            <MenuItem sx={{ minHeight: `30px !important` }} key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {fieldTouch && fieldError && <FormHelperText>{fieldError}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default FieldSelect;
