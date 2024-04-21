const ModalCard = ({children} : {children: JSX.Element}) => {
    return (
        <div className="min-w-[500px] bg-slate-50 rounded-lg p-5">
            {children}
        </div>
    )
}

export default ModalCard;