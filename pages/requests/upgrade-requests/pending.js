import { Layout } from '../../../components/Layout'
import tw, {styled} from 'twin.macro'
import {faComment, faExclamationCircle, faHandsHelping, faSearch, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../../../lib/auth'
import {useRouter} from 'next/router'
import AccordionUpgrade from "../../../components/AccordionUpgrade";
import Modal from "../../../components/Modal";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import Alert from "../../../components/Alert";

export default function Pending(props) {
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [id, setId] = useState("")
    const [comment, setComment] = useState("")
    const [update, setUpdate] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [variant, setVariant] = useState('primary');

    useEffect(() => {
    }, [props.list])

    const requestItems = props.list.map((info) =>
        <AccordionUpgrade info={info} openModal={() => setShowCommentModal(true)} closeModal={() => setShowCommentModal(false)}
                          setId={(e) => setId(e)} setUpdate={(e) => setUpdate(e)}/>
    );

    async function onSubmitComment() {
        try {
            const apiRes = await fetch(
                '/api/update_upgrade_request',
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        comments: comment,
                        update: update
                    })
                }
            );
            if(apiRes.status == 200){
                setVariant('success');
                setAlertMessage('Request successfully '+update+"ed")
                setShowAlert(true);
                setShowCommentModal(false)
            }
            else{
                console.error(err)
                setVariant('error');
                setAlertMessage('There was an error '+update+'ing the request');
                setShowAlert(true);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const onSkipComment = async () => {
        try {
            const apiRes = await fetch(
                '/api/update_upgrade_request',
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        comments: "",
                        update: update
                    })
                }
            );
            if(apiRes.status == 200){
                setVariant('success');
                setAlertMessage('Request successfully '+update+"ed")
                setShowAlert(true);
                setShowCommentModal(false)
            }
            else{
                console.error(err)
                setVariant('error');
                setAlertMessage('There was an error '+update+'ing the request');
                setShowAlert(true);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div tw="col-start-2 col-end-12 mt-6">
            <div tw="col-start-9 col-span-4">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div tw="my-10">
                <div tw="w-96 flex content-center border border-gray-300 rounded-lg p-2 focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
                    <FontAwesomeIcon icon={faSearch} tw="mx-2 my-1 mr-4"/>
                    <input
                        name="search"
                        type="text"
                        placeholder="Search"
                        tw="w-full focus:outline-none"
                    />
                </div>
            </div>
            <div tw="border border-gray-200 rounded-lg divide-y divide-gray-200">{requestItems}</div>

            <Modal show={showCommentModal} onClose={() => setShowCommentModal(false)}>
                <div tw="col-span-full text-center">
                    <div tw="flex flex-col p-3 mt-3">
                        <FontAwesomeIcon icon={faComment} size="2x" tw="text-black self-center m-6"/>
                        <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                            Would you like to leave a comment?
                        </h1>
                    </div>
                    <div tw="p-6 text-gray-600 font-roboto">
                        <p>
                            Lorem ipsum carrots, enhanced undergraduate developer, but they do occaecat time and vitality, such as labor and obesity. Over the years come, who nostrud exercise.
                        </p>
                    </div>
                    <form tw="flex flex-col justify-start font-roboto mx-4">
                        <label tw="text-left my-2 inline-flex"> <p tw="font-bold text-gray-500">Comment </p><p tw="pl-1 inline relative text-sm italic text-primary-600 ">(optional)</p></label>
                        <input
                            tw="text-left p-3 border border-gray-300 rounded-lg break-words resize-y focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                            type="text"
                            placeholder="You can leave a comment about your decision"
                            value={comment} onChange={e => setComment(e.target.value)}
                        />
                        <div tw="flex justify-end p-6 mt-10">
                            <button
                                tw="text-primary-500 font-bold py-2 px-4 mr-6 rounded-lg"
                                type="button"
                                onClick={onSkipComment}
                            >
                                Skip
                            </button>
                            <button
                                tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6"
                                type="button"
                                onClick={onSubmitComment}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
    //     }else{
    //         router.replace('/login')
    //         return null
    //     }
    // }
    // return null
}