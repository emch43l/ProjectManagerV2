const Card = ({children} : {children: JSX.Element}) => {
    return (
        <div className="border-gray-100 border-2 p-5 rounded-lg">
            <div>
                {children}
            </div>
        </div>
    )
    
}

export default Card;