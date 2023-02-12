import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import SendIcon from '@mui/icons-material/Send';
import { Stack, TextFieldProps, Typography } from '@mui/material';
import { getSocketSlice } from '@redux/slices/socketSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { FC, Fragment, useEffect } from 'react';
import { chatFormStyle } from './styles/ChatForm.style';

export const ChatForm: FC<{ topicId: number | undefined }> = ({ topicId }) => {
  const { handleReset, setFieldValue, handleSubmit } = useFormikContext();
  const { isLoadingSendMessage } = useAppSelector(getSocketSlice);
  const styles = chatFormStyle();

  useEffect(() => {
    if (topicId) {
      handleReset();
      setFieldValue('topicId', topicId);
    }
  }, [topicId]);

  useEffect(() => {
    if (isLoadingSendMessage) {
      setFieldValue('message', '');
    }
  }, [isLoadingSendMessage]);

  return (
    <Fragment>
      <Stack sx={{ paddingBottom: 1.5 }} direction="row" alignItems="flex-end" spacing={1}>
        <Field
          name="message"
          className={styles.inputMessage}
          enableSubmit={!isLoadingSendMessage}
          fieldProps={{ placeholder: 'Nhập tin nhắn', multiline: true, maxRows: 4 } as TextFieldProps}
          showError={false}
          component={FieldText}
        />
        <Button
          loading={isLoadingSendMessage}
          onClick={handleSubmit as any}
          className={styles.btnSend}
          variant="contained"
          endIcon={<SendIcon fontSize="small" />}
        >
          Gửi
        </Button>
      </Stack>
    </Fragment>
  );
};
