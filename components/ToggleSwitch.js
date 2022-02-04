import {useEffect, useState} from "react";
import tw from 'twin.macro';

export default function ToggleSwitch({toggleProp, onToggle, disabled}) {
    const [toggle, setToggle] = useState(false);


    useEffect( () => {
        if (toggleProp){
            setToggle(toggleProp)
        }}
        ,[toggleProp])

    const onClick = () => {
        setToggle(!toggle);
        onToggle();
    }

    return (
        <div tw="">
            <button
                css={[tw`md:w-10 md:h-6 w-8 h-4 flex items-center rounded-full bg-gray-200 px-1 cursor-pointer disabled:bg-gray-500`,
                    (toggle) && tw`bg-primary-500`]}
                onClick={onClick}
                disabled={disabled}
            >
                <div
                    css={[tw`bg-white md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out`,
                        (toggle) && tw`transform translate-x-4`]}
                />
            </button>
        </div>
    );
}