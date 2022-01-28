import tw, {styled} from 'twin.macro'


const TagBox = styled.div(({ variant, rounded, fullColor}) => [
    // The common alert styles added with the tw import
    tw`bg-primary-100 inline-block mr-2 px-2 py-1 text-xs font-medium shadow-sm rounded`,
    variant === 'primary' && tw`bg-primary-100 text-primary-600 `,
    variant === 'error' && tw`bg-error-100 text-error-600 `,
    variant === 'success' && tw`bg-success-100 text-success-600 `,
    variant === 'warning' && tw`bg-warning-100 text-warning-600 `,
    variant === 'gray' && tw`bg-gray-100 text-black`,
    rounded && tw`rounded-xl`,
    fullColor && tw`bg-error-500 text-error-600`
])

export default function Tag({children, variant, rounded, fullColor}){
    return (
        <TagBox variant={variant} rounded={rounded} fullColor={fullColor}>
            {children}
        </TagBox>
    )
}