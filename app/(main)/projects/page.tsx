'use client'
import { Key } from "react";
import { useGetProjectsQuery, useServeImageQuery } from "@/slices/requestSlice";
import Image from "next/image";
import { GetProjects, Project } from "@/types/authtype";

const projects = [
  {
    name: "Ubedu",
    url: "/https://ubedu.onrender.com/",
    description: "Ubedu is a school management system web application",
    image: "/ubedu.png",
  },
  {
    name: "Ubefu",
    url: "inprogress",
    description: "A MOOC platform where users can create courses or watch courses",
    image: "/dashboard.png"
  },
  {
    name: "Travel Iten",
    url: "https://traveliten.vercel.app/",
    description: "Book for flights, hotels or Tourist attraction in this tourism app called TravelIten!!!",
    image: "/traveliten.png"
  },
  {
    name: "BCA-HealthCare",
    url: "https://bcahealthcarenetwork.com/",
    description: "BCA-HealthCare is a healthcare platform connecting patients and providers with features like appointment scheduling and secure communication. Built with Next.js and TypeScript, it ensures high performance, scalability, and type-safe development, delivering a seamless, user-friendly experience tailored to streamline healthcare processes across devices.",
    image: "/bca.png"
  },
  {
    name: "Acme Dashboard",
    url: "https://nextjs-dashboard-x33e.vercel.app/dashboard/invoices",
    description: "This project is a demo sale invoice dashboard I built which included user authentication.The email is user@nextmail.com and password is 123456",
    image: "/Acme.png",
  },
]

export default function Page() {
  const { data, isLoading, error, isSuccess } = useGetProjectsQuery();
  const baseurl = "http://52.23.177.142"
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   console.error("Error fetching projects:", error);
  //   return <p>Something went wrong while fetching projects.</p>;
  // }

  return (
    <div className="flex flex-col items-center bg-gray-200 p-6 text-gray-800 min-h-screen">
      <p className="text-4xl font-semibold mb-2 text-center">Projects</p>
      <p className="font-semibold mb-2 text-center">Showcasing my Journey in Front-end development</p>
      <div className="mt-10 ">
        { projects.map((project: any, index: Key | null | undefined) => (
            <ProjectCard key={index} project={project} />
          ))}
      </div>
    </div>
  );
}

// Separate component to fetch and display the image for each project
function ProjectCard({ project }: { project: Project }) {
  // const { data, isLoading: isImageLoading, isSuccess, isError } = useServeImageQuery(project.image);
  // const baseurl = "https://danielolaitan.live:5010"
  // if (isSuccess){
  //   console.log("fetched image sucessfully");
  //   console.log(data);
  // }
  // if(isError) console.log("error");

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 lg:w-4/5 mx-auto mb-10 transition-transform transform hover:scale-105 hover:shadow-xl">
      <Image
        src={`${project.image}`}
        alt="Project Image"
        width={400}
        height={400}
        className="w-full h-64 lg:w-fit mx-auto lg:h-[500px] object-fit rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <p className="text-sm text-blue-600 mt-1">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {project.url}
          </a>
        </p>
        <p className="text-gray-600 mt-2 text-justify lg:text-xl">{project.description}</p>
      </div>
    </div>
  );
}
