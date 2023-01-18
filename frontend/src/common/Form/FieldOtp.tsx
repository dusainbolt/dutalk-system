import { Box, Typography } from '@mui/material';
import Helper from '@utils/helper';
import { FieldInputProps, useFormikContext } from 'formik';
import { FC } from 'react';

import OtpInput from 'react-otp-input';

export interface FieldOtpType {
  className?: string;
  digits?: number;
  field?: FieldInputProps<any>;
}

export const FieldOtp: FC<FieldOtpType> = ({ digits = 6, className = '', field }) => {
  const { errors, setFieldValue, submitCount } = useFormikContext();
  const fieldError: string = Helper.objValue(errors, field?.name);

  const handleChange = (otpInput) => {
    setFieldValue(field?.name as string, otpInput);
  };

  return (
    <Box>
      <OtpInput
        value={field?.value}
        inputStyle={className}
        onChange={handleChange}
        numInputs={digits}
        //   separator={<span>-</span>}
      />
      {submitCount > 0 && fieldError && (
        <Typography sx={{ mt: 1, color: 'red', fontSize: 14 }} variant="body1">
          {fieldError}
        </Typography>
      )}
    </Box>
  );
};
