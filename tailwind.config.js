module.exports = {
  theme: {
    extend: {
      /* colors: {
        electric: '#db00ff',
        ribbon: '#0047ff',
      }, */
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
        rubik: ['"Rubik"', 'sans-serif'],
        firacode: ['"Fira Code"', 'monospace']
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        /*  ...colors, */
        gray: {
          50: '#F1F0F4',
          100: '#E3E2E9',
          200: '#C7C4D4',
          300: '#ABA7BE',
          400: '#8F8AA8',
          500: '#736C93',
          600: '#5C5775',
          700: '#454158',
          800: '#2D2B3A',
          900: '#17161D'
        },
        primary: {
          50: '#E9F7FC',
          100: '#D2EFF9',
          200: '#A6DFF2',
          300: '#79CFEC',
          400: '#4DBFE5',
          500: '#20AFDF',
          600: '#1A8CB2',
          700: '#136986',
          800: '#0D4659',
          900: '#06232D'
        },
        error: {
          50: '#FCE9F2',
          100: '#F9D2E5',
          200: '#F2A6CC',
          300: '#EC79B2',
          400: '#E54C99',
          500: '#DE207F',
          600: '#B21966',
          700: '#86134C',
          800: '#590D33',
          900: '#2D0619'
        },
        warning: {
          50: '#FDF5E7',
          100: '#FBEBD0',
          200: '#F7D6A1',
          300: '#F4C271',
          400: '#F0AD42',
          500: '#EB9813',
          600: '#BD7A0F',
          700: '#8E5C0B',
          800: '#5E3D08',
          900: '#2F1F04'
        },
        success: {
          50: '#E4F7E4',
          100: '#BCEBBC',
          200: '#95DF95',
          300: '#6ED46E',
          400: '#46C846',
          500: '#32A932',
          600: '#278227',
          700: '#1B5A1B',
          800: '#0F330F',
          900: '#040C04'
        }
      },
    },
  },
  plugins: [],
}
