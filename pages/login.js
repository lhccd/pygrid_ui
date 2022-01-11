import styled from 'styled-components'
import { useForm } from "react-hook-form"
import DomainConnectionStatus from '../components/DomainConnectionStatus'
import tw from 'twin.macro'
import Tag from '../components/Tag'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {login} from '../lib/auth'
import Alert from '../components/Alert';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle, faExclamationTriangle, faExpandAlt, faTimes} from '@fortawesome/free-solid-svg-icons'
import {getToken} from '../lib/auth'

const Background = styled.div`
    background-image: url("../signup_background_image.png");
    height: 100vh;
    background-position: right top; 
    background-repeat: no-repeat; 
    background-size: auto; 
`

const DomainBody = [
    {
      ID :'ID#449f4f997a96467f90f7af8b396928f1',
      HostedDatasets : '2',
      DeployedOn : '09.07.2021',
      Owner : ['Kyoko Eng', 'United Nations'],
      Network : '---',
      SupportContact : 'support@abc.com'
    }
  ]

export default function Login() {
    const { register, handleSubmit, errors, reset } = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState('primary')
    const router = useRouter()

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
                setShowAlert(true);
            }
            else{
                alert("Ooops! Bad credentials :/")
            }

        }catch (err) {
            console.error(err)
            setVariant('error');
            setShowAlert(true);
        }
    }

    return(
        <Background>
            <div id="app" tw="flex flex-col h-screen w-screen py-10">
                <div id="header" tw="grid grid-cols-12 bg-gray-100 bg-opacity-5 rounded-lg gap-6 py-4">
                    <img tw="col-start-2 col-span-2 object-scale-down h-14 pl-10" src={"/assets/small-logo.png"} alt="py-grid-logo"/>
                    <div tw="col-start-9 col-span-4">
                        <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant}>
                            <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                            {variant==='error' ? <p>Your credentials are incorrect!</p> : <p>Your credentials are correct!</p>}
                        </Alert>
                    </div>
                </div>
                <div id="content" tw="grid grid-cols-12 flex-grow text-gray-800 text-left text-lg py-4 rounded-lg gap-6 ">
                <div id="domain-box" tw="col-start-2 col-end-6 my-10 p-10 text-gray-800">
                        <div id="tags">
                        <Tag>Commodities</Tag>
                        <Tag>Trade</Tag>
                        <Tag>Canada</Tag>
                        </div>
                        <h1 id="domain-name" tw="font-rubik font-bold text-left text-5xl my-4">Canada Domain</h1>
                        <p tw="text-base my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in vulputate enim. Morbi scelerisque, ante eu ultrices semper, ipsum nisl malesuada ligula, non faucibus libero purus et ligula.</p>
                        <div tw="divide-y divide-gray-200 divide-solid">
                        <ul id="domain-info" tw="text-left text-sm font-semibold mt-4 mb-8">
                        <li tw="py-3">
                                <a>ID#: </a>
                                <a>{DomainBody[0].ID}</a>
                        </li>
                        <li tw="py-3">
                                <a>Hosted Datasets: </a>
                                <a>{DomainBody[0].HostedDatasets}</a>
                        </li>
                        <li tw="py-3">
                                <a>Deployed On: </a>
                                <a>{DomainBody[0].DeployedOn}</a>
                        </li>
                        <li tw="py-3">
                                <a>Owner: </a>
                                <a>{DomainBody[0].Owner}</a>
                        </li>
                        <li tw="py-3">
                                <a>Network: </a>
                                <a>{DomainBody[0].Network}</a>
                        </li>
                        
                        </ul>
                        <div id="support_contact" tw="text-left text-sm pt-4">
                            <p>For further assistance please email:</p>
                            <p>{DomainBody[0].SupportContact}</p>
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
                                <a href="/signup" tw="col-span-4 text-center text-blue-500"> Apply for an account here</a>
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