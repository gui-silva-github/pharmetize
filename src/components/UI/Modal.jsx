import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children, open, onClose, className = '' }){

    const dialog = useRef()

    useEffect(() => {
        const modal = dialog.current

        if (open && modal){
            modal.showModal()
        }

        return () => modal.close()
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-xl bg-[#e4ddd4] rounded-lg shadow-lg p-4 ${className}`} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal')
    )

}