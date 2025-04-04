'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  note?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  subtitle?: string;
}

const FoodMenuItem: React.FC<MenuItem> = ({ 
  name, 
  price, 
  description,
  note
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
          {note && (
            <span className="text-xs text-neutral-500 font-light">{note}</span>
          )}
        </div>
        <span 
          className="font-light text-base"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      {description && (
        <p className="text-neutral-600 text-sm font-light tracking-wide">{description}</p>
      )}
    </motion.div>
  );
};

const FoodMenuSection: React.FC<MenuSection> = ({ title, items, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white bg-opacity-60 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-12"
    >
      <h2 
        className="text-2xl font-serif tracking-wide mb-4 pb-3 border-b relative" 
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
      {subtitle && (
        <p className="text-sm text-neutral-500 mb-6 italic">{subtitle}</p>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <FoodMenuItem
            key={index}
            {...item}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FishMeatMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'POISSONS',
      subtitle: 'Servis avec accompagnement au choix',
      items: [
        {
          name: 'Tagra (tagine) de poisson "spécialité maison"',
          price: 340,
          description: ''
        },
        {
          name: 'Tagra (tagine) de crevettes royale',
          price: 800,
          description: ''
        },
        {
          name: 'Saumon grillé',
          price: 340,
          description: ''
        },
        {
          name: 'Espadon grillé',
          price: 260,
          description: ''
        },
        {
          name: 'Sole "meunière"',
          price: 280,
          description: '(beurre et ail)'
        },
        {
          name: 'Loup grillé',
          price: 280,
          description: ''
        },
        {
          name: 'Saint-Pierre grillé',
          price: 290,
          description: ''
        },
        {
          name: 'Langoustines grillées',
          price: 600,
          description: ''
        },
        {
          name: 'Crevettes Royales grillées',
          price: 800,
          description: ''
        }
      ]
    },
    {
      title: 'VIANDES',
      subtitle: 'Servies avec accompagnement au choix',
      items: [
        {
          name: 'Tagliata de boeuf (filet de boeuf)',
          price: 380,
          description: ''
        },
        {
          name: 'Filet de boeuf sauté à l\'ail',
          price: 340,
          description: 'Filet de boeuf coupé et sauté à l\'ail'
        },
        {
          name: 'Chich taouk',
          price: 220,
          description: 'Brochettes de poulet à la libanaise, servie avec une sauce aïoli'
        },
        {
          name: 'Entrecôte de Paris',
          price: 320,
          description: 'Avec une sauce maison'
        },
        {
          name: 'Hamburger (100% fait maison)',
          price: 140,
          description: 'Pur boeuf, fromage cheddar, oignons caramélisés et une sauce maison dans un pain brioché moelleux'
        },
        {
          name: 'Mini hamburger au boeuf',
          price: 140,
          description: 'Fromage cheddar et une sauce maison',
          note: '3 pièces'
        }
      ]
    },
    {
      title: 'ACCOMPAGNEMENTS',
      items: [
        {
          name: 'Légumes sautés',
          price: 60,
          description: ''
        },
        {
          name: 'Purée de pommes de terre',
          price: 60,
          description: ''
        },
        {
          name: 'Pommes de terre sautées',
          price: 60,
          description: ''
        },
        {
          name: 'Pommes frites',
          price: 60,
          description: ''
        },
        {
          name: 'Salade verte',
          price: 60,
          description: ''
        }
      ]
    }
  ];

  return (
    <div 
      id="fish-meat-menu-section"
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
            Poissons & Viandes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fraîcheur et qualité
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
            <FoodMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
              subtitle={section.subtitle}
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

export default FishMeatMenu;