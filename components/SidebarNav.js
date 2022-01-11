import tw from 'twin.macro'
import {faUsers, faCheck, faLemon, faHandsHelping, faChevronDown, faUserCircle, faThLarge} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {logout} from '../lib/auth'
import DomainConnectionStatus from '../components/DomainConnectionStatus'
import useSWR from 'swr'

const SidebarNav = () => {
    return (
        <aside tw="flex flex-col justify-between h-screen sticky top-0 bg-gradient-to-r from-black to-gray-800 text-gray-200 py-6 min-w-min max-w-xs">
            <DomainInfo tw="p-6" />
            <div tw="my-10"></div>
            <nav tw="text-lg mb-auto">
                <ul tw="">
                    <Link href="/dashboard">
                        <div tw="flex items-center space-x-3 px-3 py-4 hover:bg-gray-500">
                            <div tw="p-2">
                                <FontAwesomeIcon size="sm" icon={faThLarge} />
                            </div>
                            <a>Dashboard</a>
                        </div>
                    </Link>
                    <Link href="/users">
                        <div tw="flex items-center space-x-3 px-3 py-4 hover:bg-gray-500">
                            <div tw="p-2">
                                <FontAwesomeIcon size="sm" icon={faUsers} />
                            </div>
                            <a>Users</a>
                        </div>
                    </Link>
                    <Link href="/permissions">
                        <div tw="flex items-center space-x-3 px-3 py-4 hover:bg-gray-500">
                            <div tw="p-2">
                                <FontAwesomeIcon size="sm" icon={faCheck} />
                            </div>
                            <a>Permissions</a>
                        </div>
                    </Link>
                    <Link href="/requests">
                        <div tw="flex items-center space-x-3 px-3 py-4 hover:bg-gray-500">
                            <div tw="p-2">
                                <FontAwesomeIcon size="sm" icon={faLemon} />
                            </div>
                            <a>Requests</a>
                        </div>
                    </Link>
                    <Link href="/networks">
                        <div tw="flex items-center space-x-3 px-3 py-4 hover:bg-gray-500">
                            <div tw="p-2">
                                <FontAwesomeIcon size="sm" icon={faHandsHelping} />
                            </div>
                            <a>Networks</a>
                        </div>
                    </Link>
                </ul>
            </nav>
            <footer tw="text-lg">
                <div tw="px-3">
                    <DomainConnectionStatus/>
                </div>
                <CurrentUser/>
            </footer>
        </aside>
    )
}

function CurrentUser() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/user-profile', fetcher)
    if (error) return <div>failed to load user</div>
    if (!data) return <div>loading...</div>
  
    return (
        <Link href="/account_settings">
            <div tw="flex items-center space-x-3 px-6 py-5 hover:bg-gray-500">
                <div>
                    <FontAwesomeIcon icon={faUserCircle} size="sm" />
                </div>
                <p>{data.full_name}</p>
            </div>
        </Link>
    )
}

function DomainInfo(){
    return (
        <header>
            <div tw="flex items-center space-x-2 my-6 mx-4">
                <img src="/avatar.jpg" tw="w-20 h-20 rounded-full" alt="Canada Domain"/>
                <div id="content" tw="relative w-auto truncate">
                    <p tw="relative text-xl font-bold truncate">Canada Domain</p>
                    <p tw="relative text-lg truncate">ID: 5724724357124372437</p>
                    <button tw="text-left" onClick={logout}>
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
export {SidebarNav}

