import {Grid} from './Grid'
import {SidebarNav} from './SidebarNav'
import {Page} from './Page'
import tw from 'twin.macro'

export function Layout(props){
    return(
        <div tw="flex font-roboto">
            <SidebarNav current={props.current}/>
            <main tw="relative w-full h-full max-w-full px-16 py-10">
                {/* <Page> */}
                    <Grid>{props.children}</Grid>
                {/* </Page> */}
            </main>
        </div>
    )
}