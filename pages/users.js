import loadCustomRoutes from 'next/dist/lib/load-custom-routes'
import Layout from '../components/Layout'
import Avatar from '../components/Avatar'
import tw from 'twin.macro'
import {faUsers, faCheck, faLemon, faHandsHelping, faChevronDown, faUserCircle} from '@fortawesome/free-solid-svg-icons'
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
            <Avatar name="Canada Domain" picture="/avatar.jpg" domainid="ID: 5724724357124372437"/>
            <button tw="text-left">
              <p size="sm" underline tw="lowercase bg-transparent hover:text-white">
                {('logout')}
              </p>
            </button>
        </header>   
    )
}


export default function Users({ ninjas }){

    console.log(ninjas)

    return (
        <div tw="relative min-h-screen flex">
            <div tw="flex flex-col justify-between bg-gradient-to-b from-gray-800 to-gray-900 text-gray-600 w-64 py-3 px-3">
                <DomainInfo/>
                <nav>
                    <ul>
                        
                    </ul>
                    <a tw="block py-2 px-5 text-gray-600 text-lg">Dashboard</a>
                    <a tw="block py-2 px-5 text-gray-600 text-lg">Users</a>
                    <a tw="block py-2 px-5 text-gray-600 text-lg">Permissions</a>
                    <a tw="block py-2 px-5 text-gray-600 text-lg">Requests</a>
                    <a tw="block py-2 px-5 text-gray-600 text-lg">Networks</a>
                </nav>
                <footer>
                    <div>Domain Online</div>
                    <div>Profile KYOKO ENG</div>
                </footer>
            </div>
            <div tw="flex-1 p-10 text-2xl font-bold">
                <div id="grid" tw="grid grid-cols-12 gap-2 px-10">
                    {ninjas.map(ninja => (
                        <div key={ninja.id}>
                            <div key={ninja.id} tw="bg-primary-200 text-white p-3 rounded-2xl">{ninja.name}</div>
                            <div key={ninja.phone} tw="bg-primary-200 text-white p-3 rounded-2xl">{ninja.address.city}</div>
                        </div>
                    ))}
                    <p tw="col-span-12">Aute proident laboris occaecat in incididunt aliqua quis commodo ipsum ex adipisicing nulla sint. Incididunt nulla officia officia laborum commodo voluptate commodo deserunt velit. Incididunt Lorem nulla cupidatat deserunt aute aliquip deserunt laboris in mollit tempor nisi. Tempor enim aliquip Lorem ad minim non reprehenderit irure culpa.

Tempor culpa ex ut commodo ea reprehenderit veniam. Non cillum consequat non eu commodo laborum et commodo Lorem commodo. Commodo dolor nisi culpa et consectetur minim ea ipsum. Id fugiat voluptate anim laboris proident adipisicing nisi pariatur nostrud excepteur pariatur commodo eu. Ad culpa eu reprehenderit excepteur. Voluptate nisi do consequat non eiusmod qui elit ex sunt sunt elit aliqua.

Mollit sint et id esse occaecat aute ipsum aliquip sint. Exercitation commodo esse irure et exercitation elit pariatur. Aliquip voluptate aliquip qui eiusmod mollit labore et qui eiusmod labore tempor exercitation tempor. Id elit fugiat esse consectetur eiusmod voluptate eu velit. Esse aliquip ipsum velit non pariatur deserunt ex deserunt esse quis mollit.

Laboris eiusmod quis deserunt exercitation nulla consequat consequat deserunt aute dolore veniam culpa excepteur. Eiusmod aliquip do incididunt ut ea nulla proident eiusmod cupidatat quis. Amet Lorem adipisicing tempor magna dolor nulla aute ut. Exercitation cillum proident et Lorem. Ipsum nulla aliquip tempor adipisicing elit irure. Ullamco et dolor nulla consequat commodo exercitation id aute fugiat magna. Cupidatat aliqua quis nostrud quis incididunt irure deserunt sunt ad esse reprehenderit exercitation.

Enim duis ex ipsum non officia anim. Veniam aute pariatur qui culpa ullamco occaecat ea eiusmod esse velit exercitation consectetur. Ad aute id dolore irure pariatur. Lorem amet qui ad ipsum laboris aliqua tempor culpa consectetur ullamco ad exercitation veniam dolor. Dolor fugiat excepteur occaecat ullamco.

Culpa pariatur amet quis ipsum elit veniam nisi ea consectetur aute. Sunt irure et amet ut dolore labore fugiat mollit ea. Sunt nisi non adipisicing incididunt veniam deserunt voluptate culpa in. Cillum eu irure laborum proident amet est sit esse duis officia duis non. Duis cillum pariatur fugiat consequat officia sint anim consectetur culpa anim officia adipisicing. Sunt consectetur cupidatat veniam non proident. Qui enim qui dolor ut ut et veniam.

Dolore elit sit anim anim mollit exercitation minim culpa sint id sint. Amet cupidatat veniam dolor veniam ea veniam in in culpa non officia voluptate eiusmod. Officia id ipsum velit in laborum nulla aliqua id. Enim qui aliquip Lorem cillum qui deserunt nostrud. Exercitation ad officia irure cupidatat.</p>
                </div>
                
            </div>
        </div>
    )
}

