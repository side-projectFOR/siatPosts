import { createGlobalStyle } from 'styled-components';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const theme = {
  colors: {
    primary: '#4263EB',
    primaryLight: '#748FFC',
    primaryDark: '#3b5bdb',
    secondary: '#228BE6',
    secondaryLight: '#74C0FC',
    secondaryDark: '#1971c2',
    success: '#12B886',
    successLight: '#63E6BE',
    successDark: '#0CA678',
    warning: '#FAB005',
    warningLight: '#FFE066',
    warningDark: '#E67700',
    danger: '#FA5252',
    dangerLight: '#FF8787',
    dangerDark: '#E03131',
    info: '#15AABF',
    infoLight: '#66D9E8',
    infoDark: '#0C8599',
    text: '#212529',
    textLight: '#868E96',
    textLighter: '#ADB5BD',
    border: '#DEE2E6',
    borderLight: '#E9ECEF',
    background: '#F8F9FA',
    backgroundLight: '#F1F3F5',
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#868E96',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#212529',
  },
  spacing: {
    xxs: '0.125rem', // 2px
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
    mega: '4rem',    // 64px
  },
  radius: {
    xs: '0.125rem',  // 2px
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    circle: '50%',
    pill: '9999px',
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    'button-focus': '0 0 0 3px rgba(66, 99, 235, 0.5)',
  },
  typography: {
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      xxl: '1.5rem',    // 24px
      title: '2rem',    // 32px
      headline: '2.5rem' // 40px
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75,
    },
  },
  mediaQueries: {
    xs: '@media (max-width: 375px)',    // 작은 모바일
    sm: '@media (max-width: 576px)',     // 모바일
    md: '@media (max-width: 768px)',     // 태블릿
    lg: '@media (max-width: 992px)',     // 작은 데스크탑
    xl: '@media (max-width: 1200px)',    // 큰 데스크탑
    xxl: '@media (max-width: 1400px)',   // 초대형 디스플레이
    motion: '@media (prefers-reduced-motion)',
    dark: '@media (prefers-color-scheme: dark)',
    hover: '@media (hover: hover)',
    portrait: '@media (orientation: portrait)',
    landscape: '@media (orientation: landscape)',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },
  transition: {
    fast: 'all 0.1s ease-in-out',
    normal: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  }
};

export const GlobalStyle = createGlobalStyle`
  /* 기본 리셋 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease;
  }
  
  /* 포커스 스타일 */
  :focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* 링크 스타일 */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition.normal};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
    
    &:focus {
      outline: 3px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }
  
  /* 버튼 스타일 */
  button {
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    transition: ${({ theme }) => theme.transition.normal};
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
    
    &:focus {
      outline: 3px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }
  
  /* 입력 필드 스타일 */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    transition: ${({ theme }) => theme.transition.normal};
    
      box-shadow: ${({ theme }) => theme.shadows['button-focus']};
      outline: none;
    }
  }

  /* 모바일 터치 최적화 */
  
  /* 모바일 터치 최적화 */
  @media (max-width: 768px) {
    button, a, input, select, textarea {
      font-size: 16px; /* iOS에서 확대 방지 */
      min-height: 44px; /* 터치 타겟 크기 확보 */
    }
    
    button, a.button {
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    }
  }
  
  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray500};
    border-radius: ${({ theme }) => theme.radius.pill};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray600};
    }
  }
  
  /* 텍스트 선택 스타일 */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.white};
  }
  
  /* 인쇄 최적화 */
  @media print {
    body {
      background-color: white;
      color: black;
    }
    
    a {
      text-decoration: underline;
      color: black;
    }
    
    @page {
      margin: 2cm;
    }
  }
`;

// export type Theme = typeof theme;
