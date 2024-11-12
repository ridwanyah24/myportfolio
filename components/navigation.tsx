'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 fixed w-full">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Yahya Ridwan Adesina</h1>
                <div className='md:grid'>
                    <button 
                        className="md:hidden text-white text-2xl focus:outline-none" 
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>
                    <ul className={`md:flex  gap-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
                        <li><Link href={""} className="hover:text-gray-300">Home</Link></li>
                        <li><Link href={""} className="hover:text-gray-300">Projects</Link></li>
                        <li><Link href={""} className="hover:text-gray-300">Works</Link></li>
                        <li><Link href={""} className="hover:text-gray-300">Articles</Link></li>
                        <li><Link href={""} className="hover:text-gray-300">Open Source Contributions</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
