const Button = ({text, className}) => {
  return (
    <>
        <button className={` bg-[#fb4c19] rounded-3xl ${className} text-white `}>{text}</button>
    </>
  )
}

export default Button
