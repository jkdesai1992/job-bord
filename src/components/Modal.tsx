import React, { Fragment } from 'react';

interface ModalProps {
    className?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, className = '' }) => {
    return (
        <Fragment>
            <div
                className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${className}`}
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                    {children}
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </Fragment>
    );
};

export default Modal;


