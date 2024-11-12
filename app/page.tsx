"use client"
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon} from "@heroicons/react/16/solid";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "../components/ui/separator";
import Link from "next/link";
import { Github, Linkedin, TwitterIcon } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from "@fortawesome/free-brands-svg-icons"

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
  }
]
export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 text-gray-800 ">
      {/* Profile Image and Basic Info */}
      <div className="text-center w-full">
        <Image 
          src="/profile.jpeg" 
          alt="Profile Image" 
          height={300} 
          width={300} 
          className="rounded-full shadow-lg mb-4 w-[300px] h-[300px] mx-auto mt-10"
        />
        <h1 className="text-2xl font-bold">Front-end Developer (Next.js)</h1>
        <p className="text-gray-600">Kaduna, Kaduna State, Nigeria</p>
      </div>

      {/* Contact Info */}
      <div className="flex gap-6 mt-4 text-gray-700">
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
      <section className="mt-8 max-w-[700px]">
      <h2 className="text-2xl font-semibold mb-2 text-center ">About Me</h2>
        <p className="text-gray-700 text-justify leading-relaxed lg:text-2xl md:text-lg text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Facere perferendis excepturi non iusto, asperiores natus minima aspernatur repellat quia ex, quod incidunt, 
          id blanditiis laudantium modi dolorum nihil quam commodi! Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Facere perferendis excepturi non iusto, asperiores natus minima aspernatur repellat quia 
          ex, quod incidunt, id blanditiis laudantium modi dolorum nihil quam commodi!
        </p>
      </section>
      <Separator className="mt-5 bg-gray-300 w-4/5 mx-auto"/>
      {/**Services and Expertise */}
      <section className="flex flex-col mt-10">
        <h2 className="text-2xl font-semibold mb-2 text-center ">Services</h2>
        <span className="lg:flex grid w-full lg:gap-10 gap-5 ">
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
          <Link href={"oluwidaad@gmail.com"}>
            <FontAwesomeIcon icon={faGoogle} style={{color:"#ffffff"}} />
          </Link>
        </div>
      </section>

    </div>
  );
}
