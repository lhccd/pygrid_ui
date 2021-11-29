import Image from 'next/image'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import React from "react";
import Tag from '../components/Tag'
const Background = styled.div`
    background-image: url("../signup_background_image.png");
    height: 100vh;
    background-position: right top; 
    background-repeat: no-repeat; 
    background-size: auto; 
`

const DomainBody = [
    { ID :'ID#449f4f997a96467f90f7af8b396928f1'},
    { ID : '2', },
    { ID : '09.07.2021', },
    { ID : ['Kyoko Eng', '---'],},
    { ID: '---'}
     
]

export default function Signup() {
  const { register, handleSubmit, errors, reset } = useForm();

  function onSubmitForm(values){
    console.log(values);
  }

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
                    <div id="domain-box" tw="col-start-2 col-end-6 my-10 p-10">
                        <div id="tags">
                        <Tag>Commodities</Tag>
                        <Tag>Trade</Tag>
                        <Tag>Canada</Tag>
                        </div>
                        <h1 id="domain-name" tw="text-left text-5xl my-4">Canada Domain</h1>
                        <p tw="text-base my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in vulputate enim. Morbi scelerisque, ante eu ultrices semper, ipsum nisl malesuada ligula, non faucibus libero purus et ligula.</p>
                        <div tw="divide-y divide-gray-200 divide-solid">
                          <ul id="domain-info" tw="text-left text-sm font-semibold mt-4 mb-8">
                              {DomainBody.map( e => (
                                  <li tw="py-1" key={'ID#'}>
                                          <a>ID#: </a>
                                          <a>{e.ID}</a>
                                  </li>
                              ))}
                          </ul>
                          <div id="support_contact" tw="text-left text-sm pt-4">
                              <p>For further assistance please email:</p>
                              <p>support@abc.com</p>
                          </div>
                        </div>
                    </div>
                    <div id="login-form" tw="flex-col h-4/6 col-start-7 col-end-12 bg-white p-5 m-3 shadow-lg text-gray-600 content-center text-lg rounded">
                        <form onSubmit={handleSubmit(onSubmitForm)} tw="grid grid-cols-4 text-gray-600 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
                            <div tw="col-span-4 my-3 text-left">
                                <p tw="text-2xl">Apply for an Account</p>
                            </div>
                            <div tw="col-span-2 text-left ">
                              <label tw="block my-2" htmlFor="fullname">Full Name</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="fullname" 
                                name="fullname" 
                                type="fullname" 
                                placeholder="Jane Doe" 
                                autoComplete="fullname" 
                                {...register("fullname", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 text-left">
                              <label tw="block my-2"  htmlFor="company">Company/Institution (optional)</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="company" 
                                name="company" 
                                type="company" 
                                placeholder="ABC University" 
                                autoComplete="company" 
                                {...register("company", { required: true })}
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
                                autoComplete="email" 
                                {...register("email", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="pw">Password</label>  
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full"  
                                id="pw" 
                                name="pw" 
                                type="pw" 
                                placeholder="Text here" 
                                autoComplete="pw" 
                                {...register("pw", { required: true })}
                              />
                            </div>
                            <div tw="col-span-2 block text-left">
                              <label tw="block my-2" htmlFor="confirmpw">Confirm Password</label>
                              <input 
                                tw="block p-3 border border-gray-300 rounded-lg w-full" 
                                id="confirmpw" 
                                name="confirmpw" 
                                type="confirmpw" 
                                placeholder="Text here" 
                                autoComplete="confirmpw"
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
                                autoComplete="website"
                                {...register("website", { required: true })}
                              />
                            </div>
                            <button tw="col-start-2 col-end-4 bg-primary-500 rounded text-white text-center mx-6 px-3 py-2 my-5" type="submit">Submit Application</button>
                            <p tw="col-span-4 text-center text-gray-600 text-sm font-normal">Have an account already?
                                  <a href="/#" tw="col-span-4 text-center text-blue-500"> Login here</a>
                            </p> 

                        </form>
                        {/* <form onSubmit={handleSubmit}>
                          <input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={state.email}
                            required
                          />
                          <textarea
                            name="message"
                            placeholder="Enter message"
                            onChange={handleChange}
                            value={state.message}
                            required
                          />
                          <input type="file" name="file" onChange={handleChange} />
                          <input
                            name="bot-field"
                            type="text"
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                          <button type="submit">Send</button>
                        </form> */}
                    </div>
                </div>
                <div id="footer" tw="grid grid-cols-12 gap-6">
                    <div tw="col-start-2 col-span-4 pl-10">
                        <div tw="inline-block p-3 mt-4 text-gray-600 text-lg text-center">Empowered By</div>
                        <img tw="inline-block object-contain h-8" src={"/assets/small-om-logo.png"} alt="om-logo"/>
                    </div>
                </div>
            </div>
          </Background>
    )
}