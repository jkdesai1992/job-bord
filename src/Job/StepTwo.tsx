import React from 'react';
import Input from '../components/common/Input';
import { ModalStepProps } from './CreateJobModal';

const StepTwo: React.FC<ModalStepProps> = ({ formData, handleInputChange }) => {
    const radioButtonList = ['Quick apply', 'External apply']
    return (
        <>
            <div>
                <Input
                    placeholder='Minimum'
                    label="Experience"
                    name="minExperience"
                    type="number"
                    min={0}
                    onChange={handleInputChange}
                    value={formData.minExperience} />
            </div>
            <div >
                <Input
                    placeholder='Maximum'
                    name="maxExperience"
                    inputClass='mt-7'
                    type="number"
                    min={0}
                    onChange={handleInputChange}
                    value={formData.maxExperience} />
            </div>
            <div>
                <Input
                    placeholder='Minimum'
                    label="Salary"
                    name="minSalary"
                    type="number"
                    min={0}
                    onChange={handleInputChange}
                    value={formData.minSalary} />
            </div>
            <div>
                <Input
                    placeholder='Maximum'
                    name="maxSalary"
                    inputClass='mt-7'
                    type="number"
                    min={0}
                    onChange={handleInputChange}
                    value={formData.maxSalary} />
            </div>
            <div className="sm:col-span-2">
                <Input
                    placeholder='ex. 100'
                    label="Total employee"
                    name="totalEmployee"
                    type="number"
                    min={0}
                    onChange={handleInputChange}
                    value={formData.totalEmployee} />
            </div>

            <div className="sm:col-span-2">
                <label className="block text-sm font-semibold leading-6 text-gray-900 float-left mb-1">
                    Apply type
                </label>
                <div className="mt-2.5">
                    <div className="flex  w-full gap-4">
                        {
                            radioButtonList.map((item, index) => {
                                return (
                                    <div className="flex items-center mr-4" key={index}>
                                        <input
                                            name="applyType"
                                            value={item}
                                            onChange={handleInputChange}
                                            checked={formData.applyType === item}
                                            type="radio"
                                            id={`inline-radio-${index}`}
                                            className="w-4 h-4 bg-gray-100 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={`inline-radio-${index}`} className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-300">{item}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default StepTwo;

