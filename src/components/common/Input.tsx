import React, { Fragment } from 'react';

interface RemoteTypeInputProps {
    value: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    inputClass?: string;
    placeholder?: string;
    errorMsg?: string;
    type?: string;
    min?: number;
}

const Input: React.FC<RemoteTypeInputProps> = ({ label = '', type = 'text', name, value, required, placeholder = '', onChange, inputClass = '', errorMsg, min }) => {
    return (
        <Fragment>
            {
                label &&
                <label htmlFor={label} className={`block text-sm font-semibold leading-6 text-gray-900 float-left mb-1 ${required ? 'required' : ''}`}>
                    {label}
                </label>
            }
            <div className="mt-2.5">
                <input
                    type={type}
                    name={name}
                    autoComplete={name}
                    placeholder={placeholder}
                    value={value}
                    min={min}
                    onChange={onChange}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${inputClass}`}
                />
                {errorMsg && <span className='float-left text-red-600'>{errorMsg}</span>}
            </div>
        </Fragment>
    );
};

export default Input;
