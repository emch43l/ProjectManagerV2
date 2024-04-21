import { useState } from "react"

const useModal = (): UseModalParams => {
    const [isOpen,setOpen] = useState<boolean>(false);

    const open = () => {
        setOpen(true);
    }

    const close = () => {
        setOpen(false);
    }

    return {
        isOpen: isOpen,
        open: open,
        close: close,
    }
}

export type UseModalParams = {
    isOpen: boolean,
    open: () => void,
    close: () => void,
}

export default useModal;