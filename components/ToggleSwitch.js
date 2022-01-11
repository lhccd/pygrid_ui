import { useState } from "react";
import tw from 'twin.macro';

export default function ToggleSwitch() {
    const [toggle, setToggle] = useState(false);
    return (
        <div tw="">
            <div
                css={[tw`md:w-12 md:h-8 w-10 h-6 flex items-center rounded-full bg-gray-200 px-1 cursor-pointer`,
                    (toggle) && tw`bg-primary-500`]}
                onClick={() => {
                    setToggle(!toggle);
                }}
            >
                <div
                    css={[tw`bg-white md:w-6 md:h-6 h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out`,
                        (toggle) && tw`transform translate-x-4`]}
                />
            </div>
        </div>
    );
}