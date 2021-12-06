import Grid from './Grid'
import SidebarNav from './SidebarNav'
import Page from './Page'
import tw from 'twin.macro'

export default function Layout({children}){
    return(
        <div tw="min-h-screen flex">
            <SidebarNav/>
            <main>
                <Page>
                    <Grid>{children}</Grid>
                </Page>
            </main>
        </div>
    )
}