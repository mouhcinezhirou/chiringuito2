'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number | string; // Updated to accept both number and string
  description: string;
  options?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const StarterMenuItem: React.FC<MenuItem> = ({ 
  name, 
  price, 
  description,
  options
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
        <div>
          <h3 
            className="font-serif italic text-xl"
            style={{ color: '#81715E' }}
          >
            {name}
          </h3>
          {options && (
            <span className="text-xs text-neutral-500 font-light">{options}</span>
          )}
        </div>
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

const StarterMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <StarterMenuItem
            key={index}
            {...item}
          />
        ))}
      </div>
    </motion.div>
  );
};

const StartersMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'À PARTAGER',
      items: [
        {
          name: 'Huîtres de Dakhla',
          price: '140 / 260',
          description: '',
          options: '6 unités / 12 unités'
        },
        {
          name: 'Poivrons "Padron" Frit avec Gros Sel',
          price: 80,
          description: ''
        },
        {
          name: 'Anchois marinés',
          price: 80,
          description: 'Filets d\'anchois frais marinés dans de l\'huile d\'olive et de l\'ail'
        },
        {
          name: 'Crevettes pop-corn',
          price: 90,
          description: ''
        },
        {
          name: 'Tacos de tartare de thon',
          price: 120,
          description: 'Tacos croustillant, thon rouge, mangue, avocat'
        },
        {
          name: 'Tacos de crevettes',
          price: 120,
          description: 'Tacos croustillant farcis d\'un mélange de crevettes grillées, avocat, tomates, oignons avec une vinaigrette légèrement épicée'
        },
        {
          name: 'Hummus',
          price: 120,
          description: 'Crème de pois chiches à la libanaise'
        },
        {
          name: 'Pommes de terre alioli',
          price: 70,
          description: 'Pommes de terre frites avec mayonnaise à l\'ail'
        },
        {
          name: 'Batata harra',
          price: 60,
          description: 'Pommes de terre frites avec du piment, de la coriandre, du citron et de l\'ail'
        },
        {
          name: 'Assiette de fromages',
          price: 180,
          description: 'Sélection de fromages variés'
        },
        {
          name: 'Salade Russe',
          price: 70,
          description: 'Pommes de terre, carottes, oeufs, petits pois, thon, mayonnaise'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Fèves de soja cuites à la vapeur avec du sel marin et mariné à l\'ail'
        },
        {
          name: 'Tortilla espagnole',
          price: 70,
          description: 'Omelette aux pommes de terre'
        },
        {
          name: 'Croquettes de fruits de mer',
          price: 80,
          description: ''
        },
        {
          name: 'Croquettes de poulet et champignon',
          price: 80,
          description: ''
        },
        {
          name: 'Crunchi-champignons avec sauce tartare',
          price: 100,
          description: 'Champignons panés marinés et piquants avec sauce tartare'
        },
        {
          name: 'Champignons à l\'ail',
          price: 100,
          description: 'Champignons, huile d\'olive ail et persil'
        },
        {
          name: 'Palourdes à l\'ail',
          price: 140,
          description: 'Palourdes, huile d\'olive et persil'
        },
        {
          name: 'Crevettes à l\'ail',
          price: 140,
          description: 'Dans une huile d\'olive épicée'
        },
        {
          name: 'Calamars frits "Style andalouse"',
          price: 160,
          description: 'Calamars frits avec farine andalouse'
        },
        {
          name: 'Petits calamars grillés',
          price: 220,
          description: 'Avec de la salade, de l\'huile d\'olive et de l\'ail'
        },
        {
          name: 'Vitello tonnato',
          price: 160,
          description: 'Fines tranches de veau dans une mayonnaise onctueuse au thon, servies avec des câpres'
        },
        {
          name: 'Poulpe à la galicienne',
          price: 160,
          description: 'Poulpe cuit sur une purée de pommes de terre'
        }
      ]
    },
    {
      title: 'SALADES',
      items: [
        {
          name: 'Salade César – Classique –',
          price: 140,
          description: 'Laitue romaine, poulet grillé, anchois, tomates, oeuf, croûtons de pain, copeaux de parmesan et sauce césar'
        },
        {
          name: 'Salade Arc-en-ciel',
          price: 120,
          description: 'Laitue, légumes, thon, oeufs, anchois'
        },
        {
          name: 'Salade Grecque',
          price: 140,
          description: 'Tomates, poivrons, oignons, concombre, feta'
        },
        {
          name: 'Salade de crabe bleu TANGEROIS',
          price: 130,
          description: 'Chiffonnade fine de salade romaine, 100gr chair de crabe et mayonnaise'
        },
        {
          name: 'Salade Chiringuito (fruits de mer)',
          price: 140,
          description: 'Salade, avocat, mélange de fruits de mer et une sauce cocktail'
        },
        {
          name: 'Salade de Poulpe',
          price: 160,
          description: 'Poulpe, pommes de terres, poivrons grillés, persil, huile, sel'
        },
        {
          name: 'Salade burrata et tomates',
          price: 160,
          description: 'Servie avec des tomates et notre pesto fait maison'
        },
        {
          name: 'Salade de chèvre chaud',
          price: 140,
          description: 'Roquette, fromage de chèvre, crème balsamique, framboises confits'
        },
        {
          name: 'Carpaccio de tomates avec thon',
          price: 140,
          description: ''
        },
        {
          name: 'Emincé de thon rouge sautée sur un lit de poivrons grillés',
          price: 140,
          description: ''
        },
        {
          name: 'Carpaccio de boeuf',
          price: 140,
          description: ''
        }
      ]
    }
  ];

  return (
    <div 
      id="starters-menu-section"
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
            Entrées & Salades
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fraîcheur et saveurs
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
            <StarterMenuSection 
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

export default StartersMenu;