'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  ingredients: string;
  description?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const PizzaPastaMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  ingredients, 
  description,
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
        <h3 
          className="font-serif italic text-xl transition-all duration-300 group-hover:text-amber-800"
          style={{ color: '#81715E' }}
        >
          {name}
        </h3>
        <span 
          className="font-light text-base transition-all duration-300 group-hover:text-amber-800"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      <p className="text-neutral-600 text-sm font-light tracking-wide">{ingredients}</p>
      <AnimatePresence>
        {isExpanded && description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-neutral-500 italic text-sm pl-4 border-l-2 border-amber-200">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {description && (
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

const PizzaPastaMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <PizzaPastaMenuItem
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

const PizzaPastaMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'PIZZAS',
      items: [
        {
          name: 'Vegetarian Pizza',
          price: 140,
          ingredients: 'Seasonal vegetables, tomato sauce and cheese',
          description: 'A colorful symphony of fresh vegetables on a homemade tomato sauce base. Each bite evokes a Mediterranean garden in midsummer with fresh and balanced flavors.'
        },
        {
          name: 'Pizza Margherita',
          price: 120,
          ingredients: 'Cheese with tomato sauce',
          description: 'Elegance in its purest form - our interpretation of the Neapolitan classic with a tomato sauce flavored with fresh basil and melting mozzarella on a thin, crispy crust.'
        },
        {
          name: 'Goat Cheese and Arugula Pizza',
          price: 140,
          ingredients: 'Goat cheese, arugula leaves and candied cherry tomatoes',
          description: 'A perfect contrast between the creaminess of goat cheese, the peppery freshness of arugula and the sweetness of candied tomatoes. A creation that celebrates the refined simplicity of Mediterranean cuisine.'
        },
        {
          name: 'Sicilian Tuna Pizza',
          price: 150,
          ingredients: 'Tuna, onions, anchovies, capers, tomatoes and black olives',
          description: 'A journey to sunny Sicily where savory tuna meets the salty accents of anchovies and capers, balanced by the sweetness of onions and the depth of black olives.'
        },
        {
          name: 'Seafood Pizza',
          price: 180,
          ingredients: 'Seafood, tomato sauce and cheese',
          description: 'The Mediterranean in every bite with a generous mix of ocean treasures on our flavorful tomato sauce. A light layer of cheese complements without overpowering the oceanic flavors.'
        },
        {
          name: 'Bolognese Pizza',
          price: 160,
          ingredients: 'Ground meat with bolognese sauce',
          description: 'Our tribute to Emilia-Romagna with a slowly simmered bolognese sauce according to the traditional recipe. Rich in meat and aromatic herbs for a comforting experience.'
        },
        {
          name: 'Carbonara Pizza',
          price: 140,
          ingredients: 'Halal turkey bacon, white sauce and cheese',
          description: 'A reinterpretation of the Roman classic on a crispy base. Our creamy white sauce coats golden pieces of halal turkey bacon, enhanced by our blend of Italian cheeses.'
        },
        {
          name: 'Pepperoni Calzone',
          price: 160,
          ingredients: 'Halal Italian pepperoni, mushrooms, mozzarella, black olives',
          description: 'Our golden pastry crescent holds a treasure of flavors where halal Italian pepperoni meets earthy mushrooms and melting mozzarella, enhanced by fragrant black olives.'
        }
      ]
    },
    {
      title: 'PASTA',
      items: [
        {
          name: 'Salmon Linguine',
          price: 180,
          ingredients: 'Duo of salmon with a rosé sauce',
          description: 'A duo of fresh and smoked salmon embraces al dente linguine in a velvety rosé sauce. Each bite transports between sea and mountain for a refined and comforting experience.'
        },
        {
          name: 'Prawn Linguine',
          price: 180,
          ingredients: 'With a spicy tomato sauce',
          description: 'Wild prawns perfectly seared on a bed of linguine coated in a zesty tomato sauce. The spicy notes dance with the sweetness of the shellfish for a memorable dish.'
        },
        {
          name: 'Penne Arrabbiata',
          price: 120,
          ingredients: 'Pasta with a spicy tomato sauce and basil',
          description: 'Italian passion in every bite - our penne perfectly capture the fiery tomato sauce, punctuated with chili and softened by fresh basil leaves for a harmonious balance.'
        },
        {
          name: 'Spaghetti Marinera (seafood)',
          price: 320,
          ingredients: 'Clams, seafood and wild shrimp',
          description: 'A celebration of the treasures of the sea where fresh clams, delicate seafood and wild shrimp meet in a light sauce flavored with garlic and parsley.'
        },
        {
          name: 'Spaghetti alle Vongole',
          price: 190,
          ingredients: 'Clams and fresh tomatoes',
          description: 'Marine elegance in its purest form - fresh clams release their savory juice that blends with tomatoes and olive oil for a symphony of maritime flavors.'
        },
        {
          name: 'Spaghetti Carbonara',
          price: 140,
          ingredients: 'Halal turkey bacon with white sauce',
          description: 'Our interpretation of the Roman classic - al dente spaghetti coated in a creamy egg sauce, sprinkled with crispy halal turkey bacon and a generous touch of black pepper.'
        },
        {
          name: 'Chicken and Mushroom Tagliatelle',
          price: 160,
          ingredients: 'Chicken, mushrooms, white sauce flavored with truffle',
          description: 'Ribbons of fresh pasta embrace juicy pieces of chicken and mushrooms, all wrapped in a sauce delicately infused with truffle. A perfect balance between rusticity and refinement.'
        }
      ]
    }
  ];

  return (
    <div 
      id="pizza-pasta-menu-section"
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
            Pizzas & Pasta
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Authenticity and flavors
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A service charge of 6% will be added to your bill.
            <br/>The establishment only accepts certified checks.
          </motion.p>
        </header>

        <div className="space-y-4">
          {menuSections.map((section, index) => (
            <PizzaPastaMenuSection 
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

export default PizzaPastaMenu;