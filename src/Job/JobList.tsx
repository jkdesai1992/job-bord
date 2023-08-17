import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { FormErrors, FormState, JobListField, createJob, deleteJob, editJob, getJobList } from "../api/job";
import JobCard from "./JobCard";
import Spinner from "../components/common/Spinner";
import { validateField } from "../utils/validationUtils";
import CreateJobModal from "./CreateJobModal";
import { HeaderContext } from "../App";

const initialState: FormState = {
    jobTitle: '',
    companyName: '',
    industry: '',
    location: '',
    remoteType: '',
    minExperience: '',
    maxExperience: '',
    minSalary: '',
    maxSalary: '',
    totalEmployee: '',
    applyType: '',
};


const JobList = () => {
    const context = useContext(HeaderContext);
    const [jobList, setJobList] = useState<JobListField[]>([])
    const [formData, setFormData] = useState<FormState>(initialState);
    const [editId, setEditId] = useState<string>('');
    const [formError, setFormErrors] = useState<FormErrors>(initialState);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isDeleteLoadingId, setDeleteLoadingId] = useState<string>('');
    const [isModalLoading, setModalLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getJobList();
                setJobList(response.data)
                setLoading(false)
            } catch (error) {
                window.alert("Something went wrong please try again")
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: validateField(name, value),
        }));
    };
    const checkValidation = () => {
        const validationErrors: FormErrors = Object.keys(formData).reduce(
            (errors, name) => {
                const fieldValue = formData[name as keyof FormState];
                if (fieldValue !== undefined) {
                    const error = validateField(name, fieldValue);
                    if (error) {
                        (errors as any)[name] = error;
                    }
                }
                return errors;
            },
            {} as FormErrors
        );
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }
    }

    const postJob = async () => {
        try {
            const apiResponse = await createJob(formData);
            if (apiResponse.status === 201) {
                const updatedJobList = [...jobList, apiResponse.data];
                setJobList(updatedJobList)
                setFormData(initialState)
                window.alert("Job created successfully")
            }
            setModalLoading(false)
            context?.setIsModalVisible(false)
        } catch (err) {
            setModalLoading(false)
            window.alert("Something went wrong please try again")
        }

    }

    const updateJob = async () => {
        try {
            const apiResponse = await editJob(formData, editId);
            if (apiResponse.status === 200) {
                const cloneJobList = [...jobList];
                const findIndex = cloneJobList.findIndex(job => job.id === editId)
                if(findIndex !== -1) {
                    cloneJobList[findIndex] = apiResponse.data
                    setJobList(cloneJobList)
                    setFormData(initialState)
                    setEditId('')
                    window.alert("Job update successfully")
                }
            }
            context?.setIsModalVisible(false)
            setModalLoading(false)
        } catch (err) {
            setModalLoading(false)
            window.alert("Something went wrong please try again")
        }
    }

    const handleSubmit = async () => {
        if (!formData.jobTitle || !formData.companyName || !formData.industry) {
            checkValidation()
            return null
        }
        setModalLoading(true)
        if(editId){
          updateJob()
        } else {
          postJob()
        }
    };

    const onEditJob = (item: JobListField) => {
        context?.setIsModalVisible(true)
        setEditId(item.id)
        setFormData(item)
    }

    const handleDeleteClick = async (id: string) => {
        setDeleteLoadingId(id)
        try {
            const apiResponse = await deleteJob(id);
            if (apiResponse.status === 200) {
                const cloneJobList = [...jobList];
                const findIndex = cloneJobList.findIndex(job => job.id === id)
                if(findIndex > -1){
                    cloneJobList.splice(findIndex, 1)
                    setJobList(cloneJobList)
                    window.alert("Job delete successfully")
                }
            }
            setDeleteLoadingId('')
        } catch (err) {
            setDeleteLoadingId('')
            window.alert("Something went wrong please try again")
        }
    }

    const closeModal = () => {
        context?.setIsModalVisible(false)
        setFormData(initialState)
        setEditId('')
    }

    if (isLoading) {
        return <Spinner />
    }

    if (jobList.length === 0 && !isLoading) {
        return <div className="px-5 py-5 mx-auto">Data not found</div>;
    }

    return (
        <div className="px-5 py-5 mx-auto">
            {context?.isModalVisible &&
                <CreateJobModal
                    formData={formData}
                    formError={formError}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                    isLoading={isModalLoading}
                    checkValidation={checkValidation}
                    handleInputChange={handleInputChange} />}
            <div className="flex flex-wrap">
                {jobList.length > 0 && jobList.map((item, index) => (
                    <Fragment key={index}>
                        <JobCard
                            cardDetails={item}
                            onEditJob={() => onEditJob(item)}
                            isDeleteLoadingId={isDeleteLoadingId}
                            handleDeleteClick={() => handleDeleteClick(item.id)} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default JobList