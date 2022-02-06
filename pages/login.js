import styled from 'styled-components'
import { useForm } from "react-hook-form"
import DomainConnectionStatus from '../components/DomainConnectionStatus'
import tw from 'twin.macro'
import Tag from '../components/Tag'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {login} from '../lib/auth'
import Alert from '../components/Alert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle, faExclamationTriangle, faExpandAlt, faTimes} from '@fortawesome/free-solid-svg-icons'
import {getToken} from '../lib/auth'
import moment from "moment";

const Background = styled.div`
    background-image: url("../signup_background_image.png");
    height: 100vh;
    background-position: right top; 
    background-repeat: no-repeat; 
    background-size: auto; 
`

export default function Login() {
    const [tags, setTags] = useState([]);
    const [domainName, setDomainName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [datasets, setDatasets] = useState(0);
    const [deployed, setDeployed] = useState("");
    const [owner, setOwner] = useState("");
    const [networks, setNetworks] = useState([]);
    const [supportEmail, setSupportEmail] = useState("");

    const { register, handleSubmit, errors, reset } = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [variant, setVariant] = useState('primary');

    const router = useRouter()

    useEffect (() => {
        getMetaData();
    }, [])

    async function getMetaData(){
        try{
            const apiRes = await axios({
                method: 'GET',
                url: `api/utils/domain-metadata`,
                headers: {
                    "Accept": "application/json"
                },
            });

            if(apiRes.status === 200){
                const data = await apiRes.data;
                console.log(data);
                setTags(data.tags);
                setDomainName(data.name);
                setDescription(data.description);
                setSupportEmail(data.email);
                setId(data.id);
                setDatasets(data.datasets);
                setDeployed(data.deployed);
                setOwner(data.owner);
            }
            else{
                alert("Couldn't fetch the metadata!")
            }

        }
        catch (e) {
            console.error(e);
        }
    }

    const tagItems = tags.map((tag) =>
        <Tag>{tag}</Tag>
    );

    const onSubmitForm = async (values) => {
        try {
            const username =  values.username;
            const password =  values.password;
            const body =JSON.stringify({
                username,
                password
            })
            console.log("values from login page", body)
            const apiRes = await fetch("api/login",
                {
                    method: "POST",
                    headers:{
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    },
                    body: body
                });
            if(apiRes.status == 200){
                router.push('/users')
                setVariant('success');
                setAlertMessage('Your credentials are correct!')
                setShowAlert(true);
            }
            else if(apiRes.status == 400) {
                console.error(err)
                setVariant('error');
                setAlertMessage('Your application is still pending!');
                setShowAlert(true);
            }
            else{
                console.error(err)
                setVariant('error');
                setAlertMessage('Your credentials are incorrect!');
                setShowAlert(true);
            }
        }catch (err) {
            console.error(err)
            setVariant('error');
            setAlertMessage('This user either does not exist or the application is still pending!');
            setShowAlert(true);
        }
    }

    return(
        <Background>
            <div id="app" tw="flex flex-col h-screen w-screen py-10 font-roboto">
                <div id="header" tw="grid grid-cols-12 bg-gray-100 bg-opacity-5 rounded-lg gap-6 py-4">
                    <img tw="col-start-2 col-span-2 object-scale-down h-14 pl-10" src={"/assets/small-logo.png"} alt="py-grid-logo"/>
                    <div tw="col-start-9 col-span-4">
                        <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant} autoDelete={true} autoDeleteTime={3000}>
                            <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                            <p>{alertMessage}</p>
                        </Alert>
                    </div>
                </div>
                <div id="content" tw="grid grid-cols-12 flex-grow text-gray-800 text-left text-lg py-4 rounded-lg gap-6 ">
                <div id="domain-box" tw="col-start-2 col-end-6 my-10 p-10 text-gray-800">
                        {tagItems}
                        <h1 id="domain-name" tw="font-rubik font-bold text-left text-5xl my-4">{domainName}</h1>
                        <p tw="text-base my-5">{description}</p>
                        <div tw="divide-y divide-gray-200 divide-solid">
                        <ul id="domain-info" tw="text-left text-sm font-semibold mt-4 mb-8">
                        <li tw="py-3" key={id.key}>
                                <a>ID#: </a>
                                <a>{id}</a>
                        </li>
                        <li tw="py-3" key={datasets.key}>
                                <a>Hosted Datasets: </a>
                                <a>{datasets}</a>
                        </li>
                        <li tw="py-3" key={deployed.key}>
                                <a>Deployed On: </a>
                                <a>{moment(deployed).format('YYYY-MMM-DD HH:MM')}</a>
                        </li>
                        <li tw="py-3" key={owner.key}>
                                <a>Owner: </a>
                                <a>{owner}</a>
                        </li>
                        <li tw="py-3" key={networks.key}>
                                <a>Network: </a>
                                <a>{networks}</a>
                        </li>
                        
                        </ul>
                        <div id="support_contact" tw="text-left text-sm pt-4">
                            <p>For further assistance please email:</p>
                            <a href={"mailto:" + supportEmail} tw="text-blue-500 underline">{supportEmail}</a>
                        </div>
                    </div>
                    </div>
                    <div id="login-form" tw="col-start-7 col-end-12 bg-white p-5 m-10 mt-40 mb-40 h-auto max-h-96 max-w-xl shadow-lg text-gray-800 text-center text-lg rounded">
                        <div tw="mx-3">
                            <p tw="text-2xl">Welcome Back</p>
                            <div tw="inline-block"><DomainConnectionStatus/></div>
                        </div>
                        <form tw="grid grid-cols-4 flex-grow text-gray-600 text-sm text-center p-6 rounded-lg gap-2" onSubmit={handleSubmit(onSubmitForm)}>
                            <label tw="col-span-4 text-left" htmlFor="email">Email<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                            <input 
                                tw="col-span-4 text-left p-3 border border-gray-300 rounded-lg  
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800 " 
                                name="username" 
                                type="email" 
                                placeholder="abc@university.edu" 
                                autoComplete="on"  
                                {...register("username", { required: true, message: 'You must enter an email'})} 
                            />
                            <label tw="col-span-4 text-left" htmlFor="name">Password<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                            <input 
                                tw="col-span-4 text-left p-3 border border-gray-300 rounded-lg
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800" 
                                name="password" 
                                type="password" 
                                placeholder="Text here" 
                                autoComplete="on"  
                                {...register("password", { required: "Password required!"})} 
                            />
                            <p tw="col-span-4 text-center text-gray-600 text-sm">Don't have an account yet?
                                <a href="/signup" tw="ml-1 col-span-4 text-center text-blue-500 underline">Apply for an account here</a>
                            </p> 
                            <button tw="col-start-2 col-end-4 bg-primary-500 rounded text-white text-center mx-6 px-3 py-2" type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <div id="footer" tw="grid grid-cols-12 gap-6">
                    <div tw="col-start-2 col-span-4 pl-10">
                        <div tw="inline-block py-3 mt-4 text-gray-600 text-lg text-center">Empowered By</div>
                        <img tw="inline-block object-contain h-8 ml-2" src={"/assets/small-om-logo.png"} alt="om-logo"/>
                    </div>
                </div>
            </div>
        </Background>
    )
}