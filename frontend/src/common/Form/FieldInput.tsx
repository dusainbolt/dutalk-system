/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, SxProps, TextField, TextFieldProps, Theme } from '@mui/material';
import { Restrict } from '@type/field';
import Helper from '@utils/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC, FormEvent } from 'react';
import { FormLabel } from './FormLabel';

export type ValidateBlock = {
  restric?: Restrict;
  number?: {
    countDecimal?: number;
  };
};

export interface FieldTextType {
  label?: string;
  className?: string;
  sx?: SxProps<Theme>;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
  fieldProps?: TextFieldProps;
  block?: ValidateBlock;
  onPressSubmitEnter?: any;
  enableSubmit?: boolean;
  showError?: boolean;
}

const FieldText: FC<FieldTextType> = ({
  label,
  showError = true,
  className,
  field,
  onPressSubmitEnter = true,
  enableSubmit = true,
  sx,
  block,
  fieldProps,
}) => {
  const { touched, errors, setFieldValue, handleSubmit } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const validateNumber = (value) => {
    const isDecimal = value.match(/^\d+\.\d+$/);
    const countCharDecimal = value.split('.')[1]?.length;
    const blockNum = block?.number;
    if (isDecimal && blockNum?.countDecimal && countCharDecimal > blockNum?.countDecimal) {
      return false;
    }
    return true;
  };

  const onChangeInput = ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
    const includeSpecialChar = value.match(/[%<>\\$'"]/);
    const isNumberInput = fieldProps?.type === 'number';
    if (Restrict.DISALLOW_SPECIAL_CHAR === block?.restric && includeSpecialChar?.input) {
      return;
    }
    // validate number
    if (isNumberInput && !validateNumber(value)) {
      return;
    }
    setFieldValue(field?.name as string, isNumberInput ? Number(value) : value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (onPressSubmitEnter) {
        e.preventDefault();
        enableSubmit && handleSubmit();
      }
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        width: '100%',
        ...sx,
        '& label': {
          color: '#646A6F',
          fontSize: 16,
        },
      }}
      className={clsx(className)}
    >
      <FormLabel fieldName={field?.name} label={label} />
      <TextField
        fullWidth
        id={field?.name}
        name={field?.name}
        value={field?.value}
        onChange={onChangeInput as any}
        error={showError && isError}
        size="small"
        helperText={showError && fieldTouch && fieldError}
        variant="outlined"
        onKeyPress={handleKeyPress as any}
        {...fieldProps}
      />
    </Box>
  );
};

export default FieldText;
