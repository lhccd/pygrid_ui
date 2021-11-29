const colors = require('./components/Styles/colors')

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
        ...colors, 
      },
    },
  },
  plugins: [],
}
