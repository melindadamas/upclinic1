import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#e6f7ff',
    100: '#b3e0ff',
    200: '#80caff',
    300: '#4db3ff',
    400: '#1a9dff',
    500: '#0086e6',
    600: '#0069b3',
    700: '#004d80',
    800: '#00304d',
    900: '#00141f',
  },
  secondary: {
    50: '#f0f9f9',
    100: '#d1eded',
    200: '#b2e0e0',
    300: '#93d4d4',
    400: '#74c7c7',
    500: '#55bbbb',
    600: '#449595',
    700: '#337070',
    800: '#224a4a',
    900: '#112525',
  },
  accent: {
    50: '#fff5e6',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb84d',
    400: '#ffa31a',
    500: '#e68a00',
    600: '#b36b00',
    700: '#804d00',
    800: '#4d2e00',
    900: '#1a0f00',
  },
  success: {
    50: '#e6f9f0',
    100: '#b3ecd5',
    200: '#80dfba',
    300: '#4dd29f',
    400: '#1ac584',
    500: '#00b86b',
    600: '#009254',
    700: '#006b3e',
    800: '#004527',
    900: '#001e0f',
  },
  gray: {
    50: '#f7f9fa',
    100: '#e3e8eb',
    200: '#cfd7dc',
    300: '#bbc6cd',
    400: '#a7b5be',
    500: '#93a4af',
    600: '#75838c',
    700: '#586269',
    800: '#3a4247',
    900: '#1d2124',
  },
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: '"Inter", sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
    },
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
      },
      secondary: {
        bg: 'secondary.500',
        color: 'white',
        _hover: {
          bg: 'secondary.600',
        },
      },
      accent: {
        bg: 'accent.500',
        color: 'white',
        _hover: {
          bg: 'accent.600',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
      },
      ghost: {
        color: 'brand.500',
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'lg',
        overflow: 'hidden',
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      color: 'gray.800',
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

export default theme;
