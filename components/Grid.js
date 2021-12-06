import tw from 'twin.macro'

function Grid({children}){
    return(
        <div tw='grid grid-cols-12 gap-2 px-10'>
            {children}
        </div>
    )
}

export default Grid