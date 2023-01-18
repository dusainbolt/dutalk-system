// import { IOSSwitch } from '@common/Switch/IOSSwitch';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
// import { StatusOnOff } from '@type/context';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { FC } from 'react';
import { FormLabel } from './FormLabel';

export interface FieldRangeType {
  label?: string;
  className?: string;
  sx?: SxProps<Theme>;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

export const FieldSwitch: FC<FieldRangeType> = ({ label, className, sx, field }) => {
  //   const { touched, errors, setFieldValue } = useFormikContext();
  //   const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  //   const fieldError: string = Helper.objValue(errors, field?.name);
  //   const isError: boolean = fieldTouch && Boolean(fieldError);

  // const { setFieldValue } = useFormikContext();

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setFieldValue(field?.name as string, event.target.checked ? StatusOnOff.ON : StatusOnOff.OFF);
  // };

  return (
    <Box sx={{ width: 300, mt: 2, ...sx }} className={clsx(className)}>
      <FormLabel fieldName={field?.name} label={label} />
      {/* <FormControlLabel
        onChange={handleChange as any}
        sx={{ ml: 0 }}
        control={<IOSSwitch defaultChecked={field?.value === StatusOnOff.ON} />}
        label={field?.value === StatusOnOff.ON ? 'on' : 'off'}
      /> */}
    </Box>
  );
};
