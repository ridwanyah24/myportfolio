"use client"
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon} from "@heroicons/react/16/solid";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "../../components/ui/separator";
import Link from "next/link";
import { Github, Linkedin, TwitterIcon } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Responsive Design",
    description: "Building responsive, mobile-friendly websites and applications that work seamlessly on all screen sizes, from desktops to smartphones",
  },
  {
    title: "Single Page Application (SPA) Development",
    description: "Creating fast and responsive SPAs using frameworks using React. Ensuring smooth, app-like experiences for users."
  },
  {
    title: "Frontend Optimization",
    description: "Optimizing the front end for performance, including image optimization, lazy loading, code splitting, and minimizing load times for a better user experience."
  },
  {
    title: "API Integration",
    description: "Integrating front-end applications with various APIs, handling data fetching and state management to provide dynamic content and features.",
  },
  {
    title: "Component Library Development",
    description:"Building reusable and scalable component libraries with frameworks like React or Vue, which help speed up future development and maintain consistency."
  },
  {
    title: "Code Audits and Refactoring",
    description:"Reviewing and improving existing codebases for readability, performance, scalability, and maintainability."
  },

]

const stacks = [
  {
    title: "JavaScript/TypeScript and React",
  },
  {
   title: "HTML5 and CSS3"
  },
  {
    title: "Version Control with Git"
  },
  {
    title: "State Management (Redux)"
  },
  {
    title: "Tailwind CSS / Styled Components / SCSS"
  }
]


export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-200 p-6 text-gray-800">
      {/* Profile Image and Basic Info */}
      <div className="text-center w-full">
        <Image 
          src="/headshot.jpg" 
          alt="Profile Image" 
          height={300} 
          width={300} 
          className="rounded-full shadow-lg mb-4 w-[250px] h-[250px] mx-auto mt-10"
        />
        <h1 className="text-2xl font-bold">Front-end Developer (Next.js)</h1>
        <p className="text-gray-600">Kaduna, Kaduna State, Nigeria</p>
      </div>

      {/* Contact Info */}
      <div className="flex gap-6 mt-4 text-gray-700 p-2">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-gray-500" />
          <span>+2348025347934</span>
        </div>
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          <span>oluwidaad@gmail.com</span>
        </div>
      </div>

      {/* About Me Section */}
      <section className="mt-8 lg:w-4/5 lg:mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-center ">About Me</h2>
        <p className="text-gray-500 text-justify leading-relaxed lg:text-xl md:text-lg text-md lg:leading-9">
        Hello! I&apos;m a passionate front-end developer with a keen eye for creating intuitive, user-friendly, 
        and visually engaging digital experiences. With a strong foundation in HTML, CSS, 
        JavaScript, and expertise in frameworks like React and Next.js,
         I specialize in bringing designs to life in ways that feel natural and seamless for users.
        I thrive on the challenge of solving complex design problems and optimizing user interfaces to perform smoothly across all devices.
         My journey in web development has taught me the importance of responsive design, accessibility, 
        and performance optimization, which I apply to every project I undertake.
        In addition to my technical skills, I enjoy collaborating with designers, back-end developers,
         and other stakeholders to ensure a cohesive and consistent user experience. Whether it&apos;s building a dynamic 
         single-page application or refining an existing UI, 
         I&apos;m dedicated to crafting solutions that are not only functional but also delightful to use.
        In my free time, I stay engaged with the latest trends in web development, 
        continuously learning new technologies and approaches to improve my work. 
        I&apos;m excited to bring my skills and passion for front-end development to projects that make a meaningful impact.
        </p>
      </section>
      <Separator className="mt-5 bg-gray-300 w-4/5 mx-auto"/>
    
      {/**Tech Stack */}
      <section className="flex flex-col mt-10">
        <h2 className="text-2xl font-semibold mb-2 text-center ">Tech Stack</h2>
        <span className="grid-cols-2 lg:flex w-full lg:gap-10 gap-5 w-full ">
        {stacks.map((service, key)=>
          <Card key={key} className="flex justify-center items-center bg-white shadow-lg items-center p-6 transition-transform transform hover:scale-105">
            <p className="text-gray-600 font-semibold text-center text-md sm:text-base md:text-lg leading-relaxed">
            {service.title}
            </p>
        </Card>
        )}
        </span>
      </section>

      <section className="flex flex-col mt-10 items-center text-center">
        <h2 className="text-2xl font-semibold mb-4">Explore My Work</h2>
        <p className="text-lg text-gray-600 mb-6">
          Dive into the projects I’ve crafted to showcase my expertise and creativity. 
          Check out the <span className="font-bold text-black">Projects Page</span> for more details.
        </p>
        <Link 
          href="/projects" 
          className="px-6 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          View Projects
        </Link>
      </section>

      <Separator className="mt-5 bg-gray-300 w-4/5 mx-auto"/>

      {/**Services and Expertise */}
      <section className="flex flex-col mt-10">
        <h2 className="text-2xl font-semibold mb-2 text-center ">Services</h2>
        <span className="grid grid-cols-1 lg:grid-cols-3 w-full lg:gap-10 gap-5 ">
        {services.map((service, key)=>
          <Card key={key} className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto md:max-w-md lg:max-w-lg transition-transform transform hover:scale-105">
          <CardTitle className="text-xl font-semibold text-gray-800 mb-2 text-center">
            {service.title}
          </CardTitle>
          <CardContent className="text-gray-600 text-center text-md sm:text-base md:text-lg leading-relaxed">
            {service.description}
            </CardContent>
        </Card>
        )}
        </span>
      </section>
      <Separator className="mt-5 bg-gray-300 w-4/5 mx-auto"/>


      {/**Connect with me section */}
      <h2 className="text-2xl font-semibold mb-2 text-center mt-10">Connect with me</h2>
      <section className="flex w-full items-center justify-center gap-10">
        <div className="w-[50px] h-[50px] rounded-md bg-black text-white flex items-center justify-center transition-transform transform hover:scale-105">
          <Link href={"https://x.com/yahya_ridwan"}><TwitterIcon /></Link>
        </div>
        <div className="w-[50px] h-[50px] rounded-md bg-black text-white flex items-center justify-center transition-transform transform hover:scale-105">
          <Link href={"https://www.linkedin.com/in/ridwan-yahya-14643122b/"}><Linkedin /></Link>
        </div>
        <div className="w-[50px] h-[50px] rounded-md bg-black text-white flex items-center justify-center transition-transform transform hover:scale-105">
          <Link href={"https://github.com/ridwanyah24"}><Github/></Link>
        </div>
        <div className="w-[50px] h-[50px] rounded-md bg-black text-white flex items-center justify-center transition-transform transform hover:scale-105">
          <Link href={"mailto:oluwidaad@gmail.com"}>
            <FontAwesomeIcon icon={faGoogle} style={{color:"#ffffff"}} />
          </Link>
        </div>
      </section>
      <h2 className="text-2xl font-semibold mb-2 text-center mt-10">My CV</h2>
      <span className="flex w-full justify-center gap-10 mt-5">
        <a href={"/RidwanCv1.pdf"} download={"Ridwan_CV.pdf"}>
          <Button variant={"default"} className="lg:w-[200px] h-[40px] text-lg">Download</Button>
        </a>
        <Link href={"/RidwanCv1.pdf"} target="_blank">
          <Button variant={"default"} className="lg:w-[200px] h-[40px] text-lg">View CV</Button>
        </Link>
      </span>
    </div>
  );
}
