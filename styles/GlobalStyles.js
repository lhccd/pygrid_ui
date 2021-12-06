import { Global, css } from '@emotion/react'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css({
  body: {
    fontFamily: 'Roboto',
    color: 'black',
    ...tw`antialiased`,
  },
})

// const customStyles = css`
//   @font-face {
//   font-family: 'Comforter', cursive;;
//   src: url('./../public/assets/fonts/Comforter-Regular.ttf') format('truetype');
//   font-weight: 400;
//   font-style: normal;
//   font-display: swap;
// }`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
