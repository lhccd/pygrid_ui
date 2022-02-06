import React, {useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import {
    faPlus,
    faInfoCircle,
    faTimes,
    faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useForm} from "react-hook-form";
import ToggleSwitch from "/components/ToggleSwitch";
import Alert from "/components/Alert";
import * as fileSaver from "file-saver";
import {useRouter} from "next/router";
import axios from "axios";

export default function Config(){
    const router = useRouter();
    const [domainName, setDomainName] = useState("");
    const [DAARequired, setDAARequired] = useState(false);
    const [DAAUploaded, setDAAUploaded] = useState(false);
    const [DAASent, setDAASent] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();
    const [daa, setDaa] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState('primary');

    useEffect( () => {
        getDomain()
        }
        ,[])

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
                if(domain.require_daa){
                    setDAARequired(domain.require_daa)
                    setDAAUploaded(true)
                    setDAASent(true)
                }
                setDomainName(domain.name)
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

    const disabled = DAASent;

    useEffect( () => {
        console.log("disabled: ", disabled)
        }
        ,[DAASent])

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
    const onDAAClick = async () => {
        if(DAASent){
            try{
                const apiRes =await axios({
                    method: 'GET',
                    url: "http://localhost/api/v1/domain/domain-pdf",
                    headers: {
                        "Accept": "application/json",
                    },
                    params: {
                        domain_name: domainName
                    }
                });

                if(apiRes.status === 200){
                    const data = await apiRes.data;
                    let decodedStringAtoB = atob(data);
                    let bytes = new Uint8Array(decodedStringAtoB.length);
                    for (let i=0; i<decodedStringAtoB.length; i++)
                        bytes[i] = decodedStringAtoB.charCodeAt(i);
                    let a = window.document.createElement('a');

                    a.href = window.URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }));
                    a.download = domainName+"_Agreement.pdf";
                    document.body.appendChild(a)
                    a.click();
                    document.body.removeChild(a)

                    setAlertVariant('warning');
                    setAlertMessage('DAA is being download starts soon...')
                    setShowAlert(true);
                }
                else{
                    setAlertVariant('error');
                    setAlertMessage("Couldn't find any agreement file in the domain")
                    setShowAlert(true);
                    // alert("Couldn't find any agreement file in the domain");
                }
            }
            catch (error){
                console.log(error);
            }
        } else {
            fileSaver.saveAs(daa, domainName+"_Agreement.pdf");
        }
    };

    const sendDaa = async () => {
        const formData = new FormData
        formData.append("daa_pdf", daa)
        let config = {
            method: 'put',
            url: 'http://localhost/api/v1/domain/add-pdf',
            data: formData
        };
        try {
            const response = await axios(config)
            const daa_id = response.data.id

            const body =JSON.stringify({
                daa_id
            });
            try{
                console.log(body);
                const apiRes = await fetch(
                    "api/domain-config",
                    {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: body
                    }
                );

                if(apiRes.status === 200){
                    const response = await apiRes.json();
                    console.log("DAA sent");
                    setAlertVariant('success');
                    setAlertMessage('Changes successfully saved')
                    setShowAlert(true);
                }
                else{
                    const error = await apiRes.json();
                    console.log(error);
                    setAlertVariant('error');
                    setAlertMessage('An error occured during the change of settings!')
                    setShowAlert(true);
                }
            }
            catch (error){
                console.log(error);
            }

            console.log(response);
            setDAASent(true);
            setAlertVariant('success');
            setAlertMessage('Changes successfully saved')
            setShowAlert(true);
        } catch (err) {
            console.error(err);
            setAlertVariant('error');
            setAlertMessage('An error occured during the change of settings!')
            setShowAlert(true);
        }
    }

    return (
        <>
            <div tw="col-start-3 col-end-11 divide-y text-gray-800">
            <div tw="absolute right-0 w-1/2 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
                <div id="daa-toggle" tw="">
                    <div tw="flex justify-between mt-10">
                        <p tw="text-xl text-left font-bold font-rubik">Require Data Access Agreement</p>
                        <ToggleSwitch toggleProp={DAARequired} onToggle={() => setDAARequired(!DAARequired)}
                                      disabled={disabled}/>
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
                                <p tw="text-xl text-left font-bold font-rubik mt-10">Data Access Agreement<p tw="pl-2 inline relative bottom-1 text-primary-500 font-bold">*</p></p>
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
                                                    {domainName+"_Agreement.pdf"}
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
                                                    {domainName+"_Agreement.pdf"}
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