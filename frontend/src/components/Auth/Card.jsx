const Card = ({img, className}) => {
  return (
    <>
        <div className={` ${className} absolute  `}>
            <img className=' h-full w-full rounded-lg' src={img} alt="card-image" />
        </div>
    </>
  )
}

export default Card
