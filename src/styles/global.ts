import { css, createGlobalStyle } from 'styled-components';

const toastify = css`
  .Toastify {
    .toastsuccess {
      border-radius: 4px;
      background: #0CC769;
      color: #FFFFFF;
    }

    .toasterror {
      border-radius: 4px;
      background: #DE1745;
      color: #FFFFFF;
    }

    .Toastify__toast-body {
      font-size: 14px;
      padding: 0 16px;
      svg {
        fill: currentColor;
      }
    }

    button {
      color: currentColor;
    }

    .Toastify__progress-bar--animated {
      background: currentColor;
    }
  }
`;

export default createGlobalStyle`
    ${toastify};
`;