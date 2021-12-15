import tw from 'twin.macro'

export function Overlay({children}) {
    return <div tw='fixed inset-0 w-full h-screen bg-gray-800 bg-opacity-40 z-10'>{children}</div>
}