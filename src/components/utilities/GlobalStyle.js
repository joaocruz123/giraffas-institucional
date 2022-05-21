// global-style.js
import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';

import { THEME } from '../../config';
 
const options = {
  fontFamilyBase: THEME.fontFamily,
  fontSizeBase: THEME.fontSize,
  bodyColor: THEME.colors.textPrimary,
  bodyBg: THEME.colors.background
};
 
const rebootCss = reboot(options);
 
const GlobalStyle = createGlobalStyle`
  ${rebootCss}
`
 
export default GlobalStyle;