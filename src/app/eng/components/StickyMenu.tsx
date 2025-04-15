'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const menuCategories = [
  {
    category: "Cocktails & Shots",
    link: "/eng/menu/cocktails",
  },
  {
    category: "Soft Drinks",
    link: "/eng/menu/soft-drinks",
  },
  {
    category: "Champagne & Wines",
    link: "/eng/menu/champagne-wines",
  },
  {
    category: "Beers & Liquor",
    link: "/eng/menu/beers-drinks",
  },
  {
    category: "Asian / Sushi",
    link: "/eng/menu/asian-sushi",
  },
  {
    category: "Starters",
    link: "/eng/menu/starters",
  },
  {
    category: "Fish & Meat",
    link: "/eng/menu/fish-and-meat",
  },
  {
    category: "Pasta & Pizzas",
    link: "/eng/menu/pastas-pizzas",
  },
  {
    category: "Desserts",
    link: "/eng/menu/desserts",
  }
];


export default function StickyMenuNavigation({ selectedCategory = null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Sticky Navigation */}
      <motion.nav 
        className={`w-full z-50 fixed top-0 left-0 transition-all duration-500
          ${isSticky ? 'bg-stone-900/90 backdrop-blur-md' : 'bg-transparent'}`}
        animate={{
          height: isSticky ? 64 : 80,
          borderBottom: isSticky ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-6xl h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: isSticky ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="/logo.png" 
                alt="Restaurant Logo" 
                width={isSticky ? 70 : 85}
                height={isSticky ? 25 : 30}
                className="object-contain transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Burger Icon Only (Menu text removed) */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center justify-center w-8 h-8 relative">
              <motion.span 
                className={`block h-px w-6 absolute ${isMenuOpen ? 'bg-white' : isSticky ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -4,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className={`block h-px w-6 absolute ${isMenuOpen ? 'bg-white' : isSticky ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className={`block h-px w-6 absolute ${isMenuOpen ? 'bg-white' : isSticky ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 4,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-stone-900"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 h-24 w-24 border-t border-l border-amber-200/20"></div>
            <div className="absolute bottom-0 right-0 h-24 w-24 border-b border-r border-amber-200/20"></div>
            
            {/* Menu Content */}
            <div className="flex flex-col justify-center items-center h-full pt-16 relative z-10">
              {/* Elegant Menu Items with reduced spacing */}
              <div className="flex flex-col justify-center items-center space-y-2 px-4 max-w-md w-full">
                {menuCategories.map((item, index) => (
                  <Link 
                    key={item.category} 
                    href={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                      className="relative group"
                    >
                      <motion.div 
                        className={`
                          text-center text-xl py-2 leading-tight font-serif transition-all duration-300
                          ${selectedCategory === item.category 
                            ? 'text-amber-200' 
                            : 'text-stone-200 group-hover:text-amber-100'}
                        `}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.category}
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-1/2 h-px bg-amber-200/30 w-0 transform -translate-x-1/2 transition-all duration-300 group-hover:w-16"
                        whileHover={{ width: 64 }}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}