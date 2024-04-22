const KanbanTable = ({children}: {children: JSX.Element | JSX.Element[]}) => {
    return (
        <div className="mt-5">
            <div className="h-[1px] bg-black opacity-10 my-5"></div>
            <div className="flex justify-center">
                {children}
            </div>
        </div>
    )
}

export default KanbanTable;