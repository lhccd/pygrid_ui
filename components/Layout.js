import {Grid} from './Grid'
import {SidebarNav} from './SidebarNav'
import {Page} from './Page'
import tw from 'twin.macro'

export function Layout({children}){
    return(
        <div tw="flex">
            <SidebarNav/>
            <main tw="relative">
                <Page>
                    <Grid>{children}</Grid>
                </Page>
            </main>
        </div>
    )
}