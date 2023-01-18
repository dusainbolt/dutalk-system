import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Tooltip } from '@mui/material';
import { FC } from 'react';

export interface ButtonProps extends LoadingButtonProps {
  helpText?: string;
  triggerLogin?: any;
}

export const Button: FC<ButtonProps> = ({ children, triggerLogin, onClick, helpText = '', ...props }) => {
  const button = (
    <LoadingButton {...props} onClick={triggerLogin || onClick}>
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </span>
    </LoadingButton>
  );

  return helpText ? (
    <Tooltip title={helpText} disableFocusListener disableTouchListener>
      {button}
    </Tooltip>
  ) : (
    button
  );
};
