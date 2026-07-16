
const SidebarHeader = ({children, className}) => {
  return (
    <div className={`w-full flex justify-center  ${className}`}>
        {children}
    </div>
  )
}

export default SidebarHeader