import tw from 'twin.macro'

export default function Avatar({ name, picture, domainid }) {
    return (
      <div tw="flex items-center">
        <img src={picture} tw="w-20 h-20 rounded-full mr-4" alt={name} />
        <div tw="block">
            <div tw="block text-xl font-bold">{name}</div>
            <div tw="block text-lg">{domainid}</div>
        </div>
      </div>
    )
}