import { createGlobalStyle, DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      textLight: string;
      border: string;
      background: string;
      white: string;
      error: string;
      success: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    mediaQueries: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };
    transition: string;
  }
}

export const theme = {
  colors: {
    primary: '#4263EB',
    secondary: '#748FFC',
    text: '#212529',
    textLight: '#868E96',
    border: '#E9ECEF',
    background: '#F8F9FA',
    white: '#FFFFFF',
    error: '#FA5252',
    success: '#40C057',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.05)',
  },
  mediaQueries: {
    mobile: '@media (max-width: 576px)',
    tablet: '@media (max-width: 768px)',
    laptop: '@media (max-width: 992px)',
    desktop: '@media (max-width: 1200px)',
  },
  transition: 'all 0.2s ease-in-out',
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Nanum Gothic', 'Nanum Gothic Coding', sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
    transition: ${({ theme }) => theme.transition};
  }
  
  input, textarea, select {
    font-family: inherit;
  }
`;

export type Theme = typeof theme;
export const themeLight: DefaultTheme = theme;
export const themeDark: DefaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#343a40',
    text: '#f8f9fa',
    border: '#495057',
  },
};