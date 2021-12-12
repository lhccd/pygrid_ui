import tw from 'twin.macro'

export default function Osman(){
    return (
        <div tw="h-screen bg-gray-500 grid grid-cols-5 grid-rows-5 gap-6 p-10">
            <div tw="bg-blue-300 col-span-2 text-lg m-3">1</div>
            <div tw="bg-blue-300 row-span-3 text-lg m-3">2</div>
            <div tw="bg-blue-300 col-start-2 text-center block text-red-700 text-4xl font-extrabold col-end-5 m-3 rounded-lg hover:bg-black">3 Osman ist bei Lorenz am Chillen</div>
            <div tw="bg-blue-300 row-start-1 row-end-5 text-lg m-3">4</div>
            <div tw="bg-blue-300 text-lg m-3">5</div>
            <div tw="bg-blue-300 text-lg m-3">6</div>
            <div tw="bg-blue-300 text-lg m-3">7</div>
            <div tw="bg-blue-300 text-lg m-3">8</div>
            <div tw="bg-blue-300 text-lg m-3">9</div>
            <div tw="bg-blue-300 text-lg m-3">10</div>
        </div>
    )
}