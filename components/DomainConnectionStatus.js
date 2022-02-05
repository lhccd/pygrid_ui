import { useEffect, useState } from 'react';
import tw from 'twin.macro'
import axios from 'axios'

export default function DomainConnectionStatus() {
  const [online,setOnline] = useState(false);

  async function getMetaData(){
    try{
      const apiRes = await axios({
        method: 'GET',
        url: `api/utils/domain-metadata`,
        headers: {
          "Accept": "application/json"
        }
      });

      if(apiRes.status === 200){
        const data = await apiRes.data;
        console.log(data);
        setOnline(true);
      }
      else{
        setOnline(false);
      }

    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    getMetaData();
  })

  let message = 'Domain online'
  if (online ? message = 'Domain online' : message = 'Domain offline') 

  return (
    <div tw="flex items-center p-4 space-x-2 text-sm">
      <div tw="relative flex w-2 h-2">
        {online ? (
          // <span tw="absolute inline-flex w-full h-full bg-success-500 rounded-full opacity-75 animate-ping"></span>
          <span tw="relative rounded-full w-2 h-2 bg-success-500"></span>
        ) : <span tw="relative rounded-full w-2 h-2 bg-error-500" />}
      </div>
      <p>{message}</p>
    </div>
  )
}