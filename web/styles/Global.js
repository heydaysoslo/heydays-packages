import { createGlobalStyle, css } from 'styled-components'
import { globalTypeStyle } from './Typography'

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    :root {
      --header-height: 0px;
    }

    // Needed for sticky footer
    html, body, #__next {
      height: 100%;
    }

    html {
      font-size: 62.5%;
    }

    body {
      overflow-x: hidden;
      font-family: ${theme.fontFamily.sans};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: ${theme.colors.text};
      ${theme.fonts.body()}
      background-color: ${theme.colors.background};
    }

    ::selection {
      background: ${theme.colors.primary};
      color: white;
    }

    #___gatsby {
      transition: background-color 300ms ease;
    }

    figure {
      margin: 0;
      position: relative;
    }

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle; /*  remove space above/below images */
    }

    [role='button'] {
      cursor: pointer;
    }

    button {
      cursor: pointer;
      appearance: none;
      border-radius: 0;
      background: none;
      color: currentColor;
      font-size: inherit;
      border: none;
      padding: 0;
      vertical-align: baseline;
      font-family: ${theme.fontFamily.sans};
      ${theme.fonts.body()};

      &:disabled {
        cursor: default;
      }
    }

    select {
      cursor: pointer;
      appearance: none;
      border: none;
      background: none;
      font-family: ${theme.fontFamily.sans};

      ${theme.fonts.body()}
    }

    input {
      appearance: none;
      margin: 0;
      padding: 0;
      border-radius: 0;
    }

    input[type='number'] {
      appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
    }

    hr {
      height: ${theme.borderWidth.large};
      width: 100%;
      background: ${theme.colors.border};
      border: none;
    }

    summary {
      cursor: pointer;
    }

    ul {
      list-style: none;
    }

    pre {
      font-size: 13px;
      text-align: left;
      font-family: monospace;
      overflow-x: scroll;
      padding: 20px;
      background-color: #f1f1f1;
      border: 1px solid #CCC;
      border-radius: 4px;
      margin: 10px 0;
    }

    /* Typography */
    ${globalTypeStyle}

    /* Global styling from theme */
    ${theme.defaultStyle && theme.defaultStyle}

    /* Add visible tag that shows breakpoint for dev environment */
    ${process.env.NODE_ENV === 'development' &&
      css`
    body:after {
      content: "${theme.breakpoints[0]}";
      background: rgba(255, 255, 255, 0.5);
      position: fixed;
      ${theme.spacing.xs(['py', 'px', 'bottom', 'left'])}
      ${theme.fonts.body()}
      ${Object.keys(theme.breakpoints).map(key => {
        return css`
          ${theme?.bp?.[key]} {
            content: "${key}";
          }
        `
      })}
    }
  `}
  `
)
