import React from 'react'
import tw from 'twin.macro'
import { Button } from './../components'
import Link from 'next/link'
import {getToken} from '../services/UserService'
import {useRouter} from 'next/router'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-purple-300 to-indigo-500`,
  ],
}

export default function IndexPage() {
  const router = useRouter()
  const isAuthenticated = getToken()
  {console.log("authentication??", isAuthenticated)}

  // if (typeof window !== 'undefined'){
  //   if (isAuthenticated){
  //     router.replace('/users')
  //     return null
  //   }else{
  //     router.replace('/login')
  //     return null
  //   }
  // }
  

  return (
      <div css={styles.container({ hasBackground: true })}>
      <div tw="flex flex-col justify-center h-full gap-y-5">
        <Link href="/login">
          <a>LOGIN</a>
        </Link>
        <Link href="/signup">
          <a>SIGNUP</a>
        </Link>
        <Button variant="primary">Submit</Button>
        <Button variant="gray">Cancel</Button>
        <Button isSmall variant="primary">Close</Button>
      </div>
      <img src="/static/logo.png" alt="logo" tw="h-32 self-center object-cover absolute inset-0" />
    </div>
  )
}