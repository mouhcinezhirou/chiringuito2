'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DrinkItem {
  name: string;
  price: number;
  bottlePrice?: number;
  variants?: string;
}

interface MenuSection {
  title: string;
  items: DrinkItem[];
}

const DrinkMenuItem: React.FC<DrinkItem> = ({ 
  name, 
  price,
  bottlePrice,
  variants
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
          {variants && (
            <span className="text-xs text-neutral-500 font-light">{variants}</span>
          )}
        </div>
        <div className="text-right">
          <span 
            className="font-light text-base block"
            style={{ color: '#81715E' }}
          >
            {price}
          </span>
          {bottlePrice && (
            <span 
              className="font-light text-xs block"
              style={{ color: 'rgba(129, 113, 94, 0.7)' }}
            >
              {bottlePrice} (bouteille)
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DrinkMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <DrinkMenuItem
            key={index}
            {...item}
          />
        ))}
      </div>
    </motion.div>
  );
};

const DrinksMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'BIÈRES',
      items: [
        { name: 'Mahou Original 33cl', price: 60 },
        { name: 'San Miguel 33cl', price: 45 },
        { name: 'San Miguel San Alcool', price: 50 },
        { name: 'Smirnoff Ice', price: 60 },
        { name: 'Budweiser', price: 60 },
        { name: 'Corona', price: 80 }
      ]
    },
    {
      title: 'SANGRIA',
      items: [
        { 
          name: 'Sangria Original (Vino)', 
          price: 440,
          variants: 'Rouge/Blanche/Rosé (Carafe)' 
        },
        { 
          name: 'Sangria Cava', 
          price: 540,
          variants: 'Rouge/Blanche/Rosé (Carafe)' 
        },
        { 
          name: 'Sangria Original (Vino)', 
          price: 140,
          variants: 'Rouge/Blanche/Rosé (Verre)' 
        },
        { 
          name: 'Sangria Cava', 
          price: 180,
          variants: 'Rouge/Blanche/Rosé (Verre)' 
        }
      ]
    },
    {
      title: 'APÉRITIF',
      items: [
        { name: 'Pastis', price: 70 },
        { name: 'Pastis 12/12 St Tropez', price: 100 },
        { name: 'Porto Offley Rouge', price: 70 },
        { name: 'Porto Offley Blanc', price: 70 },
        { name: 'Martini Rouge', price: 70 },
        { name: 'Martini Blanc', price: 80 },
        { name: 'Martini Rosé', price: 80 },
        { name: 'Campari', price: 80 }
      ]
    },
    {
      title: 'COGNAC / CALVADOS',
      items: [
        { name: 'Calvados Boulard', price: 90 },
        { name: 'ABK6 VS', price: 90 },
        { name: 'ABK6 VSOP', price: 150 },
        { name: 'ABK6 XO', price: 300 },
        { name: 'HENNESSY V.S.', price: 190 },
        { name: 'HENNESSY V.S.O.P.', price: 290 },
        { name: 'HENNESSY X.O. BOUTEILLE', price: 6500 }
      ]
    },
    {
      title: 'DIGESTIFS',
      items: [
        { name: 'Sambuca Isolabella', price: 70 },
        { name: 'Fernet Branca', price: 70 },
        { name: 'Armagnac', price: 70 },
        { name: 'Get 27', price: 70 },
        { name: 'Grappa Sandro Bottega', price: 70 },
        { name: 'Limoncello', price: 70 },
        { name: 'Baileys', price: 100 },
        { name: 'Amaretto Disaronno', price: 100 },
        { name: 'Cointreau', price: 90 },
        { name: 'Eau de vie Prune', price: 90 },
        { name: 'Eau de vie Poire Williams', price: 90 }
      ]
    },
    {
      title: 'RHUM',
      items: [
        { name: 'Bacardi blanc', price: 100 },
        { name: 'Bacardi Gold', price: 100 },
        { name: 'Bacardi 8 ans', price: 160 },
        { name: 'Relicario Superior', price: 100 },
        { name: 'Relicario Supremo', price: 150 },
        { name: 'Ron Zacapa 23', price: 350 },
        { name: 'Ron Zacapa XO (Bouteille)', price: 6500 }
      ]
    },
    {
      title: 'VODKA',
      items: [
        { name: 'Tito\'s Handmade', price: 100, bottlePrice: 1500 },
        { name: 'Grey Goose', price: 150, bottlePrice: 2000 },
        { name: 'Crystal head', price: 200, bottlePrice: 3000 },
        { name: 'Grey Goose Altius (Bouteille)', price: 4500 },
        { name: 'Belvedere 10', price: 6000 }
      ]
    },
    {
      title: 'WHISKY',
      items: [
        { name: 'Monkey Shoulder', price: 120, bottlePrice: 2000 },
        { name: 'Jack Daniel\'s', price: 120, bottlePrice: 2000 },
        { name: 'Jack Daniel\'s Honey', price: 120, bottlePrice: 2000 },
        { name: 'Gentleman Jack', price: 140, bottlePrice: 2500 },
        { name: 'Bourbon Bulleit', price: 150 },
        { name: 'Irish Tullamore Dew', price: 100 },
        { name: 'Glenfiddich 12 years', price: 150, bottlePrice: 2000 },
        { name: 'Glenfiddich 15 years', price: 180, bottlePrice: 2500 },
        { name: 'Glenfiddich 18 years', price: 240, bottlePrice: 3000 },
        { name: 'Black Label', price: 150, bottlePrice: 2000 },
        { name: 'Gold Label', price: 240, bottlePrice: 3000 },
        { name: 'Blue Label', price: 9500 }
      ]
    },
    {
      title: 'GIN',
      items: [
        { name: 'Bombay Sapphire', price: 120, bottlePrice: 2000 },
        { name: 'Hendrick\'s', price: 150, bottlePrice: 2000 },
        { name: 'Monkey 47', price: 250, bottlePrice: 3000 },
        { name: 'Gin Mare', price: 200, bottlePrice: 3000 },
        { name: 'Tanqueray', price: 150, bottlePrice: 2000 },
        { name: 'Tanqueray Royale', price: 180, bottlePrice: 2500 },
        { name: 'Palmarae', price: 250, bottlePrice: 3000 }
      ]
    },
    {
      title: 'TEQUILA / MEZCAL',
      items: [
        { name: 'Camino Real', price: 100 },
        { name: 'Mezcal San Cosme', price: 200, bottlePrice: 2000 },
        { name: 'Patron Silver', price: 200, bottlePrice: 2000 },
        { name: 'Patron Reposado', price: 250, bottlePrice: 2500 },
        { name: 'Patron Anejo', price: 300, bottlePrice: 3000 },
        { name: 'Clase Azul Reposado', price: 9000 },
        { name: 'Don Julio 1942', price: 12000 }
      ]
    }
  ];

  return (
    <div 
      id="drinks-menu-section"
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
            Boissons & Alcools
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Sélection premium
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
            <DrinkMenuSection 
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
              À consommer avec modération
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default DrinksMenu;