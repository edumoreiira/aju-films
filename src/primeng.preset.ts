import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
  primitive: {
    whiskey: {
      '50': '#fbf7f1',
      '100': '#f6edde',
      '200': '#ecd7bc',
      '300': '#dfbb92',
      '400': '#d5a273',
      '500': '#c78048',
      '600': '#b96b3d',
      '700': '#9a5534',
      '800': '#7c4530',
      '900': '#653a29',
      '950': '#361c14'
    }
  },
  semantic: {
    primary: palette('{whiskey}'),
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{stone.50}',
          100: '{stone.100}',
          200: '{stone.200}',
          300: '{stone.300}',
          400: '{stone.400}',
          500: '{stone.500}',
          600: '{stone.600}',
          700: '{stone.700}',
          800: '{stone.800}',
          900: '{stone.900}',
          950: '{stone.950}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
});
