'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const DrinksHero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/champagne.jpg" 
          alt="Fine Wines and Champagnes" 
          fill 
          priority 
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800/80 to-stone-950/90"></div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-1/2 h-1/2"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(245, 245, 245, 0.08) 0%, transparent 70%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-start h-full max-w-7xl mx-auto px-8 md:px-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-lg"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-amber-300 mb-8"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-6xl font-light mb-6 text-stone-100 tracking-wide"
          >
            Vins & <br/><span className="italic text-amber-200">Champagnes</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone-300 text-lg font-light leading-relaxed mb-10 max-w-md"
          >
            Discover our curated selection of Moroccan and international wines, along with prestigious champagnes to elevate your dining experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              onClick={scrollToMenu}
              className="px-8 py-3 border border-amber-300 text-amber-200 hover:bg-amber-900 hover:bg-opacity-20 transition-colors duration-300 text-sm tracking-widest uppercase"
            >
              View Menu
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DrinksHero;