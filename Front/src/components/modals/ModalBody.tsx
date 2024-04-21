import { createContext, useRef } from "react";
import { createPortal } from "react-dom";
import { UseModalParams } from "../../hooks/useModal";

export const ModalContext = createContext<UseModalParams>({
    isOpen: false,
    open: () => {},
    close: () => {}
})

const ModalBody = ({params, children} : {params: UseModalParams, children: JSX.Element}) => {

    const {isOpen,open,close} = params;
    const bodyRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: EventTarget) => {
        if(bodyRef.current === e) {
            close();
        } 
    }

    return createPortal(
        <ModalContext.Provider value={{isOpen: isOpen, open: open, close: close}}>
            {
                isOpen ? 
                <div className="fixed h-full w-full inset-0">
                    <div className="absolute inset-0 bg-black opacity-20" ></div>
                    <div ref={bodyRef} className="absolute h-full w-full flex items-center justify-center" onClick={(e) => closeModal(e.target)}>
                        {children}
                    </div>
                </div> : null
            }
        </ModalContext.Provider>,
        document.getElementById("modal")!
    )
}

export default ModalBody;