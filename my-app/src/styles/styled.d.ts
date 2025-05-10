// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [x: string]: Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>>;
      white: Interpolation<object>;
      primaryLight: Interpolation<object>;
      gray600: Interpolation<object>;
      gray500: Interpolation<object>;
      backgroundLight: Interpolation<object>;
      primaryDark: Interpolation<object>;
      background: Interpolation<object>;
      primary: string;
      secondary: string;
      text: string;
      border: string;
    };
    spacing: {
      sm: string;
      md: string;
      lg: string;
    };
    radius: {
      pill: Interpolation<object>;
      sm: string;
    };
  }
}
