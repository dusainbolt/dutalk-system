import { FC, useState } from 'react';

import OtpInput from 'react-otp-input';

export const OtpComponent: FC<{
  digits?: number;
  inputStyle: string;
}> = ({ digits = 6, inputStyle = '' }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (otpInput) => {
    setValue(otpInput);
  };

  return (
    <OtpInput
      value={value}
      inputStyle={inputStyle}
      onChange={handleChange}
      numInputs={digits}
      //   separator={<span>-</span>}
    />
  );
};
