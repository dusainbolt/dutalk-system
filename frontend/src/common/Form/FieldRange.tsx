import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { FC, useState } from 'react';
import { FormLabel } from './FormLabel';

export interface FieldRangeType {
  label?: string;
  className?: string;
  options: [];
  sx?: SxProps<Theme>;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

export const FieldRange: FC<FieldRangeType> = ({ label, className, sx, field }) => {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },

    {
      value: 100,
      label: 100,
    },
  ];

  return (
    <Box sx={{ width: 300, mt: 2, ...sx }} className={clsx(className)}>
      <FormLabel fieldName={field?.name} label={label} />
      <Slider
        // getAriaLabel={() => 'Temperature range'}
        value={value}
        marks={marks}
        // aria-label="Always visible"
        onChangeCommitted={handleChange as any}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
      />
    </Box>
  );
};
