import { Button } from '@common/Button';
import FieldText from '@common/Form/FieldInput';
import { Alert, Stack, TextFieldProps } from '@mui/material';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { Field, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { AlertErrorApp } from 'src/shared/Alert/AlertErrorApp';

export const TopicForm = ({ visible }) => {
  const { handleSubmit, handleReset } = useFormikContext();
  const { loadingAddTopic, errorAddTopic } = useAppSelector(getTopicSlice);

  useEffect(() => {
    handleReset();
  }, [visible]);

  return (
    <Stack>
      <Alert severity="info">
        Hãy tạo chủ đề cho cuộc trò chuyện của bạn. Lưu ý mô tả nó để chúng ta cùng trao đổi nhé.
      </Alert>
      <AlertErrorApp error={errorAddTopic} />
      <>
        <Field
          name="title"
          fieldProps={{ placeholder: 'Tiêu đề', multiline: true, maxRows: 4 } as TextFieldProps}
          label="Tiêu đề"
          component={FieldText}
        />
        <Field
          name="description"
          fieldProps={{ placeholder: 'Mô tả', multiline: true, maxRows: 4 } as TextFieldProps}
          label="Mô tả"
          component={FieldText}
        />
        <Button style={{ marginTop: 16 }} loading={loadingAddTopic} onClick={handleSubmit as any} variant="contained">
          Hoàn tất
        </Button>
      </>
    </Stack>
  );
};
