import React, {
    FC,
    ReactNode,
    useState
} from 'react';

interface ModalProps {
    modalVisible: boolean,
    setModalVisible: (b : boolean) => void,
    children: ReactNode,
    clickExitDisabled?: boolean
}

// This is taken straight from Thaeta
// Good job Ian!
const Modal : FC<ModalProps> = ({
    modalVisible,
    setModalVisible,
    children,
    clickExitDisabled
} : ModalProps) => {


    return (
        <div className={`z-30 transition duration-250 ease-in-out ${modalVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} z-40 absolute top-0 left-0 right-0 bottom-0 flex-col justify-center items-center`}>
            <div className={`z-20 flex flex-col justify-center items-center absolute top-0 right-0 left-0 bottom-0 `}
            onClick={() => clickExitDisabled ? null : setModalVisible(false)}
            >
                {children}
            </div>
            <div className={`z-0 absolute flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-black opacity-20 ${modalVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
            ></div>
        </div>
    )
}
export default Modal;