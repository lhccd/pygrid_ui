import { Layout } from '../components/Layout'
import { Tab } from '../components/Tab'
import tw, {styled} from 'twin.macro'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Two = ({ hasHover }) => (
    <div css={[tw`border border-solid border-black`, hasHover && tw`hover:border-blue-300 hover:bg-primary-500`]}>Two</div>
)
const One = () => <div tw="text-blue-300">One</div>;
        
const Button = styled.button(({ toggleState }) => [
    tw`p-4 text-center w-1/2 bg-white border`,
    (toggleState === 1) && tw`bg-primary-300`,
    (toggleState === 2) && tw`bg-primary-500`,
    (toggleState === 3) && tw`bg-primary-800`
])

export default function Usrs() {
    return(
        <Layout>
            <div tw="col-span-12">
                <div tw="flex items-center">
                    <div tw="p-2">
                        <FontAwesomeIcon size="3x" icon={faUsers} />
                    </div>
                    <h1 tw="text-4xl font-rubik ">Users</h1>
                </div>
                <p>Manage users, edit user permissions and credentials.</p>
                <Tab></Tab>
            </div>
        </Layout>
    )
}