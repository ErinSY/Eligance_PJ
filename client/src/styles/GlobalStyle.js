import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  
  }
a{
        text-decoration: none;
        color: inherit;
   }
body{
      font-family: 'IBM Plex Sans KR', sans-serif;
    }
input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
  }

`;

export default GlobalStyle;
