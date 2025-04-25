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
      <p className="text-neutral-600 text-sm font-light tracking-wide">{description}</p>
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
          description: 'Sorbet ananas coco fait maison',
          detailedDescription: 'Une symphonie tropicale où l\'ananas succulent rencontre la douceur crémeuse de la noix de coco, transportant vos papilles sous les palmiers d\'une plage paradisiaque.'
        },
        {
          name: 'Pain Perdu',
          price: 80,
          description: 'Caramel au beurre salé et glace à la vanille',
          preparationTime: '10 min',
          detailedDescription: 'Un souvenir d\'enfance réinventé avec du pain brioché doré et croustillant, nappé d\'un caramel onctueux qui danse avec les notes délicates de la vanille de Madagascar.'
        },
        {
          name: 'Pavlova aux Fruits Rouges',
          price: 80,
          description: 'Meringue craquante et fruits rouges de saison',
          detailedDescription: 'Un nuage de légèreté croustillante couronné de baies éclatantes et d\'une touche de crème fouettée, comme un ballet de textures qui se révèle à chaque bouchée.'
        },
        {
          name: 'Fondant au Chocolat',
          price: 80,
          description: 'Servi avec une Glace à la Vanille',
          preparationTime: '10 min',
          detailedDescription: 'Un cœur mystérieux de chocolat noir intense qui se dévoile dans un flot de chaleur voluptueuse, contrasté par la fraîcheur d\'une glace vanille artisanale.'
        },
        {
          name: 'Tiramisú Spéculoos',
          price: 80,
          description: 'Réinterprétation du classique italien',
          detailedDescription: 'Une romance franco-italienne où la richesse du mascarpone rencontre les épices chaleureuses des spéculoos, créant une harmonie parfaite entre douceur et caractère.'
        },
        {
          name: 'Crème Brûlée',
          price: 70,
          description: 'Crème onctueuse avec une croûte au caramel croquante',
          detailedDescription: 'Un classique intemporel aux deux visages : le craquant exquis du caramel brûlé qui protège un trésor de vanille soyeux et délicat. Une valse de contradictions parfaites.'
        },
        {
          name: 'Glaces / Sorbets',
          price: 80,
          description: 'Vanille ou citron',
          detailedDescription: 'Des créations glacées aux saveurs pures et intenses, élaborées chaque jour dans notre cuisine avec des ingrédients soigneusement sélectionnés pour une expérience rafraîchissante.'
        },
        {
          name: 'Fruits de Saison',
          price: 70,
          description: 'Sélection de fruits frais',
          detailedDescription: 'Une cueillette colorée des meilleurs fruits du marché, présentée dans sa simplicité naturelle pour célébrer les saveurs authentiques que la nature nous offre à chaque saison.'
        },
        {
          name: 'Irish Coffee',
          price: 80,
          description: 'Whiskey, café et crème fouettée',
          detailedDescription: 'Une douce ivresse où l\'amertume élégante du café embrasse la chaleur du whiskey irlandais, le tout délicatement adouci par un nuage de crème légèrement sucrée.'
        },
        {
          name: 'Café Gourmand',
          price: 80,
          description: 'Fondant au chocolat, crème brûlée et glace à la vanille',
          detailedDescription: 'Une trilogie de plaisirs en miniature accompagnant notre café signature, offrant un voyage gustatif complet pour satisfaire toutes vos envies sucrées en une seule assiette.'
        },
        {
          name: 'Colonel',
          price: 120,
          description: 'Vodka, sorbet au citron',
          detailedDescription: 'Un entracte glacé et alcoolisé où la morsure vive du citron s\'entrelace avec la chaleur discrète de la vodka, créant un moment de fraîcheur sophistiquée et revigorante.'
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
            Douceurs et plaisirs sucrés
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
              Bonne dégustation
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default DessertsMenu;