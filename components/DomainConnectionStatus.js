import tw from 'twin.macro'

export default function DomainConnectionStatus() {
    const isError = true
    const isLoading = false
  
    let bgColor = 'success'
    let message = 'Domain online'
  
    if (isError) {
      bgColor = 'red'
      message = 'Domain offline'
    }
  
    if (isLoading) {
      bgColor = 'gray'
      message = 'Checking connection...'
    }
  
    return (
      <div tw="flex items-center p-4 space-x-2 text-sm">
        <div tw="relative flex w-2 h-2">
          {isLoading && (
            <span tw="absolute inline-flex w-full h-full bg-gray-400 rounded-full opacity-75 animate-ping"></span>
          )}
          <span tw="relative rounded-full w-2 h-2 bg-error-500" />
        </div>
        <p>{message}</p>
      </div>
    )
  }