import tw, {styled} from 'twin.macro'
import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faExclamationTriangle, faExpandAlt, faTimes} from '@fortawesome/free-solid-svg-icons'

const Toast = styled.div(({ variant, isSmall}) => [
    // The common alert styles added with the tw import
    tw`my-10 col-span-full flex items-center justify-between space-x-3 px-3 py-2 bg-primary-100 border-t-4 border-primary-500 text-gray-800 cursor-pointer`,
    variant === 'primary' && tw`bg-primary-100 border-primary-500`,
    variant === 'error' && tw`bg-error-100 border-error-500`,
    variant === 'success' && tw`bg-success-100 border-success-500`,
    variant === 'warning' && tw`bg-warning-100 border-warning-500`,
    isSmall ? tw`col-span-6` : tw`col-span-full`,
])

export default function Alert({variant, show, onClose, children, autoDelete, autoDeleteTime}){
    
    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    useEffect(() => {
        console.log("Autodelete", autoDelete, autoDeleteTime, show, variant, children)
        const timer = setTimeout(() => {
            if (autoDelete) {
                onClose();
            }
        }, autoDeleteTime);
        return () => clearTimeout(timer);
    }, [show, autoDelete]);

    const Alert = show ? (
        <Toast variant={variant}>
            <div tw="flex items-center space-x-3 ">
                {children}
            </div>
            <button onClick={handleClose} tw="float-right w-6 h-6" aria-label="Close">
                <FontAwesomeIcon icon={faTimes} title="Close" tw="cursor-pointer text-sm text-gray-500" />
            </button>
        </Toast>):null;

    return(
        Alert
    )
}