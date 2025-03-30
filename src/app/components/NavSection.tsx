'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wine, Coffee, Pizza, Fish, Salad, Cake, Beer, Droplet, Utensils } from 'lucide-react';

// Define types for menu items
interface MenuCategory {
  category: string;
  link: string;
  icon: React.ReactNode;
  description: string;
}

// Menu categories with added icons
const menuCategories: MenuCategory[] = [
  {
    category: "Cocktails & Shots",
    link: "/menu/cocktails",
    icon: <Wine size={18} />,
    description: "Artisanal mixed drinks crafted with premium spirits"
  },
  {
    category: "Soft Drinks",
    link: "/menu/soft-drinks",
    icon: <Droplet size={18} />,
    description: "Refreshing non-alcoholic beverages"
  },
  {
    category: "Champagne & Wines",
    link: "/menu/wines",
    icon: <Wine size={18} />,
    description: "Exceptional selections from renowned vineyards"
  },
  {
    category: "Beers & Drinks",
    link: "/menu/beers",
    icon: <Beer size={18} />,
    description: "Craft and imported brews from around the world"
  },
  {
    category: "Asian / Sushi",
    link: "/menu/asian-sushi",
    icon: <Utensils size={18} />,
    description: "Traditional and contemporary Eastern delicacies"
  },
  {
    category: "Starters",
    link: "/menu/starters",
    icon: <Salad size={18} />,
    description: "Small plates to begin your culinary journey"
  },
  {
    category: "Fish & Meat",
    link: "/menu/fish-and-meat",
    icon: <Fish size={18} />,
    description: "Premium seafood and finest cuts prepared to perfection"
  },
  {
    category: "Pastas & Pizzas",
    link: "/menu/pastas-pizzas",
    icon: <Pizza size={18} />,
    description: "Italian classics crafted with authentic techniques"
  },
  {
    category: "Desserts",
    link: "/menu/desserts",
    icon: <Cake size={18} />,
    description: "Sweet finales to complete your dining experience"
  }
];

interface MenuNavigationProps {
  selectedCategory?: string | null;
}

export default function MenuNavigation({ selectedCategory = null }: MenuNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-[#81715E] mx-auto mb-8"
          />
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-optima text-3xl md:text-5xl font-light text-center mb-4"
            style={{ color: '#81715E' }}
          >
            {selectedCategory ? `${selectedCategory}` : 'Curated Selections'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm mb-6 tracking-wide max-w-2xl mx-auto text-center italic"
            style={{ color: '#81715E' }}
          >
            {selectedCategory 
              ? `Discover our exquisite ${selectedCategory ? selectedCategory.toLowerCase() : ''} created with passion and precision` 
              : 'Embark on a gastronomic journey through our thoughtfully curated offerings'}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-px bg-[#81715E] mx-auto"
          />
        </motion.div>

        {/* Mobile Menu Trigger */}
        {!selectedCategory && (
          <div className="md:hidden mb-8">
            <motion.button
              className="w-full bg-[#81715E] text-white py-4 rounded-md flex items-center justify-center shadow-md"
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="mr-2 font-light tracking-wider">Browse Our Menu</span>
              <ChevronDown 
                className={`transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`} 
              />
            </motion.button>
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {!selectedCategory && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6 }}
                className="md:hidden space-y-3 mb-10 overflow-hidden"
                variants={containerVariants}
              >
                {menuCategories.map((item, index) => (
                  <Link 
                    key={item.category} 
                    href={item.link}
                    className="block"
                  >
                    <motion.div
                      className="w-full bg-white border border-neutral-200 text-neutral-700 px-5 py-4 rounded-md flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                      whileTap={{ scale: 0.98 }}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <span className="mr-3 text-[#81715E]">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-xs text-neutral-500 mt-1">{item.description}</div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Desktop Grid */}
        <motion.div 
          className={`
            ${selectedCategory ? 'hidden md:block' : 'hidden md:grid grid-cols-3 gap-6'}
          `}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {(selectedCategory 
            ? menuCategories.filter(item => item.category === selectedCategory)
            : menuCategories
          ).map((item, index) => (
            <Link 
              key={item.category} 
              href={item.link}
              className="block"
              onMouseEnter={() => handleMouseEnter(item.category)}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className={`
                  relative w-full text-left px-6 py-5 rounded-md transition-all duration-500 overflow-hidden group
                  ${selectedCategory 
                    ? 'bg-[#81715E] text-white' 
                    : 'bg-white text-neutral-700 hover:shadow-lg border border-neutral-200'}
                `}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <span className={`mr-3 ${selectedCategory ? 'text-white' : 'text-[#81715E]'}`}>{item.icon}</span>
                    <h3 className="font-medium tracking-wide">{item.category}</h3>
                  </div>
                  <p className={`text-xs ${selectedCategory ? 'text-neutral-200' : 'text-neutral-500'} mt-1`}>
                    {item.description}
                  </p>
                </div>
                
                {/* Animated background on hover */}
                <motion.div 
                  className="absolute inset-0 bg-[#81715E] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredItem === item.category ? 1 : 0,
                    opacity: hoveredItem === item.category ? 0.1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    originX: 0.5, 
                    originY: 0.5,
                    borderRadius: '0.375rem' 
                  }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Selected Category Display */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex justify-center"
          >
            <Link 
              href="/menu"
              className="inline-block mt-8 px-6 py-3 bg-[#81715E] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="tracking-wider font-light">View Full Menu</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}