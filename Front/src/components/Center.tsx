const Center = ({children} : {children: JSX.Element}) => {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div>
                {children}
            </div>
        </div>
    )
}

export default Center;