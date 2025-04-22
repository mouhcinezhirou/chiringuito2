'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  useEffect(() => {
    // Smooth scroll function
    const smoothScroll = (target: string) => {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Add click event listener to the link
    const menuLink = document.querySelector('a[href="#menu"]');
    if (menuLink) {
      menuLink.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll('#menu');
      });
    }

    // Cleanup event listener
    return () => {
      if (menuLink) {
        menuLink.removeEventListener('click', (e) => {
          e.preventDefault();
          smoothScroll('#menu');
        });
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/bg.jpg" 
          alt="Chiringito Restaurant Background" 
          layout="fill" 
          objectFit="cover" 
          quality={90}
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/60"></div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-stone-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-stone-900/50 to-transparent"></div>

      {/* Language Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute top-6 right-6 z-20 flex space-x-2"
      >
        <Link 
          href="/eng" 
          className="group relative px-3 py-1 overflow-hidden"
        >
          <span className="relative z-10 text-amber-100 font-medium tracking-wider text-sm">
            ENG
          </span>
          <span className="absolute inset-0 border border-amber-200/70 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-amber-200/70 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out delay-75"></span>
        </Link>
        <Link 
          href="/es" 
          className="group relative px-3 py-1 overflow-hidden"
        >
          <span className="relative z-10 text-amber-100 font-medium tracking-wider text-sm">
            ESP
          </span>
          <span className="absolute inset-0 border border-amber-200/70 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-amber-200/70 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out delay-75"></span>
        </Link>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Image 
            src="/logo.png" 
            alt="Chiringito Logo" 
            width={200} 
            height={100} 
            className="mx-auto"
          />
        </motion.div>

        {/* Elegant line divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-px bg-amber-200/80 mb-8"
        ></motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl md:text-6xl mb-4 tracking-wide"
        >
          Passion, Love, Art 
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl mb-10 max-w-2xl font-light text-stone-200"
        >
          Il n’y a pas de plus grand amour que l’amour de la nourriture
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a 
            href="#menu" 
            className="border border-amber-200 hover:bg-amber-800/20 text-amber-100 py-3 px-8 transition duration-300 ease-in-out tracking-widest uppercase text-sm"
          >
            Explorez notre menu
          </a>
        </motion.div>
      </div>
    </div>
  );
}