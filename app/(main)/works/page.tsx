

const workExperiences: any[] = [
    {
        jobTitle: "Front-end Developer",
        company: "Ihifix Innovation Hub",
        startDate: "10-05-2024",
        description: (
            <ol className="list-disc p-4 pt-0 lg:text-xl">
                <li>Developed and maintained scalable user interfaces using React and Next.js.</li>
                <li>Collaborated with designers and backend developers to implement responsive and user-friendly web applications.</li>
                <li>Integrated state management solutions like Redux to optimize application performance and maintain scalability.</li>
                <li>Ensured cross-browser compatibility and performance optimization for web applications.</li>
                <li>Participated in code reviews and provided constructive feedback to improve code quality.</li>
                <li>Implemented reusable components to standardize development across multiple projects.</li>
                <li>Resolved technical issues and bugs to ensure a seamless user experience.</li>
            </ol>
        ),
    }
    
]

export default function Works() {
    return (
        <div className=" bg-gray-200 flex flex-col items-center p-6 text-gray-800 min-h-screen">
            <div className="mt-5 w-full ">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center capitalize">My Experience working with companies</h2>
                {workExperiences.length === 0 ? (   
                <p className="text-gray-600">No work experience added yet.</p>
                ) : (
                <ul className="space-y-6 p-4 ">
                    {workExperiences.map((experience, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
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