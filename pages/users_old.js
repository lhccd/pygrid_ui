import loadCustomRoutes from 'next/dist/lib/load-custom-routes'
import { Layout } from '../components/Layout'
import Avatar from '../components/Avatar'
import DomainConnectionStatus from '../components/DomainConnectionStatus'
import tw from 'twin.macro'
import {faUsers, faCheck, faLemon, faHandsHelping, faChevronDown, faUserCircle, faThLarge} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'


export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return {
        props: { ninjas: data }
    } 
} 


function DomainInfo(){
    return (
        <header>
            <div tw="flex items-center space-x-2 my-6 mx-4">
                <img src="/avatar.jpg" tw="w-20 h-20 rounded-full" alt="Canada Domain"/>
                <div id="content" tw="relative w-auto truncate">
                    <p tw="relative text-xl font-bold truncate">Canada Domain</p>
                    <p tw="relative text-lg truncate">ID: 5724724357124372437</p>
                    <button tw="text-left">
                    <p size="sm" underline tw="lowercase bg-transparent hover:text-white">
                        {('logout')}
                    </p>
                    </button>
                </div>
                <div tw="static top-0">
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
        </header>   
    )
}

export default function Users({ninjas}){
    console.log({ninjas})
    return (
        <Layout>
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 col-span-3 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 row-span-3 col-span-2 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 col-span-6 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 row-span-3 col-span-2 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 col-span-12 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 row-span-5 col-span-2 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 col-span-4 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 row-span-4 col-span-4 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
            {ninjas.map(ninja => (
                <div key={ninja.id} tw="bg-primary-200 col-span-6 text-white p-3 rounded-2xl">
                    <div key={ninja.id} >{ninja.name}</div>
                    <div key={ninja.phone} >{ninja.address.city}</div>
                </div>
            ))}
        </Layout>
    )
}