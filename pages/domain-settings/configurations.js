import React, {useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import {
    faPlus,
    faInfoCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useForm} from "react-hook-form";
import ToggleSwitch from "/components/ToggleSwitch";
import * as fileSaver from "file-saver";
import {useRouter} from "next/router";
import axios from "axios";

export default function Config(){
    const router = useRouter();
    const [DAARequired, setDAARequired] = useState(false);
    const [DAAUploaded, setDAAUploaded] = useState(false);
    const [DAASent, setDAASent] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();
    const [daa, setDaa] = useState(null);

    async function getDomain() {
        try{
            const apiRes = await axios({
                method: "GET",
                url: "api/domain-profile",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if(apiRes.status == 200){
                const domain = await apiRes.data;
                setDAARequired(domain.require_daa)
            }
            else{
                alert("Couldn't fetch the domain profile!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    useEffect( () => {

        }
        ,[DAARequired])


    const onUploadDaa = (e) => {
        setDAAUploaded(true);
        setDAASent(false);
        let files = e.target.files;
        setDaa(files[0]);
    }

    const onXClick = () => {
        setDAAUploaded(false);
        setDaa(null);
    }

    const onDAAClick = () => {
        fileSaver.saveAs(daa);
    };

    const sendDaa = () => {
        setDAASent(true);
    }

    return (
        <>
            <div tw="col-start-3 col-end-11 divide-y text-gray-800">
                <div id="daa-toggle" tw="">
                    <div tw="flex justify-between mt-10">
                        <p tw="text-xl text-left font-bold font-rubik">Require Data Access Agreement</p>
                        <ToggleSwitch onToggle={() => setDAARequired(!DAARequired)}/>
                    </div>
                    <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                        <p tw="text-sm mr-5">
                            If enabled this will require any user not manualy created by an admin to upload a signed legal document
                            of your choosing before being able to apply for an account on this domain node.
                        </p>
                    </div>
                </div>
                <div id="daa-file">
                    {DAARequired
                        ? [
                            <div tw="">
                                <p tw="text-xl text-left font-bold font-rubik mt-10">Data Access Agreement<div tw="pl-2 inline relative bottom-1 text-primary-500 font-bold">*</div></p>
                                <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                                    <p tw="text-sm mr-5">
                                        A Data Access Agreement (DAA) is a... Please upload the legal agreement you would like to require for your domain users.
                                    </p>
                                </div>
                                {DAAUploaded
                                    ?
                                    [DAASent
                                        ?
                                        <div>
                                            <div tw="w-2/3 flex justify-between bg-gray-100 text-black my-4 py-1">
                                                <button tw="mx-2 underline font-bold " type="button" onClick={onDAAClick}>
                                                    {daa.name}
                                                </button>
                                            </div>
                                            <div tw="my-10 flex items-center space-x-3 p-3 bg-primary-100">
                                                <FontAwesomeIcon icon={faInfoCircle} tw="" />
                                                <p tw="text-gray-800 cursor-pointer break-normal">
                                                    If you need to change your data access agreement, please contact OpenMined at support@openmined.org and we will
                                                    help walk you through the process.
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div tw="w-2/3 flex justify-between bg-gray-100 text-black my-4 py-1">
                                                <button tw="mx-2 underline font-bold " type="button" onClick={onDAAClick}>
                                                    {daa.name}
                                                </button>
                                                <button tw="font-bold mx-2" type="button" onClick={onXClick}>
                                                    <FontAwesomeIcon icon={faTimes} size="sm" tw=""/>
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    tw="text-primary-500 font-bold py-2 px-4 mr-6 border rounded-lg border-primary-500"
                                                    type="button"
                                                    onClick={() => document.getElementById('daa_pdf').click()}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} size="sm" tw="mr-2" />
                                                    Replace File
                                                </button>
                                                <input tw="hidden"
                                                       id="daa_pdf"
                                                       name="daa_pdf"
                                                       type='file'
                                                       {...register("daa_pdf", { onChange: onUploadDaa, required: true })}
                                                />
                                            </div>
                                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={sendDaa}>Save Changes</button>
                                            </div>
                                        </div>
                                    ]
                                    :
                                    <div>
                                        <div>
                                            <button
                                                tw="text-primary-500 font-bold py-2 px-4 mr-6 border rounded-lg border-primary-500"
                                                type="button"
                                                onClick={() => document.getElementById('daa_pdf').click()}
                                            >
                                                <FontAwesomeIcon icon={faPlus} size="sm" tw="mr-2" />
                                                Upload File
                                            </button>
                                            <input tw="hidden"
                                                   id="daa_pdf"
                                                   name="daa_pdf"
                                                   type='file'
                                                   {...register("daa_pdf", { onChange: onUploadDaa, required: true })}
                                            />
                                        </div>
                                        <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                            <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={sendDaa}>Save Changes</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        ]
                        : ""
                    }
                </div>
            </div>
        </>
    )
}