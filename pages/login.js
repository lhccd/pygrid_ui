import styled from 'styled-components'
import { useForm } from "react-hook-form"
import tw from 'twin.macro'


const Background = styled.div`
    background-image: url("../signup_background_image.png");
    height: 100vh;
    background-position: right top; 
    background-repeat: no-repeat; 
    background-size: auto; 
`
// export const getStaticProps: GetStaticProps = async () => {
//     const DomainBody = [{
//         'ID#':'ID#449f4f997a96467f90f7af8b396928f1',
//         'Hosted Datasets': '2', 
//         'Deployed On': '09.07.2021', 
//         'Owner': ['Kyoko Eng', '---'],
//         'Network(s)': '---',
//         }
//     ]
//     return (
//         {DomainBody}
//     )
// }
const DomainBody = [
    { ID :'ID#449f4f997a96467f90f7af8b396928f1'},
    { ID : '2', },
    { ID : '09.07.2021', },
    { ID : ['Kyoko Eng', '---'],},
    { ID: '---'}
     
]

export default function Login() {
    const registerUser = async event => {
        event.preventDefault()
    
        const res = await fetch('/api/register', {
          body: JSON.stringify({
            name: event.target.name.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
    
        const result = await res.json()
        // result.user => 'Ada Lovelace'
    }

    return(
        <Background>
            <div id="app" tw="flex flex-col h-screen w-screen py-10">
                <div id="header" tw="grid grid-cols-3 bg-gray-100 bg-opacity-5 rounded-lg gap-6 p-4">
                    <img tw="col-span-1 object-scale-down h-12 ml-20" src={"/assets/small-logo.png"} alt="py-grid-logo"/>
                </div>
                <div id="content" tw="grid grid-cols-12 flex-grow text-gray-600 text-left text-lg py-4 rounded-lg gap-6 ">
                    <div id="domain-box" tw="col-start-2 col-end-6 my-10 p-10">
                        <h1 id="domain-name" tw="text-left text-2xl ">Canada Domain</h1>
                         <ul id="domain-info" tw="text-left text-sm mt-4">
                            {DomainBody.map( e => (
                                <li tw="py-1" key={'ID#'}>
                                        <a>ID#: </a>
                                        <a>{e.ID}</a>
                                </li>
                            ))}
                        </ul>
                        <div id="domain-info" tw="text-left text-sm pt-4">
                            <p>ID#: ID#449f4f997a96467f90f7af8b396928f1	</p>
                            <p>Hosted Datasets: 2</p>
                            <p>Deployed On: 09.07.2021</p>
                            <p>Owner: KYOKO ENG, ---</p>
                            <p>Network(s): ---</p>
                        </div>
                    </div>
                    <div id="login-form" tw="col-start-7 col-end-12 bg-white bg-opacity-70 p-5 m-3 h-96 shadow-lg text-gray-600 text-center text-lg">
                        <div tw="m-3">
                            <p tw="text-2xl">Welcome Back</p>
                            <p>Domain Online</p>
                        </div>
                        <form tw="grid grid-cols-4 flex-grow text-gray-600 text-sm text-center p-6 rounded-lg gap-2" onSubmit={registerUser}>
                            <label tw="col-span-4 text-left" htmlFor="email">Email</label>
                            <input tw="col-span-4 text-left p-3 border border-gray-300 rounded-lg" id="email" name="email" type="email" placeholder="abc@university.edu" autoComplete="email" required />
                            <label tw="col-span-4 text-left" htmlFor="name">Password</label>
                            <input tw="col-span-4 text-left p-3 border border-gray-300 rounded-lg" id="name" name="name" type="text" placeholder="Text here" autoComplete="name" required />
                            <p tw="col-span-4 text-center text-gray-600 text-sm">Don't have an account yet?
                                <a href="/#" tw="col-span-4 text-center text-blue-500"> Apply for an account here</a>
                            </p> 
                            <button tw="col-start-2 col-end-4 bg-blue-500 rounded text-white text-center mx-6 px-3 py-2" type="submit">Login</button>
                        </form>
                    </div>
                </div>
                <div id="footer" tw="flex flex-row p-4 rounded-lg gap-6">
                    <div tw="flex gap-2 ml-20">
                        <div tw="pt-1 text-gray-600 text-lg text-center">Empowered By</div>
                        <img tw="object-contain h-8" src={"/assets/small-om-logo.png"} alt="om-logo"/>
                    </div>
                </div>
            </div>
        </Background>
    )
}