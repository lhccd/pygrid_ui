import tw from 'twin.macro'

const Header = ({icon, heading}: {icon?: ReactNode; heading: string | ReactNode}) => (
    <div className="col-span-full">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          {icon && <Icon icon={icon} variant="ghost" size="xl" />}
          {typeof heading === 'string' && <H2>{heading}</H2>}
          {typeof heading === 'object' && heading}
        </div>
        <QuickNav />
      </div>
    </div>
  )