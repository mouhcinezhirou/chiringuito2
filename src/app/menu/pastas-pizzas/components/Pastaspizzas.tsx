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
          className="font-serif text-xl transition-all duration-300 group-hover:text-amber-800"
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
      "title": "PIZZAS",
      "items": [
        {
          "name": "Primavera",
          "price": 140,
          "ingredients": "Légumes de saison, Sauce tomate et fromage",
          "description": "Une symphonie colorée de légumes frais sur une base de sauce tomate maison. Chaque bouchée évoque un jardin méditerranéen en plein été avec des saveurs fraîches et équilibrées."
        },
        {
          "name": "La Margherita",
          "price": 120,
          "ingredients": "Fromage avec sauce tomate",
          "description": "L'élégance dans sa forme la plus pure - notre interprétation du classique napolitain avec une sauce tomate aromatisée au basilic frais et une mozzarella fondante sur une pâte fine et croustillante."
        },
        {
          "name": "La Rustica",
          "price": 140,
          "ingredients": "Fromage de chèvre, Feuilles de roquettes et petites tomates confites",
          "description": "Un contraste parfait entre le crémeux du chèvre, la fraîcheur poivrée de la roquette et la douceur des tomates confites. Une création qui célèbre la simplicité raffinée de la cuisine méditerranéenne."
        },
        {
          "name": "La Sicilienne",
          "price": 150,
          "ingredients": "Thon, Oignons, Anchois, Câpres, Tomates et olives noires",
          "description": "Un voyage vers la Sicile ensoleillée où le thon savoureux rencontre les accents salés des anchois et des câpres, équilibré par la douceur des oignons et la profondeur des olives noires."
        },
        {
          "name": "La Méditerranéenne",
          "price": 180,
          "ingredients": "Fruits de mer, Sauce tomate et fromage",
          "description": "La Méditerranée dans chaque bouchée avec un mélange généreux de trésors marins sur notre sauce tomate parfumée. Une légère couche de fromage complète sans dominer les saveurs océaniques."
        },
        {
          "name": "La Bolognese",
          "price": 160,
          "ingredients": "Viande hachée avec sauce bolognaise",
          "description": "Notre hommage à l'Émilie-Romagne avec une sauce bolognaise mijotée lentement selon la recette traditionnelle. Riche en viande et en herbes aromatiques pour une expérience réconfortante."
        },
        {
          "name": "La Carbonara",
          "price": 140,
          "ingredients": "Bacon de dinde \"halal\", Sauce blanche et fromage",
          "description": "Une réinterprétation du classique romain sur une base croustillante. Notre sauce blanche onctueuse enrobe des morceaux dorés de bacon de dinde halal, sublimée par notre mélange de fromages italiens."
        },
        {
          "name": "Calzone Piccante",
          "price": 160,
          "ingredients": "Pepperoni italien halal, champignons, mozzarelle, olives noirs",
          "description": "Notre croissant de pâte doré renferme un trésor de saveurs où le pepperoni italien halal rencontre les champignons terreux et la mozzarella fondante, relevés par des olives noires parfumées."
        }
      ]
    },
    {
      title: 'PÂTES',
      items: [
        {
          name: 'Linguine Au Saumon',
          price: 180,
          ingredients: 'Duo de saumon avec une sauce rosé',
          description: 'Un duo de saumon frais et fumé enlace des linguine al dente dans une sauce rosée veloutée. Chaque bouchée transporte entre mer et montagne pour une expérience raffinée et réconfortante.'
        },
        {
          name: 'Linguine Aux gambas',
          price: 180,
          ingredients: 'Avec une sauce tomate épicée',
          description: 'Des gambas sauvages saisies à la perfection sur un nid de linguine enrobées d\'une sauce tomate relevée. Les notes épicées dansent avec la douceur des crustacés pour un plat mémorable.'
        },
        {
          name: 'Penne arrabbiata',
          price: 120,
          ingredients: 'Pâtes avec une sauce tomate pimentée et du basilic',
          description: 'La passion italienne dans chaque bouchée - nos penne capturent parfaitement la sauce tomate ardente, ponctuée de piment et adoucie par des feuilles de basilic frais pour un équilibre harmonieux.'
        },
        {
          name: 'Spaghetti à la Marinera',
          price: 320,
          ingredients: 'Palourdes, Fruits de mer et crevettes sauvages',
          description: 'Une célébration des trésors de la mer où palourdes fraîches, fruits de mer délicats et crevettes sauvages se rencontrent dans une sauce légère parfumée à l\'ail et au persil.'
        },
        {
          name: 'Spaghetti Alle Vongole',
          price: 190,
          ingredients: 'Palourdes et tomates fraîches',
          description: 'L\'élégance marine à l\'état pur - des palourdes fraîches libèrent leur jus savoureux qui se mêle aux tomates et à l\'huile d\'olive pour une symphonie de saveurs maritimes.'
        },
        {
          name: 'Spaghetti Carbonara',
          price: 140,
          ingredients: 'Bacon de dinde halal avec sauce blanche',
          description: 'Notre interprétation du classique romain - des spaghetti al dente enrobés d\'une sauce crémeuse aux œufs, parsemés de bacon de dinde halal croustillant et d\'une généreuse touche de poivre noir.'
        },
        {
          name: 'Taglatelles Poulet Champignon',
          price: 160,
          ingredients: 'Poulet, champignons, sauce blanche parfumée au truffe',
          description: 'Des rubans de pâtes fraîches enlacent des morceaux de poulet juteux et des champignons, le tout enveloppé d\'une sauce délicatement infusée à la truffe. Un équilibre parfait entre rusticité et raffinement.'
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