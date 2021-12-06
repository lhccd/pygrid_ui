import tw from 'twin.macro'

function SidebarNav(){
    return ( 
        <aside tw="flex flex-col justify-between h-screen sticky top-0 pt-8 pb-6">
                {/* <nav tw="flex-grow overflow-auto"> */}
                <nav tw="bg-gray-600 text-white">
                    <div>
                        Logo
                    </div>
                    <div>
                        HALLO
                    </div>
                    <div>
                        HALLO
                    </div>
                    <div>
                        HALLO
                    </div>
                </nav> 
                <footer tw="mt-auto flex-shrink-0 space-y-3">
                </footer>   
        </aside>
    )
}

export default SidebarNav