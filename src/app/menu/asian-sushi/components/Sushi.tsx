'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  pieces?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  note?: string;
}

const SushiMenuItem: React.FC<MenuItem> = ({ 
  name, 
  price, 
  description,
  pieces,
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
          {pieces && (
            <span className="text-xs text-neutral-500 font-light">({pieces} pièces)</span>
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

const SushiMenuSection: React.FC<MenuSection> = ({ title, items, note }) => {
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
          <SushiMenuItem
            key={index}
            {...item}
          />
        ))}
      </div>
      {note && (
        <p className="text-xs text-neutral-500 mt-4 italic">{note}</p>
      )}
    </motion.div>
  );
};

const SushiMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'POUR COMMENCER',
      items: [
        {
          name: 'Nems au Poulet',
          price: 160,
          description: 'Poulet, champignons chinois, vermicelles, feuille de riz frite'
        },
        {
          name: 'Spicy Ebi Fry',
          price: 150,
          description: 'Crevettes frites, mayonaise picante'
        }
      ]
    },
    {
      title: 'ROLLS',
      note: '(8 pièces par roll sauf indication contraire)',
      items: [
        {
          name: 'Spicy Tuna Roll',
          price: 160,
          description: 'Tartare de thon rouge piquant, thon rouge frais, mayonnaise au wasabi',
          pieces: 8
        },
        {
          name: 'Spicy Salmon Roll',
          price: 160,
          description: 'Tartare de saumon piquant, saumon frais, mayonnaise au sriracha',
          pieces: 8
        },
        {
          name: 'Tropical Crab Roll',
          price: 160,
          description: 'Tartare de crabe, avocat, mangue de saison',
          pieces: 8
        },
        {
          name: 'Salmon Avocado California Roll',
          price: 180,
          description: 'Saumon frais, saumon fumé, avocat, fromage frais',
          pieces: 8
        },
        {
          name: 'Shrimp Green Roll',
          price: 180,
          description: 'Crevettes frites, tartare de concombre et avocat, sésame grillé, mayonnaise piquante',
          pieces: 8
        },
        {
          name: 'Crispy Chicken Roll',
          price: 180,
          description: 'Poulet tempura, fromage frais, oignons caramélisés, mayonnaise piquante, oignons frits',
          pieces: 8
        },
        {
          name: 'Chiringuito Roll',
          price: 190,
          description: 'Thon rouge, crevette tempura, saumon frais, crabe d\'Asilah, fromage frais, ciboulette',
          pieces: 8
        }
      ]
    },
    {
      title: 'CRUNCHY ASIAN',
      items: [
        {
          name: 'Crunchy Roll',
          price: 140,
          description: 'Crevette, avocat, fromage frais, tobiko, teriyaki, mayonnaise piquante',
          pieces: 8
        },
        {
          name: 'Dragon Roll',
          price: 160,
          description: 'Saumon, fromage frais, sauce piquante, tobiko, teriyaki, ciboulette',
          pieces: 8
        },
        {
          name: 'Pizza Sushi Saumon',
          price: 160,
          description: 'Saumon, avocat, fromage frais, tobiko, mayonnaise piquante, teriyaki'
        }
      ]
    },
    {
      title: 'NIGIRI',
      note: '(8 pièces par commande sauf indication contraire)',
      items: [
        {
          name: 'Nigiri Thon Rouge',
          price: 180,
          description: 'Tranches de thon rouge sur riz à sushi pressé',
          pieces: 8
        },
        {
          name: 'Nigiri Saumon',
          price: 180,
          description: 'Tranches de saumon frais sur riz à sushi pressé',
          pieces: 8
        },
        {
          name: 'Nigiri Loup',
          price: 180,
          description: 'Tranches de loup délicates sur riz à sushi pressé',
          pieces: 8
        },
        {
          name: 'Nigiri Crevette',
          price: 140,
          description: 'Crevettes cuites sur riz à sushi pressé',
          pieces: 8
        },
        {
          name: 'Sélection de Nigiris',
          price: 180,
          description: 'Thon rouge, saumon, crevette & loup',
          pieces: 8
        }
      ]
    },
    {
      title: 'SASHIMI & TATAKI',
      items: [
        {
          name: 'Sashimi Thon Rouge',
          price: 220,
          description: 'Tranches fraîches de thon rouge premium'
        },
        {
          name: 'Sashimi Saumon',
          price: 220,
          description: 'Tranches fraîches de saumon de haute qualité'
        },
        {
          name: 'Sashimi Loup',
          price: 220,
          description: 'Tranches fraîches de loup délicat'
        },
        {
          name: 'Rainbow Sashimi',
          price: 220,
          description: 'Assortiment de thon rouge, saumon et loup'
        },
        {
          name: 'Tataki Thon Rouge',
          price: 240,
          description: 'Thon rouge saisi avec assaisonnement léger'
        },
        {
          name: 'Tataki Saumon',
          price: 240,
          description: 'Saumon saisi avec assaisonnement léger'
        }
      ]
    }
  ];

  return (
    <div 
      id="sushi-menu-section"
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
            Menu Sushi Asiatique
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Frais & Délicieux
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
            <SushiMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
              note={section.note}
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

export default SushiMenu;