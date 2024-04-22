const KanbanTableColumn = ({children,label,width} : {children:JSX.Element | JSX.Element[],label:string,width:string}) => {
    return (
        <div className={`${width}`}>
            <div className="w-[2px] bg-black opacity-10 mx-5"></div>
            <div className="w-full">
                <h1 className="px-2 font-bold text-xl text-center text-gray-500">{label}</h1>
                <div className="flex flex-wrap justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default KanbanTableColumn;