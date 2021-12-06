import loadCustomRoutes from 'next/dist/lib/load-custom-routes'
import Layout from '../components/Layout'
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

const navItems = [
    {name: 'Users', link: '/users', icon: faUsers},
    {name: 'Permissions', link: '/permissions', icon: faCheck},
    {
      name: 'Requests',
      link: '/requests/data',
      icon: faLemon,
      children: [
        {name: 'Data Requests', link: '/requests/data'},
        {name: 'Upgrade Requests', link: '/requests/upgrade'}
      ]
    },
    {name: 'Networks', link: '/networks', icon: faHandsHelping}
]

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


export default function Users({ ninjas }){

    console.log(ninjas)

    return (
        <div tw="relative min-h-screen flex">
            <div tw="flex flex-col justify-between bg-gradient-to-r from-black to-gray-800 text-gray-200 w-64 py-6">
                <DomainInfo tw="p-6"/>
                <div tw="my-10"></div>
                <nav tw="text-lg mb-auto">
                    <ul tw="space-y-8">
                        <Link href="/dashboard">
                            <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500">   
                                <div tw="p-2">
                                    <FontAwesomeIcon size="sm" icon={faThLarge}/>
                                </div>
                                <a>Dashboard</a>
                            </div>
                        </Link>
                        <Link href="/users">
                            <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500"> 
                                <div tw="p-2">  
                                    <FontAwesomeIcon size="sm" icon={faUsers}/>
                                </div>
                                <a>Users</a>
                                </div>
                        </Link>
                        <Link href="/permissions">
                            <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500">  
                                <div tw="p-2"> 
                                    <FontAwesomeIcon size="sm" icon={faCheck}/>
                                </div>        
                                <a>Permissions</a>
                            </div>
                        </Link>
                        <Link href="/requests">
                            <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500">   
                                <div tw="p-2">
                                    <FontAwesomeIcon size="sm" icon={faLemon}/>
                                </div>
                                <a>Requests</a>
                                </div>
                        </Link>
                        <Link href="/networks">
                            <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500">   
                                <div tw="p-2">
                                    <FontAwesomeIcon size="sm" icon={faHandsHelping}/>
                                </div>
                                <a>Networks</a>
                            </div>
                        </Link>
                    </ul>
                </nav>
                <footer tw="text-lg space-y-10">
                    <DomainConnectionStatus/>
                    <div tw="flex items-center space-x-3 px-6 hover:bg-gray-500">
                        <div>
                            <FontAwesomeIcon icon={faUserCircle} size="sm"/>
                        </div>
                        <p tw="">Kyoko Eng</p>
                    </div>
                </footer>
            </div>
            <div tw="flex-1 p-10 text-2xl font-bold">
                <div id="grid" tw="grid grid-cols-12 grid-rows-6 gap-2 px-10 m-5">
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
                </div>
            </div>
        </div>
    )
}

