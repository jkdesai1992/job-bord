import { FormState, JobListField } from "../api/job"


interface JobCardProps {
  isDeleteLoadingId: string;
  cardDetails: JobListField;
  onEditJob: (cardDetails: FormState) => void;
  handleDeleteClick: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ cardDetails, isDeleteLoadingId, onEditJob, handleDeleteClick }) => {
  const {
    id,
    jobTitle,
    companyName,
    location,
    remoteType,
    totalEmployee,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
    applyType
  } = cardDetails;

  const isDeleting = isDeleteLoadingId === id
  return (
    <div
      className="w-[830px] min-h-[320px] shadow-lg ml-16 mb-16 flex rounded-lg p-4 sm:flex-row flex-col bg-white border-solid border-2 border-slate-100"
    >
      <div className="w-[782px] h-72 justify-between items-start gap-[413px] inline-flex">
        <div className="w-[357px] self-stretch justify-start items-start gap-2 flex">
          <img className="w-12 h-12 rounded-[5px]" alt="img" src="https://india.postsen.com/content/uploads/2023/07/18/ae75c2d018.jpg" />
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex-col justify-start items-start gap-6 flex">
              <div className="flex-col justify-start items-start flex">
                <div className="text-black text-2xl font-normal">{jobTitle}</div>
                <div className="text-black text-base font-normal leading-normal">{companyName}</div>
                <div className="text-neutral-500 text-base font-normal leading-normal">{location} {remoteType && `(${remoteType})`}</div>
              </div>
              <div className="self-stretch h-[120px] flex-col justify-start items-start gap-2 flex">
                <div className="flex-col justify-start items-start flex">
                  <div className="text-neutral-800 text-base font-normal leading-normal">Part-Time (9.00 am - 5.00 pm IST)</div>
                </div>
                {
                  minExperience && maxExperience &&
                  <div className="text-neutral-800 text-base font-normal leading-normal">
                    Experience ({minExperience} - {maxExperience} years)
                  </div>
                }
                {
                  minSalary && maxSalary &&
                  <div className="text-neutral-800 text-base font-normal leading-normal">
                    INR (₹) {minSalary} - {maxSalary} / Month
                  </div>
                }
                {totalEmployee && <div className="text-neutral-800 text-base font-normal leading-normal">{totalEmployee} employees</div>}
              </div>
              <div className="justify-start items-center gap-4 inline-flex">
                {
                  applyType === 'Quick apply' ?
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">Apply Now</button> :
                    <button className="w-48 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      External Apply
                    </button>
                }
                <button
                  onClick={() => onEditJob(cardDetails)}
                  className="px-4 py-2 bg-sky-500 rounded-md text-white text-base font-medium leading-normal">Edit</button>
                <button
                  onClick={() => handleDeleteClick(cardDetails.id)}
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  )
}

export default JobCard