import Image from 'next/image'
import tw, { styled } from 'twin.macro'
import { useForm } from "react-hook-form"
import React, {useState} from "react";
import Tag from '../components/Tag'
import Textfield from '../components/Textfield'
import axios from "axios";
import {useRouter} from "next/router";

const Background = styled.div`
    background-image: url("../public/signup_background_image.png");
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

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit, errors, reset } = useForm();
  const [DAARequired, setDAARequired] = useState(true);
  const [DAAUploaded, setDAAUploaded] = useState(true);

  /*
    async function onSubmitForm(values){
        const formData = new FormData
        //formData.append("full_name", values.full_name)
        formData.append("email", values.email)
        formData.append("password", values.password)
        let config = {
            method: 'post',
            url: 'http://localhost/api/v1/login/access-token',
            data: formData
        }
        try{
            console.log("config data: ", values)
            const response = await axios(config)
            router.push('/users')
            console.log(response);
        }catch (err){
            console.error(err);
        }
    }

   */

    async function onSubmitForm(values){
        console.log(values);
        axios.post('http://localhost/api/v1/users/open', {
            "password": values.password,
            "email": values.email,
            "full_name": values.full_name,
            "institution": values.institution,
            "website": values.website
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /*
    async function onSubmitForm(values){
    let config = {
      method: 'post', 
      url: 'http://localhost/api/v1/users/open',
      //headers: {
      //  'Content-Type': 'application/json'
      //},
      body: {
          "password": values.password,
          "email": values.email,
          "full_name": values.full_name,
      },
    }
    try{
      const response = await axios(config);
      console.log(response); 
    }catch (err){
      console.error(err);
    }
  }

     */

  /*
  async function onSubmitForm(values){
    console.log(values)
    const registerForm = {
      username: values.username, 
      password: values.password
    }
    const response = await fetch('http://localhost/api/v1/login/access-token',
    {
      method: 'POST',
      body: registerForm
    })
    const data = await response.json()
    console.log(data)
  }
     */

/*     const registerUser = event => {
        event.preventDefault()
        console.log(this.state)
    }

    const [state, setState] = React.useState({
      email: "",
      message: "",
      file: null
    });
  
    function handleChange(e) {
      if (e.target.files) {
        setState({ ...state, [e.target.name]: e.target.files[0] });
      } else {
        setState({ ...state, [e.target.name]: e.target.value });
      }
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      let formData = new FormData();
  
      for (let [key, value] of Object.entries(state)) {
        formData.append(key, value);
      }
    } */

    return(
        <Background>
            <div id="app" tw="flex flex-col h-screen w-screen py-10">
                <div id="header" tw="grid grid-cols-12 bg-gray-100 bg-opacity-5 rounded-lg gap-6 py-4">
                    <img tw="col-start-2 col-span-2 object-scale-down h-14 pl-10" src={"/assets/small-logo.png"} alt="py-grid-logo"/>
                </div>
                <div id="content" tw="grid grid-cols-12 flex-grow text-gray-600 text-left text-lg rounded-lg gap-6 ">
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
                    {/* <div id="login-form" tw="flex-col h-4/6 col-start-7 col-end-12 bg-white p-5 m-3 shadow-lg text-gray-500 content-center text-lg rounded">
                        <form onSubmit={handleSubmit(onSubmitForm)} tw="grid grid-cols-4 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
                            <div tw="col-span-4 my-3 text-left text-gray-800">
                                <p tw="text-2xl">Apply for an Account</p>
                            </div>
                            <div tw="col-span-2 text-left ">
                              <label tw="block my-2" htmlFor="fullname">Full Name</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="fullname" 
                                name="fullname" 
                                type="text" 
                                placeholder="Jane Doe" 
                                autoComplete="on" 
                                {...register("fullname", { required: true, message: 'You must enter a name'})}
                              />
                            </div>
                            <div tw="col-span-2 text-left">
                              <label tw="block my-2"  htmlFor="company">Company/Institution (optional)</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="company" 
                                name="company" 
                                type="text" 
                                placeholder="ABC University" 
                                autoComplete="on" 
                                {...register(
                                  "company", 
                                  { 
                                    required: true 
                                  })}
                              />
                            </div>
                            <div tw="col-span-4 text-left">
                              <label tw="block my-2" htmlFor="email">Email</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="abc@university.edu" 
                                autoComplete="on" 
                                {...register("email", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="pw">Password</label>  
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full"  
                                id="pw" 
                                name="pw" 
                                type="password" 
                                placeholder="Text here" 
                                autoComplete="on" 
                                {...register("pw", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="confirmpw">Confirm Password</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="confirmpw" 
                                name="confirmpw" 
                                type="password" 
                                placeholder="Text here" 
                                autoComplete="on"
                                {...register("confirmpw", { required: true })}
                              />
                            </div>
                            <div tw="col-span-4 block text-left">
                              <label tw="block my-2" htmlFor="website">Website/Profile</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="website" 
                                name="website" 
                                type="text" 
                                placeholder="This can help a domain owner vett your application" 
                                autoComplete="on"
                                {...register("website", { required: true })}
                              />
                            </div>
                            <div tw="col-span-4 block text-left">
                              <label tw="block my-2" htmlFor="website">Website/Profile</label>
                              <Textfield 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="website" 
                                name="website" 
                                type="text" 
                                placeholder="This can help a domain owner vett your application" 
                                autoComplete="on"
                                {...register("website", { required: true })}
                              />
                            </div>
                            <button tw="col-start-2 col-end-4 bg-primary-500 rounded text-white text-center mx-6 px-3 py-2 my-5" type="submit">Submit Application</button>
                            <p tw="col-span-4 text-center text-gray-600 text-sm font-normal">Have an account already?
                                  <a href="/login" tw="col-span-4 text-center text-blue-500"> Login here</a>
                            </p> 

                        </form>
                    </div> */}
                    <div id="login-form" tw="flex-col col-start-7 col-end-12 bg-white p-5 m-3 shadow-lg text-gray-500 content-center text-lg rounded">
                        <form onSubmit={handleSubmit(onSubmitForm)} tw="grid grid-cols-4 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
                            <div tw="col-span-4 my-3 text-left text-gray-800">
                                <p tw="text-2xl">Apply for an Account</p>
                            </div>
                            <div tw="col-span-2 text-left ">
                              <label tw="block my-2" htmlFor="full_name">Full Name</label>
                              <input
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="full_name"
                                name="full_name"
                                type="text" 
                                placeholder="Jane Doe" 
                                autoComplete="on" 
                                 {...register("full_name", { required: true, message: 'You must enter a name'})}
                              />
                            </div>
                            <div tw="col-span-2 text-left">
                              <label tw="block my-2"  htmlFor="institution">Company/Institution (optional)</label>
                              <input
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="institution"
                                name="institution"
                                type="text" 
                                placeholder="ABC University" 
                                autoComplete="on" 
                                {...register(
                                  "institution",
                                  { 
                                    required: false
                                  })}
                              />
                            </div>
                            <div tw="col-span-4 text-left">
                              <label tw="block my-2" htmlFor="email">Email</label>
                              <input  
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                name="email"
                                type="email" 
                                placeholder="abc@university.edu" 
                                autoComplete="on" 
                                {...register("email", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="pw">Password</label>  
                              <input  
                                tw="block p-3 border border-gray-300 rounded-lg w-full"  
                                name="password" 
                                type="password" 
                                placeholder="Text here" 
                                autoComplete="on" 
                                {...register("password", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="confirmpw">Confirm Password</label>
                              <input
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="confirmpw" 
                                name="confirmpw" 
                                type="password" 
                                placeholder="Text here" 
                                autoComplete="on"
                                {...register("confirmpw", { required: true })}
                              />
                            </div>
                            <div tw="col-span-4 block text-left">
                              <label tw="block my-2" htmlFor="website">Website/Profile</label>
                              <input
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="website" 
                                name="website"
                                type="text" 
                                placeholder="This can help a domain owner vett your application"
                                autoComplete="on"
                                {...register("website", { required: false })}
                              />
                            </div>
                            {(()=> {if (DAARequired) {
                                return (
                                    <div tw="col-span-4 block text-left">
                                        <label tw="block my-2" htmlFor="daa">Upload Signed</label>
                                        <p>This domain requires a Data Access Agreement (DAA) to be signed before an
                                            account can be made. Please download the agreement below and upload a
                                            signed version when you are ready to apply.</p>
                                        {DAAUploaded ?
                                            <div>
                                                <button
                                                    tw="col-start-2 col-end-4 text-primary-500 rounded bg-white text-center mx-6 px-3 py-2 my-5">
                                                    Replace File
                                                </button>
                                                <button
                                                    tw="col-start-2 col-end-4 text-primary-500 rounded bg-white text-center mx-6 px-3 py-2 my-5">
                                                    Download Agreement
                                                </button>
                                            </div>
                                            :
                                            <div>
                                                <button
                                                    tw="col-start-2 col-end-4 text-primary-500 rounded bg-white text-center mx-6 px-3 py-2 my-5">
                                                    Upload File
                                                </button>
                                                <button
                                                    tw="col-start-2 col-end-4 text-primary-500 rounded bg-white text-center mx-6 px-3 py-2 my-5">
                                                    Download agreement
                                                </button>
                                            </div>
                                        }
                                    </div>
                                )} else {return ""}
                            })}
                            <button tw="col-start-2 col-end-4 bg-primary-500 rounded text-white text-center mx-6 px-3 py-2 my-5" type="submit">Submit Application</button>
                            <p tw="col-span-4 text-center text-gray-600 text-sm font-normal">Have an account already?
                                  <a href="/login" tw="col-span-4 text-center text-blue-500"> Login here</a>
                            </p> 

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