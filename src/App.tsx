import React from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './util/atoms';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }

  body {
    line-height: 1;
  }

  menu, ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-weight: 300;
    font-family: 'GmarketSansMedium', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    line-height: 1.2;
  }

  button {
    font-family: 'GmarketSansMedium', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .tab {
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: ${(props) => props.theme.accentColor};
    opacity: 0.5;
    color: ${(props) => props.theme.bgColor};
    padding: 7px 0;
    border-radius: 10px;

    a {
      display: block;
    }
  }

  .isActive {
    opacity: 1;
  }

  .link-button {
    background-color: ${(props) => props.theme.cardBgColor};
    border: 1px solid ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
    padding: 5px 20px;
    border-radius: 10px;

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
    }
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  }

  .theme-mode-button {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 50%;
    padding: 3px;
  }
  .plus {
    color: #d90000;
  }
  .minus {
    color: #0081fa;
  }
  .currency {
    display: flex;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </>
  );
}

export default App;
