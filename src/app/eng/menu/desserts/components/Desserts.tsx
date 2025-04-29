'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  preparationTime?: string;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const DessertMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  description,
  preparationTime,
  detailedDescription,
  onExpand,
  isExpanded
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExpanded]);

  return (
    <motion.div 
      ref={itemRef}
      className="border-b border-amber-100 pb-6 mb-6 cursor-pointer group"
      whileHover={{ x: 4 }}
      onClick={onExpand}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-baseline mb-3">
        <div>
          <h3 
            className="font-serif text-xl transition-all duration-300 group-hover:text-amber-800"
            style={{ color: '#81715E' }}
          >
            {name}
          </h3>
          {preparationTime && (
            <span className="text-xs text-neutral-500 font-light">({preparationTime})</span>
          )}
        </div>
        <span 
          className="font-light text-base transition-all duration-300 group-hover:text-amber-800"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      <p className="text-neutral-600 text-sm font-light tracking-wide">{description.toLowerCase()}</p>
      <AnimatePresence>
        {isExpanded && detailedDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-neutral-500 italic text-sm pl-4 border-l-2 border-amber-200">{detailedDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {detailedDescription && (
        <div className="mt-2 text-xs text-amber-700 opacity-70 flex items-center">
          <span className="mr-1">{isExpanded ? 'Less' : 'Details'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const DessertMenuSection: React.FC<MenuSection> = ({ title, items }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white bg-opacity-60 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-12"
    >
      <h2 
        className="text-2xl font-serif tracking-wide mb-8 pb-3 border-b relative" 
        style={{ color: '#81715E', borderColor: 'rgba(129, 113, 94, 0.2)' }}
      >
        <span className="relative z-10">{title}</span>
        <motion.span 
          className="absolute bottom-0 left-0 h-[1px] bg-amber-700" 
          initial={{ width: 0 }}
          whileInView={{ width: '30%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <DessertMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
          />
        ))}
      </div>
    </motion.div>
  );
};

const DessertsMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'DESSERTS',
      items: [
        {
          name: 'Happiness Pineapple',
          price: 130,
          description: 'Homemade coconut pineapple sorbet',
          detailedDescription: 'A tropical symphony where the succulent pineapple meets the creamy sweetness of coconut, transporting your taste buds under the palms of a paradise beach.'
        },
        {
          name: 'Pain Perdu',
          price: 80,
          description: 'Salted butter caramel and vanilla ice cream',
          preparationTime: '10 min',
          detailedDescription: 'A reinvented childhood memory with golden, crispy brioche bread, topped with a smooth caramel that dances with the delicate notes of Madagascar vanilla.'
        },
        {
          name: 'Pavlova with Red Fruits',
          price: 80,
          description: 'Crispy meringue and seasonal red fruits',
          detailedDescription: 'A cloud of crispy lightness crowned with bright berries and a touch of whipped cream, like a ballet of textures revealed with every bite.'
        },
        {
          name: 'Chocolate Fondant',
          price: 80,
          description: 'Served with vanilla ice cream',
          preparationTime: '10 min',
          detailedDescription: 'A mysterious heart of intense dark chocolate that reveals itself in a flow of voluptuous heat, contrasted by the freshness of artisanal vanilla ice cream.'
        },
        {
          name: 'Speculoos Tiramisu',
          price: 80,
          description: 'Reinterpretation of the classic Italian dessert',
          detailedDescription: 'A Franco-Italian romance where the richness of mascarpone meets the warm spices of speculoos, creating a perfect harmony between sweetness and character.'
        },
        {
          name: 'Crème Brûlée',
          price: 70,
          description: 'Creamy custard with a crunchy caramel crust',
          detailedDescription: 'A timeless classic with two faces: the exquisite crunch of burnt caramel that protects a silky, delicate vanilla treasure. A waltz of perfect contradictions.'
        },
        {
          name: 'Ice cream / Sorbet',
          price: 80,
          description: 'Vanilla or lemon',
          detailedDescription: 'Frozen creations with pure, intense flavors, made fresh every day in our kitchen using carefully selected ingredients for a refreshing experience.'
        },
        {
          name: 'Seasonal Fruits',
          price: 70,
          description: 'Fresh fruit selection',
          detailedDescription: 'A colorful harvest of the best market fruits, presented in its natural simplicity to celebrate the authentic flavors nature offers us every season.'
        },
        {
          name: 'Irish Coffee',
          price: 80,
          description: 'Whiskey, coffee, and whipped cream',
          detailedDescription: 'A gentle intoxication where the elegant bitterness of coffee embraces the warmth of Irish whiskey, all delicately softened by a cloud of slightly sweet cream.'
        },
        {
          name: 'Gourmet Coffee',
          price: 80,
          description: 'Chocolate fondant, crème brûlée, and vanilla ice cream',
          detailedDescription: 'A trilogy of miniature pleasures accompanying our signature coffee, offering a full taste journey to satisfy all your sweet cravings in one plate.'
        },
        {
          name: 'Colonel',
          price: 120,
          description: 'Vodka, lemon sorbet',
          detailedDescription: 'A frozen and alcoholic interlude where the sharp bite of lemon intertwines with the subtle heat of vodka, creating a moment of sophisticated and refreshing coolness.'
        }
      ]
    }
  ];

  return (
    <div 
      id="desserts-menu-section"
      className="min-h-screen py-16 px-4" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92))', 
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-60" />
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-6 rounded-full opacity-40" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl font-light mb-6"
            style={{ color: '#81715E' }}
          >
            Desserts
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Sweets and sugary pleasures
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A 6% service charge will be added to your bill.
            <br/>The establishment only accepts certified checks.
          </motion.p>
        </header>

        <div className="space-y-4">
          {menuSections.map((section, index) => (
            <DessertMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
            />
          ))}
        </div>
        
        <footer className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-40" />
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-6 rounded-full opacity-60" />
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'rgba(129, 113, 94, 0.6)' }}>
              Enjoy your meal
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default DessertsMenu;
