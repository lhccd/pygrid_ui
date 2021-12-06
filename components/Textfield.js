import tw, {styled} from 'twin.macro'

const Input = tw.input`
    flex flex-col items-start p-3 border border-gray-300 rounded-lg w-full font-roboto text-gray-300
    focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800 
`
const InputFilled = tw(Input)`bg-gray-50 border-gray-50 text-gray-400`

const Textfield = (variants) => {
    return (
        <div>
            <Input/>
        </div>
    )
}

export default Textfield