import FieldText from '@common/Form/FieldInput';
import { Stack, TextFieldProps } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import SendIcon from '@mui/icons-material/Send';

export const ChatForm = () => {
  const { handleSubmit } = useFormikContext();
  //   const { loadingRegister, errorRegister } = useAppSelector(getAuthSlice);
  return (
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      {/* <AlertErrorApp error={errorRegister} /> */}
      <>
        <Field
          name="message"
          fieldProps={{ placeholder: 'Nhập họ và tên', multiline: true, maxRows: 4 } as TextFieldProps}
          //   label="Họ và tên"
          component={FieldText}
        />
        <SendIcon />
      </>
    </Stack>
  );
};
