'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CocktailHero = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/cocktails.jpg" 
          alt="Elegant Cocktails" 
          fill 
          priority 
          className="object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white font-optima text-5xl md:text-6xl font-light mb-6"
            style={{ color: '#F5F5F5' }}
          >
            Cocktail Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white text-xl md:text-2xl max-w-2xl mx-auto mb-8"
            style={{ color: '#E0E0E0' }}
          >
            Discover a world of exquisite flavors and crafted cocktails
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CocktailHero;