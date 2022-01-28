import {Grid} from './Grid'
import {SidebarNav} from './SidebarNav'
import {Page} from './Page'
import tw from 'twin.macro'

export function Layout({children}){
    return(
        <div tw="flex">
            <SidebarNav/>
            <main tw="relative w-full h-full max-w-full px-16 py-10">
                {/* <Page> */}
                    <Grid>{children}</Grid>
                {/* </Page> */}
            </main>
        </div>
    )
}