import FieldText from '@common/Form/FieldInput';
import SendIcon from '@mui/icons-material/Send';
import { Stack, TextFieldProps } from '@mui/material';
import { getSocketSlice } from '@redux/slices/socketSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { FC, useEffect } from 'react';

export const ChatForm: FC<{ topicId: number | undefined }> = ({ topicId }) => {
  const { handleReset, setFieldValue } = useFormikContext();
  const { isLoadingSendMessage } = useAppSelector(getSocketSlice);

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
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <Field
        name="message"
        fieldProps={{ placeholder: 'Nhập tin nhắn', multiline: true, maxRows: 4 } as TextFieldProps}
        onPressSubmitEnter
        showError={false}
        component={FieldText}
      />
      <SendIcon />
    </Stack>
  );
};
