'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrinkItem {
  name: string;
  bottlePrice?: number;
  glassPrice?: number;
}

interface MenuSection {
  title: string;
  items: DrinkItem[];
}

const DrinkMenuItem: React.FC<DrinkItem> = ({ 
  name, 
  bottlePrice,
  glassPrice,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      ref={itemRef}
      className="border-b border-amber-100 py-1.5 cursor-pointer group" // Same as champagne menu: py-1.5
      whileHover={{ x: 4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-8 pr-2">
          <h3 
            className="font-serif italic text-sm md:text-base transition-all duration-300 group-hover:text-amber-800" // Same as champagne menu: reduced font size
            style={{ 
              color: '#81715E',
              display: 'block',
              whiteSpace: 'normal',
              overflow: 'visible',
              lineHeight: '1.2', // Same as champagne menu: reduced from 1.4
              minHeight: '1.2em'  // Same as champagne menu: reduced from 2.8em
            }}
          >
            {name}
          </h3>
        </div>
        
        <div className="col-span-2 text-right pr-1 sm:pr-2">
          <span className="text-[#81715E] font-light text-xs">{glassPrice || '—'}</span>
        </div>
        
        <div className="col-span-2 text-right">
          <span className="text-[#81715E] font-light text-xs">{bottlePrice || '—'}</span>
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
      className="bg-white bg-opacity-60 backdrop-blur-sm p-3 md:p-6 rounded-lg shadow-sm" // Same as champagne menu: reduced padding
    >
      <h2 
        className="text-lg md:text-xl font-serif tracking-wide mb-4 pb-2 border-b relative" // Same as champagne menu: reduced font size and margins
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
      
      <div className="grid grid-cols-12 mb-2 pb-1 border-b border-amber-200 relative"> {/* Same as champagne menu: reduced margins */}
        <div className="col-span-8"></div>
        <div className="col-span-2 text-right pr-1 sm:pr-2">
          <span className="text-xs font-medium text-amber-800">Glass</span>
        </div>
        <div className="col-span-2 text-right">
          <span className="text-xs font-medium text-amber-800">Bottle</span>
        </div>
      </div>
      
      <div>
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
      title: 'BEERS',
      items: [
        { name: 'San Miguel', bottlePrice: 45 },
        { name: 'San Miguel Alcohol Free', bottlePrice: 50 },
        { name: 'Mahou Original', bottlePrice: 60 },
        { name: 'Smirnoff Ice', bottlePrice: 60 },
        { name: 'Budweiser', bottlePrice: 60 },
        { name: 'Corona', bottlePrice: 80 }
      ]
    },
    {
      title: 'SANGRIA',
      items: [
        { name: 'Original Sangria (Red)', glassPrice: 140, bottlePrice: 440 },
        { name: 'Original Sangria (White)', glassPrice: 140, bottlePrice: 440 },
        { name: 'Original Sangria (Rosé)', glassPrice: 140, bottlePrice: 440 },
        { name: 'Cava Sangria (Red)', glassPrice: 180, bottlePrice: 540 },
        { name: 'Cava Sangria (White)', glassPrice: 180, bottlePrice: 540 },
        { name: 'Cava Sangria (Rosé)', glassPrice: 180, bottlePrice: 540 }
      ]
    },
    {
      title: 'APERITIFS',
      items: [
        { name: 'Pastis', glassPrice: 70 },
        { name: 'Porto Offley Red', glassPrice: 70 },
        { name: 'Porto Offley White', glassPrice: 70 },
        { name: 'Martini Red', glassPrice: 70 },
        { name: 'Martini White', glassPrice: 80 },
        { name: 'Martini Rosé', glassPrice: 80 },
        { name: 'Campari', glassPrice: 80 },
        { name: 'Pastis 12/12 St Tropez', glassPrice: 100 }
      ]
    },
    {
      title: 'COGNAC / CALVADOS',
      items: [
        { name: 'Calvados Boulard', glassPrice: 90 },
        { name: 'ABK6 VS', glassPrice: 90 },
        { name: 'ABK6 VSOP', glassPrice: 150 },
        { name: 'HENNESSY V.S.', glassPrice: 190 },
        { name: 'ABK6 XO', glassPrice: 300 },
        { name: 'HENNESSY V.S.O.P.', glassPrice: 290 },
        { name: 'HENNESSY X.O.', bottlePrice: 6500 }
      ]
    },
    {
      title: 'DIGESTIFS',
      items: [
        { name: 'Sambuca Isolabella', glassPrice: 70 },
        { name: 'Fernet Branca', glassPrice: 70 },
        { name: 'Armagnac', glassPrice: 70 },
        { name: 'Get 27', glassPrice: 70 },
        { name: 'Grappa Sandro Bottega', glassPrice: 70 },
        { name: 'Limoncello', glassPrice: 70 },
        { name: 'Cointreau', glassPrice: 90 },
        { name: 'Plum Brandy', glassPrice: 90 },
        { name: 'Poire Williams Brandy', glassPrice: 90 },
        { name: 'Baileys', glassPrice: 100 },
        { name: 'Amaretto Disaronno', glassPrice: 100 }
      ]
    },
    {
      title: 'RUM',
      items: [
        { name: 'Bacardi White', glassPrice: 100 },
        { name: 'Bacardi Gold', glassPrice: 100 },
        { name: 'Relicario Superior', glassPrice: 100 },
        { name: 'Bacardi 8 Years', glassPrice: 160 },
        { name: 'Relicario Supremo', glassPrice: 150 },
        { name: 'Ron Zacapa 23', glassPrice: 350 },
        { name: 'Ron Zacapa XO', bottlePrice: 6500 }
      ]
    },
    {
      title: 'VODKA',
      items: [
        { name: 'Tito\'s Handmade', glassPrice: 100, bottlePrice: 1500 },
        { name: 'Grey Goose', glassPrice: 150, bottlePrice: 2000 },
        { name: 'Crystal Head', glassPrice: 200, bottlePrice: 3000 },
        { name: 'Grey Goose Altius', bottlePrice: 4500 },
        { name: 'Belvedere 10', bottlePrice: 6000 }
      ]
    },
    {
      title: 'WHISKY',
      items: [
        { name: 'Irish Tullamore Dew', glassPrice: 100 },
        { name: 'Monkey Shoulder', glassPrice: 120, bottlePrice: 2000 },
        { name: 'Jack Daniel\'s', glassPrice: 120, bottlePrice: 2000 },
        { name: 'Jack Daniel\'s Honey', glassPrice: 120, bottlePrice: 2000 },
        { name: 'Gentleman Jack', glassPrice: 140, bottlePrice: 2500 },
        { name: 'Bourbon Bulleit', glassPrice: 150 },
        { name: 'Glenfiddich 12 Years', glassPrice: 150, bottlePrice: 2000 },
        { name: 'Black Label', glassPrice: 150, bottlePrice: 2000 },
        { name: 'Glenfiddich 15 Years', glassPrice: 180, bottlePrice: 2500 },
        { name: 'Glenfiddich 18 Years', glassPrice: 240, bottlePrice: 3000 },
        { name: 'Gold Label', glassPrice: 240, bottlePrice: 3000 },
        { name: 'Blue Label', bottlePrice: 9500 }
      ]
    },
    {
      title: 'GIN',
      items: [
        { name: 'Bombay Sapphire', glassPrice: 120, bottlePrice: 2000 },
        { name: 'Hendrick\'s', glassPrice: 150, bottlePrice: 2000 },
        { name: 'Tanqueray', glassPrice: 150, bottlePrice: 2000 },
        { name: 'Tanqueray Royale', glassPrice: 180, bottlePrice: 2500 },
        { name: 'Gin Mare', glassPrice: 200, bottlePrice: 3000 },
        { name: 'Monkey 47', glassPrice: 250, bottlePrice: 3000 },
        { name: 'Palmarae', glassPrice: 250, bottlePrice: 3000 }
      ]
    },
    {
      title: 'TEQUILA / MEZCAL',
      items: [
        { name: 'Camino Real', glassPrice: 100 },
        { name: 'Mezcal San Cosme', glassPrice: 200, bottlePrice: 2000 },
        { name: 'Patron Silver', glassPrice: 200, bottlePrice: 2000 },
        { name: 'Patron Reposado', glassPrice: 250, bottlePrice: 2500 },
        { name: 'Patron Anejo', glassPrice: 300, bottlePrice: 3000 },
        { name: 'Clase Azul Reposado', bottlePrice: 9000 },
        { name: 'Don Julio 1942', bottlePrice: 12000 }
      ]
    }
  ];

  return (
    <div 
      id="drinks-menu-section"
      className="min-h-screen py-6 md:py-12 px-2 sm:px-4" // Same as champagne menu: reduced vertical padding
      style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url(/api/placeholder/1000/1000)', 
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto max-w-4xl">
        <header className="mb-6 md:mb-12 text-center"> {/* Same as champagne menu: reduced margin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4" // Same as champagne menu
          >
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-60" />
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-4 rounded-full opacity-40" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4" // Same as champagne menu: reduced font size and margin
            style={{ color: '#81715E' }}
          >
            Beers & Alcohol
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Premium Selection
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-6 max-w-md mx-auto font-light italic" // Same as champagne menu: reduced from mt-8
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A service charge of 6% will be added to your bill.
            <br/>The establishment only accepts certified checks.
          </motion.p>
        </header>

        <div className="space-y-4 md:space-y-8"> {/* Same as champagne menu: reduced spacing between sections */}
          {menuSections.map((section, index) => (
            <DrinkMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
            />
          ))}
        </div>
        
        <footer className="mt-8 md:mt-12 text-center"> {/* Same as champagne menu: reduced margin */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-40" />
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-4 rounded-full opacity-60" />
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'rgba(129, 113, 94, 0.6)' }}>
              Drink responsibly
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default DrinksMenu;