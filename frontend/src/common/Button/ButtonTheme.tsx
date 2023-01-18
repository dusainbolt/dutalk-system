import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext, ThemeContext } from '@pages/_app';
import Constant from '@utils/constant';
import { useContext } from 'react';

export const ButtonTheme = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const themeMode = useContext(ThemeContext);

  return (
    <IconButton sx={{ ml: 1, color: theme.palette.common.black }} onClick={colorMode.toggleColorMode} color="inherit">
      {themeMode === Constant.theme.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
