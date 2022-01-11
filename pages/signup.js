import Image from 'next/image'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import Tag from '../components/Tag'
import Alert from '../components'
import Textfield from '../components/Textfield'
import axios from "axios"
import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import {faPlus, faUserPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import fileSaver from "file-saver";

const Background = styled.div`
    background-image: url("../signup_background_image.png");
    height: 100vh;
    background-position: right top; 
    background-repeat: no-repeat; 
    background-size: auto; 
`

const DomainBody = [
  {
    ID: 'ID#449f4f997a96467f90f7af8b396928f1',
    HostedDatasets: '2',
    DeployedOn: '09.07.2021',
    Owner: ['Kyoko Eng', 'United Nations'],
    Network: '---',
    SupportContact: 'support@abc.com'
  }
]

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit, errors, reset } = useForm();
  const [DAARequired, setDAARequired] = useState(true);
  const [DAAUploaded, setDAAUploaded] = useState(false);
  const [daa, setDaa] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  async function onSubmitForm(values) {
    const formData = new FormData
    formData.append("email", values.email)
    formData.append("full_name", values.full_name)
    formData.append("institution", values.institution)
    formData.append("password", values.password)
    formData.append("website", values.website)
    formData.append("daa_pdf", values.daa_pdf[0])
    let config = {
      method: 'post',
      url: 'http://localhost/api/v1/users/open-daa',
      data: formData
    }
    try {
      console.log("config data: ", values)
      const response = await axios(config)
      router.push('/login')
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  const onUploadDaa = (e) => {
    setDAAUploaded(true);
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

  return (
    <Background>
      <div id="app" tw="flex flex-col h-screen w-screen py-10">
        <div id="header" tw="grid grid-cols-12 bg-gray-100 bg-opacity-5 rounded-lg gap-6 py-4">
          <img tw="col-start-2 col-span-2 object-scale-down h-14 pl-10" src={"/assets/small-logo.png"} alt="py-grid-logo" />
          <div tw="col-start-9 col-span-4">
            {/* <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant}>
                <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                {variant==='error' ? <p>Your credentials are incorrect!</p> : <p>Your credentials are correct!</p>}
            </Alert> */}
          </div>
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
          <div id="login-form" tw="flex-col col-start-7 col-end-12 bg-white p-5 m-3 mb-60 shadow-lg text-gray-500 content-center text-lg rounded h-auto">
            <form onSubmit={handleSubmit(onSubmitForm)} tw="grid grid-cols-4 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
              <div tw="col-span-2 text-left ">
                <label tw="block my-2" htmlFor="fullname">Full Name<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                  name="full_name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="on"
                  {...register("full_name", { required: true, message: 'You must enter a name' })}
                />
              </div>
              <div tw="col-span-2 text-left">
                <label tw="block my-2" htmlFor="company">Company/Institution<p tw="pl-1 inline text-xs italic font-normal text-primary-500 ">(optional)</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
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
                <label tw="block my-2" htmlFor="email">Email<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                  name="email"
                  type="email"
                  placeholder="abc@university.edu"
                  autoComplete="on"
                  {...register("email", { required: true })}
                />
              </div>
              <div tw="col-span-2 block text-left">
                <label tw="block my-2" htmlFor="pw">Password<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                  name="password"
                  type="password"
                  placeholder="Text here"
                  autoComplete="on"
                  {...register("password", { required: true })}
                />
              </div>
              <div tw="col-span-2 inline-block text-left">
                <label tw="block my-2" htmlFor="confirmpw">Confirm Password<p tw="pl-1 inline relative bottom-1 text-primary-500">*</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                  name="confirmpw"
                  type="password"
                  placeholder="Text here"
                  autoComplete="on"
                  {...register("confirmpw", { required: true })}
                />
              </div>
              <div tw="col-span-4 block text-left">
                <label tw="block my-2" htmlFor="website">Website/Profile<p tw="pl-1 inline text-xs italic font-normal text-primary-500 ">(optional)</p></label>
                <input
                  tw="block p-3 border border-gray-300 rounded-lg w-full
                              focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                  name="website"
                  type="text"
                  placeholder="This can help a domain owner vett your application"
                  autoComplete="on"
                  {...register("website", { required: false })}
                />
              </div>
              
              {DAARequired
                ? [
                  <div tw="col-span-4 block text-left">
                    <label tw="block my-2">Upload Signed</label>
                    <p>This domain requires a Data Access Agreement (DAA) to be signed before an
                      account can be made. Please download the agreement below and upload a
                      signed version when you are ready to apply.</p>
                    {DAAUploaded
                      ?
                      <div>
                        <div tw="w-2/3 flex justify-between bg-gray-100 text-black my-4 py-1">
                          <button tw="mx-2 underline" type="button" onClick={onDAAClick}>
                            {daa.name}
                          </button>
                          <button tw="font-bold mx-2" type="button" onClick={onXClick}>
                            X
                          </button>
                        </div>
                        <div>
                          <input tw="col-start-2 col-end-4 text-primary-500 border-primary-500 rounded bg-white text-center font-bold mx-6 px-3 py-2 my-5"
                            type="button"
                            value="Replace File"
                            onClick={() => document.getElementById('daa_pdf_replace').click()} />
                          <input tw="hidden"
                            id="daa_pdf_replace"
                            name="daa_pdf_replace"
                            type='file'
                            {...register("daa_pdf", { onChange: onUploadDaa, required: false })}
                          />

                          <button
                            tw="col-start-2 col-end-4 text-primary-500 bg-white text-center font-bold mx-6 px-3 py-2 my-5">
                            Download Agreement
                          </button>
                        </div>
                      </div>
                      :
                      <div>
                        <input tw="col-start-2 col-end-4 text-primary-500 border-primary-500 rounded bg-white text-center font-bold mx-6 px-3 py-2 my-5"
                          type="button"
                          value="Upload File"
                          onClick={() => document.getElementById('daa_pdf').click()} />
                        <input tw="hidden"
                          id="daa_pdf"
                          name="daa_pdf"
                          type='file'
                          {...register("daa_pdf", { onChange: onUploadDaa, required: true })}
                        />
                        <button
                          tw="col-start-2 col-end-4 text-primary-500 bg-white text-center font-bold mx-6 px-3 my-5">
                          Download agreement
                        </button>
                      </div>
                    }
                  </div>
                ]
                : ""
              }
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
            <img tw="inline-block object-contain h-8 ml-2" src={"/assets/small-om-logo.png"} alt="om-logo" />
          </div>
        </div>
      </div>
    </Background>
  )
}