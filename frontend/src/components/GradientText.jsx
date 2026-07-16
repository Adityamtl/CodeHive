
const GradientText = ({children, className}) => {
  return (
    <span className={`bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text  font-bold text-transparent ${className}`}>{children}</span>
  )
}

export default GradientText