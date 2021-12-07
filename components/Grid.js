import tw from 'twin.macro'

const Grid = props => (
    <div {...props} tw='grid grid-cols-12 gap-2 px-10 min-h-full w-full'/>
)

export { Grid }