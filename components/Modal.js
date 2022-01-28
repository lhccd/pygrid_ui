import {useState, useEffect} from 'react';
import {Overlay} from '../components/Overlay'
import ReactDOM from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faExclamationTriangle, faExpandAlt, faTimes} from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

export default function Modal({show, onClose, children}){
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(()=>{
        setIsBrowser(true);
    }, [])

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <Overlay>
            <div tw="flex items-center justify-center py-10 h-full">
                <div tw="z-50 overflow-auto cursor-auto w-auto max-w-4xl">
                    <div tw='relative flex flex-col bg-white'>
                        <button onClick={handleClose} tw="absolute top-0 right-0 m-5 w-6 h-6 text-center" aria-label="Close">
                                <FontAwesomeIcon icon={faTimes} title="Close" tw="cursor-pointer text-sm text-gray-500" />
                        </button>
                        <div tw="grid grid-cols-12 px-6 py-4 shadow-md rounded mx-auto">
                            {children}
                        </div>
                        {/* <div tw="col-span-full flex space-x-3 justify-between text-gray-400">
                            {children}
                            <button onClick={handleClose} tw="w-6 h-6 text-center" aria-label="Close">
                                <FontAwesomeIcon icon={faTimes} title="Close" tw="cursor-pointer text-sm text-gray-500" />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </Overlay>
    ) : null;

    if(isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("modal-root")
        )
    } else {
        return null
    }
}