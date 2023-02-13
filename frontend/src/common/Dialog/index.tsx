import { SlideTransition } from '@common/Transition/SlideTransition';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { closeDialogApp, getLayoutSlice } from '@redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { FormEvent, useState } from 'react';

export const AppDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { dialog } = useAppSelector(getLayoutSlice);
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeDialogApp());
  };

  const handleOk = () => {
    if (dialog?.require && !value) return;
    dialog?.callbackOk(value);
    dispatch(closeDialogApp());
  };

  const onChangeInput = ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
    setValue(value);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialog?.open || false}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{dialog?.title || ''}</DialogTitle>
      <DialogContent>
        {dialog?.description && <DialogContentText>{dialog?.description}</DialogContentText>}
        {dialog?.label && (
          <TextField
            autoFocus
            error={!value}
            helperText="This field can't be blank"
            margin="dense"
            id="name"
            label={dialog?.label}
            value={value}
            required={dialog.require}
            onChange={onChangeInput as any}
            type="string"
            fullWidth
            variant="standard"
          />
        )}
        {dialog?.content || ''}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleClose}>
          Đóng
        </Button>
        {dialog?.callbackOk && (
          <Button onClick={handleOk} autoFocus>
            Agree
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
