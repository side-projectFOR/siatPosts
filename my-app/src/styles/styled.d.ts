// src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
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
      sm: string;
    };
  }
}
