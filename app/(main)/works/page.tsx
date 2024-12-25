

const workExperiences: any[] = [
    {
        jobTitle: "Front-end Developer",
        company: "Ihifix Innovation Hub",
        startDate: "10-05-2024",
        description: <ul>
            <li></li>
        </ul>
    }
]

export default function Works() {
    return (
        <div className=" bg-gray-200 flex flex-col items-center bg-gray-200 p-6 text-gray-800 min-h-screen">
            <div className="mt-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">My Experience working with companies</h2>
                {workExperiences.length === 0 ? (   
                <p className="text-gray-600">No work experience added yet.</p>
                ) : (
                <ul className="space-y-6">
                    {workExperiences.map((experience, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white shadow-md rounded-lg border w-full border-gray-200"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {experience.jobTitle}
                    </h3>
                    <p className="text-gray-600 mb-2">
                    <strong className="font-medium text-gray-700">Company:</strong>{" "}
                    {experience.company}
                    </p>
                    <p className="text-gray-600 mb-2">
                    <strong className="font-medium text-gray-700">Start Date:</strong>{" "}
                    {experience.startDate} <br />
                    <strong className="font-medium text-gray-700">End Date:</strong>{" "}
                    {experience.endDate || "Present"}
                    </p>
                    <span className="text-gray-600">{experience.description}</span>
                </li>
                 ))}
                </ul>
                )}
            </div>
        </div>
    );
  }