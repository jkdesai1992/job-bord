import React from 'react';
import Input from '../components/common/Input';
import { ModalStepProps } from './CreateJobModal';

const StepOne: React.FC<ModalStepProps> = ({ formData, formError, handleInputChange }) => {
    return (
        <>
            <div className="sm:col-span-2">
                <Input
                    placeholder='ex. UX UI Designer'
                    label="Job Title"
                    name="jobTitle"
                    onChange={handleInputChange}
                    required
                    errorMsg={formError.jobTitle}
                    value={formData.jobTitle} />
            </div>
            <div className="sm:col-span-2">
                <Input
                    placeholder='ex. Google'
                    label="Company name"
                    name="companyName"
                    onChange={handleInputChange}
                    required
                    errorMsg={formError.companyName}
                    value={formData.companyName} />
            </div>
            <div className="sm:col-span-2">
                <Input
                    placeholder='ex. Information Technology'
                    label="Industry"
                    name="industry"
                    errorMsg={formError.industry}
                    onChange={handleInputChange}
                    required
                    value={formData.industry} />
            </div>
            <div>
                <Input
                    placeholder='ex. Chennai'
                    label="Location"
                    name="location"
                    onChange={handleInputChange}
                    value={formData.location} />
            </div>
            <div>
                <Input
                    placeholder='ex. In-office'
                    label="Remote type"
                    name="remoteType"
                    onChange={handleInputChange}
                    value={formData.remoteType} />
            </div>
        </>
    );
};

export default StepOne;
