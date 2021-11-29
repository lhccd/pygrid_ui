import tw from 'twin.macro'

export default function Tag({children}){
    return (
        <div tw="bg-primary-100 inline-block mr-2 px-2 py-1 text-sm text-primary-600 shadow-sm rounded-xl flex-shrink-0">
            {children}
        </div>
    )
}