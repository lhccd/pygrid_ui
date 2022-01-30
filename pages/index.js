import React, {useState} from 'react'
import tw from 'twin.macro'
import { Button } from './../components'
import Link from 'next/link'
import {getToken} from '../lib/auth'
import {useRouter} from 'next/router'
import axios from "axios";

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-purple-300 to-indigo-500`,
  ],
}

export default function IndexPage() {
    const router = useRouter()
    const [domainName, setDomainName] = useState("");

  // if (typeof window !== 'undefined'){
  //   if (isAuthenticated){
  //     router.replace('/users')
  //     return null
  //   }else{
  //     router.replace('/login')
  //     return null
  //   }
  // }


  async function determineDomain() {
    const apiRes = await axios({
            method: "GET",
            url: "api/utils/determine-domain",
            headers: {
                "Accept": "application/json",
            },
            params: {
                domain_name: domainName
            }
        });

    if(apiRes.status === 200){
      alert("Domain Login to " + domainName + " is successful!")
      router.push("/signup");
    }

  }

  return (
      <div css={styles.container({ hasBackground: true })}>
      <div tw="flex flex-col justify-center h-full gap-y-5">
          <input
              tw="col-span-4 text-left p-3 border border-gray-300 rounded-lg
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800 "
              name="domain_name"
              type="text"
              placeholder="Domain Name"
              value={domainName} onChange={e => setDomainName(e.target.value)}
          />
        <button tw="col-start-2 col-end-4 bg-primary-500 rounded text-white text-center mx-6 px-3 py-2 my-5" type="button" onClick={determineDomain}>Enter</button>
      </div>
      <img src="/static/logo.png" alt="logo" tw="h-32 self-center object-cover absolute inset-0" />
    </div>
  )
}