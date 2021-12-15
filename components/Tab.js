import { useState } from 'react';
import tw, {styled} from 'twin.macro';
import { Table } from './Table';
import { Table2 } from './Table2';
// const styles = {
//     container: ({ hasBg }) => [
//       tw`flex w-full`, // Add base styles first
//       hasBg && tw`bg-black`, // Then add conditional styles
//     ],
//     button: ({ toggleState }) => [
//         tw`p-4 text-center w-1/2 bg-white border`,
//         (toggleState === 1) && tw`bg-primary-300`,
//         (toggleState === 2) && tw`bg-primary-500`,
//         (toggleState === 3) && tw`bg-primary-800`
//     ]
// }
const Button = styled.button(({ state }) => [
    tw`p-4 bg-gray-50 text-center w-1/2 bg-white border-primary-500 border-t-2 border-r-2 border-l-2`,
    (state === 1) && tw`bg-gray-50`,
    (state === 2) && tw`bg-gray-100`,
    (state === 3) && tw`bg-gray-50`
])

const Content = styled.div(({ state }) => [
    tw`bg-gray-300 p-5 w-full h-full hidden`,
    (state === 1) && tw`bg-gray-300 block`,
    (state === 2) && tw`bg-gray-500 block`,
    (state === 3) && tw`bg-gray-800 block`

])

export function Tab(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        console.log(index);
        console.log(toggleState)
        setToggleState(index);
    };

    return (
        <div tw="flex flex-col relative w-auto bg-gray-900 break-all">
            <div tw="flex">
                <button
                    css={[tw`p-4 bg-gray-50 text-center w-1/2 bg-gray-50 border-primary-500 border-t-2 border-r-2 border-l-2`,
                        (toggleState === 1) && tw`bg-gray-100`]}
                    onClick={() => toggleTab(1)}
                >
                Active Users (3)
                </button>
                <button
                    css={[tw`p-4 bg-gray-50 text-center w-1/2 bg-gray-50 border-primary-500 border-t-2 border-r-2 border-l-2`,
                    (toggleState === 2) && tw`bg-gray-100`]}
                    onClick={() => toggleTab(2)}
                >
                Pending Users (3)
                </button>
                <button
                    css={[tw`p-4 bg-gray-50 text-center w-1/2 bg-gray-50 border-primary-500 border-t-2 border-r-2 border-l-2`,
                    (toggleState === 3) && tw`bg-gray-100`]}
                    onClick={() => toggleTab(3)}
                >
                Denied Users (0)
                </button>
            </div>


            <div tw="flex-grow">
                <div 
                    css={[tw`bg-gray-50 p-5 w-full h-full hidden`,
                    (toggleState === 1) && tw`bg-gray-100 block`,]}
                >
                    <h2>Content 1</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                        praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
                        vel voluptatum?
                    </p>
                    <Table2/>
                </div>

                <div
                    css={[tw`bg-gray-50 p-5 w-full h-full hidden`,
                    (toggleState === 2) && tw`bg-gray-100 block`,]}
                >
                    <h2>Content 2</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                        voluptatum qui adipisci.
                    </p>
                    <Table/>
                </div>

                <div
                    css={[tw`bg-gray-50 p-5 w-full h-full hidden`,
                    (toggleState === 3) && tw`bg-gray-100 block`,]}
                >
                    <h2>Content 3</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
                        nostrum rerum laudantium totam unde adipisci incidunt modi alias!
                        Accusamus in quia odit aspernatur provident et ad vel distinctio
                        recusandae totam quidem repudiandae omnis veritatis nostrum
                        laboriosam architecto optio rem, dignissimos voluptatum beatae
                        aperiam voluptatem atque. Beatae rerum dolores sunt.
                    </p>
                    <Table2/>
                </div>

            </div>
        </div>
    )
}
