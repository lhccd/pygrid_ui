import { useState } from "react";
import tw from 'twin.macro';

export default function ToggleSwitch({onToggle}) {
    const [toggle, setToggle] = useState(false);

    const onClick = () => {
        setToggle(!toggle);
        onToggle();
    }

    return (
        <div tw="">
            <div
                css={[tw`md:w-10 md:h-6 w-8 h-4 flex items-center rounded-full bg-gray-200 px-1 cursor-pointer`,
                    (toggle) && tw`bg-primary-500`]}
                onClick={onClick}
            >
                <div
                    css={[tw`bg-white md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out`,
                        (toggle) && tw`transform translate-x-4`]}
                />
            </div>
        </div>
    );
}