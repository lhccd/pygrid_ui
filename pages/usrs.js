import { Layout } from '../components/Layout'
import { Tab } from '../components/Tab'
import tw, {styled} from 'twin.macro'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal'
import {useState, useEffect} from 'react';

const Two = ({ hasHover }) => (
    <div css={[tw`border border-solid border-black`, hasHover && tw`hover:border-blue-300 hover:bg-primary-500`]}>Two</div>
)
const One = () => <div tw="text-blue-300">One</div>;
        
const Button = styled.button(() => [
    tw`p-4 text-center w-1/2 bg-primary-500 rounded-3xl border`,
])

export default function Usrs() {
    const [showModal, setShowModal] = useState(false);
    return(
        <Layout>
            <div tw="col-span-12">
                <div tw="flex items-center">
                    <div tw="flex p-2 mb-2">
                        <FontAwesomeIcon size="3x" icon={faUsers} tw="mr-3"/>
                        <h1 tw="text-5xl font-rubik font-medium">Users</h1>
                    </div>
                </div>
                <p tw="mb-8">Manage users, edit user permissions and credentials.</p>
                <Tab></Tab>
            </div>
        </Layout>
    )
}