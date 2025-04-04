'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const PizzaPastaMenuItem: React.FC<MenuItem> = ({ 
  name, 
  price, 
  description
}) => {
  return (
    <motion.div 
      className="border-b border-amber-100 pb-6 mb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-baseline mb-3">
        <h3 
          className="font-serif italic text-xl"
          style={{ color: '#81715E' }}
        >
          {name}
        </h3>
        <span 
          className="font-light text-base"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      <p className="text-neutral-600 text-sm font-light tracking-wide">{description}</p>
    </motion.div>
  );
};

const PizzaPastaMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          name: 'Pizza végétarienne',
          price: 140,
          description: 'Légumes de saison, sauce tomate et fromage'
        },
        {
          name: 'Pizza margherita',
          price: 120,
          description: 'Fromage avec sauce tomate'
        },
        {
          name: 'Pizza fromage de chèvre et roquettes',
          price: 140,
          description: 'Fromage de chèvre, feuilles de roquettes et petites tomates confites'
        },
        {
          name: 'Pizza sicilienne de thon',
          price: 150,
          description: 'Thon, oignons, anchois, câpres, tomates et olives noires'
        },
        {
          name: 'Pizza fruits de mer',
          price: 180,
          description: 'Fruits de mer, sauce tomate et fromage'
        },
        {
          name: 'Pizza bolognaise',
          price: 160,
          description: 'Viande hachée avec sauce bolognaise'
        },
        {
          name: 'Pizza carbonara',
          price: 140,
          description: 'Bacon de dinde "halal", sauce blanche et fromage'
        },
        {
          name: 'Calzone pepperoni',
          price: 160,
          description: 'Pepperoni italien halal, champignons, mozzarelle, olives noirs'
        }
      ]
    },
    {
      title: 'PÂTES',
      items: [
        {
          name: 'Linguine au saumon',
          price: 180,
          description: 'Duo de saumon avec une sauce rosé'
        },
        {
          name: 'Linguine aux gambas',
          price: 180,
          description: 'Avec une sauce tomate épicée'
        },
        {
          name: 'Penne arrabbiata',
          price: 120,
          description: 'Pâtes avec une sauce tomate pimentée et du basilic'
        },
        {
          name: 'Spaghetti à la marinera (fruits de mer)',
          price: 320,
          description: 'Palourdes, fruits de mer et crevettes sauvages'
        },
        {
          name: 'Spaghetti alle vongole',
          price: 190,
          description: 'Palourdes et tomates fraîches'
        },
        {
          name: 'Spaghetti carbonara',
          price: 140,
          description: 'Bacon de dinde halal avec sauce blanche'
        },
        {
          name: 'Tagliatelles au poulet et champignons',
          price: 160,
          description: 'Poulet, champignons, sauce blanche parfumée au truffe'
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
            Pizzas & Pâtes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Authenticité et saveurs
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            Une charge de service de 6% sera ajoutée à votre facture.
            <br/>L'établissement n'accepte que les chèques certifiés.
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
              Bon appétit
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default PizzaPastaMenu;