import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FormErrors, FormState } from "../api/job";
import StepOne from './StepOne';
import StepTwo from './StepTwo';

interface ModalProps {
  closeModal: () => void;
  handleSubmit: () => void;
  checkValidation: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormState;
  formError: FormErrors;
  isLoading: boolean;
}

export interface ModalStepProps {
  closeModal?: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormState;
  formError: FormErrors;
}

const CreateJobModal: React.FC<ModalProps> = ({ closeModal, handleInputChange, formData, formError, isLoading, handleSubmit, checkValidation }) => {
  const [activeStep, setActiveStep] = useState(1)

  const handelActiveState = () =>{
    const {jobTitle, companyName, industry} = formData

    if(!jobTitle || !companyName || !industry){
      checkValidation()
    } else {
      setActiveStep((prevState) => prevState + 1)
    }
  }

  const handleStep = () => {
    switch(activeStep) {
      case 1:
        return <StepOne handleInputChange={handleInputChange} formData={formData} formError={formError}/>
      case 2:
        return <StepTwo handleInputChange={handleInputChange} formData={formData} formError={formError} />
    }
  }

  return (
    <Modal>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none min-h-[564px] min-w-[577px]">
        <div className="isolate relative p-8 flex-auto">
          <div className="flex items-center justify-between">
            <div className="text-zinc-900 text-xl font-normal">Create a job</div>
            <div className="text-right text-zinc-900 text-base font-medium leading-normal">
              Step {activeStep}
            </div>
          </div>
          <form className="mx-auto mt-6">
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 gap-6">
              {handleStep()}
            </div>
            <div className="flex justify-between mt-24">
              <button onClick={closeModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Close
              </button>
              <button
                type="button"
                onClick={activeStep === 1 ? handelActiveState : handleSubmit}
                className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''} rounded-md primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-blue-500`}
              >
                {isLoading ? 'Loading...' : activeStep === 1 ? 'Next' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateJobModal;