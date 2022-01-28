import tw from 'twin.macro'

export function Grid ({children}) {
    return(
        <div tw='grid grid-cols-12 gap-2'>{children}</div>
    )
}
