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

const CocktailMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
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
      <p className="text-neutral-600 text-sm font-light tracking-wide">{ingredients.toLowerCase()}</p>
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

const CocktailMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
      className="bg-white bg-opacity-60 backdrop-blur-sm p-8 rounded-lg shadow-sm"
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
          <CocktailMenuItem
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

const CocktailMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'TIKI COCKTAILS',
      items: [
        {
          name: 'De Tu Bikini',
          price: 220,
          ingredients: 'White Bacardi / Gold Bacardi / Mango / Cinnamon / Pastis / Grenadine / Orange',
          description: 'A tropical escape that combines the warmth of cinnamon with the sweet freshness of mango and grenadine, completed by a subtle touch of anise.'
        },
        {
          name: 'Mai Tai Chiringuito',
          price: 220,
          ingredients: 'Bacardi Gold / Mandarin Liqueur / Orgeat / Orange / Angostura Bitters',
          description: 'Our signature version of the classic Mai Tai, bringing the sunset on the beach in your glass with rich almond notes and vibrant citrus.'
        },
        {
          name: 'No Te Olvides Del Verano',
          price: 220,
          ingredients: 'Russian Standard Vodka / Blue Curaçao / Orgeat / Coconut Liqueur / Tonic',
          description: 'A memory of summer captured in azure blue, with delicate notes of coconut and almond that linger like the last day of vacation.'
        },
        {
          name: 'Tuki-Tuki',
          price: 220,
          ingredients: 'Sake / Passion Fruit / Peach Liqueur / Falernum / Lemon',
          description: 'An exotic journey combining Japanese tradition and Caribbean spices, creating a balanced harmony of sweet, sour, and umami.'
        }
      ]
    },
    {
      title: 'CHIRINGUITO COCKTAILS',
      items: [
        {
          name: 'Moscow Mule',
          price: 160,
          ingredients: 'Russian Standard Vodka / Ginger Beer',
          description: 'The timeless classic served with a touch of Mediterranean zest, in our signature copper mug that keeps it perfectly chilled.'
        },
        {
          name: 'Copresso',
          price: 160,
          ingredients: 'Bacardi Gold / Bacardi White / Coffee Liqueur / Espresso / Coconut Puree',
          description: 'A sophisticated fusion of Caribbean rum and intense coffee, softened by the subtle sweetness of coconut.'
        },
        {
          name: 'Soprano',
          price: 160,
          ingredients: 'Jack Daniel\'s Honey Whiskey / Amaretto / Angostura Bitters / Orange twist',
        },
        {
          name: 'Caipitanja',
          price: 160,
          ingredients: 'Russian Vodka / Watermelon Syrup / Lemon',
          description: 'Our refreshing take on the caipirinha, featuring sweet watermelon and bright citrus that dance perfectly together.'
        },
        {
          name: 'Bloody Tanja',
          price: 160,
          ingredients: 'Russian Vodka / Homemade Tomato Juice / Celery / Worcestershire Sauce / Tabasco',
          description: 'Our signature Bloody Mary with homemade tomato juice and a precise balance of heat and umami.'
        },
        {
          name: 'Alcides',
          price: 160,
          ingredients: 'Bombay Sapphire / Maraschino Liqueur / Violet / Beetroot / Tonic',
          description: 'A visually stunning creation with the earthy sweetness of beetroot and floral violet, finished with effervescent tonic.'
        },
        {
          name: 'Maroc Julep',
          price: 160,
          ingredients: 'Bourbon Whiskey / Shiba Tea / Mint / Powdered Sugar',
          description: 'North Africa meets Kentucky in this aromatic julep variation with delicate tea notes and fresh mint.'
        },
        {
          name: 'Paloma Ajena',
          price: 160,
          ingredients: 'Tequila / Yuzu / Lemon / Grapefruit Juice / Spicy Salt',
          description: 'An exotic Paloma with Japanese yuzu adding complexity to traditional grapefruit, with a spicy salt rim.'
        },
        {
          name: 'Coco Jamboo',
          price: 160,
          ingredients: 'Baileys / Banana Liqueur / Coconut Puree / Cinnamon / Nutmeg',
        },
        {
          name: 'El General Spritz',
          price: 160,
          ingredients: 'Campari / Apricot Brandy / Mango / Prosecco',
        },
        {
          name: 'Vilma Palma',
          price: 160,
          ingredients: 'Grey Goose Pear / Boulard Calvados / Elderflower / Prosecco',
          description: 'An elegant spritz inspired by orchards, combining the finest pear vodka with apple brandy and delicate elderflower.'
        },
        {
          name: 'Green Mary',
          price: 160,
          ingredients: 'Russian Vodka / Cucumber / Celery / Black Pepper / Worcestershire Sauce',
          description: 'A fresh, garden-green variation on the Bloody Mary, lighter but with all the savory complexity of the original.'
        },
        {
          name: 'Burbujas de Amor',
          price: 160,
          ingredients: 'Bombay Bramble / Roses / Mandarin Liqueur / Red Berries / Tonic',
          description: 'Romance in a glass - floral, fruity and effervescent with a subtle touch of color and lingering sweetness.'
        }
      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'Detox Chiringuito',
          price: 60,
          ingredients: 'Water / Lemon / Mint / Cucumber / Celery',
          description: 'A pure and invigorating blend that cleanses and refreshes, bringing the essence of wellness to your glass.'
        },
        {
          name: 'Amor Narcótico',
          price: 120,
          ingredients: 'Peach / Watermelon / Herbs',
          description: 'A refreshing and addictive blend of stone fruit and melon with aromatic herbs that elevate this alcohol-free indulgence.'
        },
        {
          name: 'Tangerina Sour',
          price: 120,
          ingredients: 'Mandarin / Yuzu / Honey / Egg White Optional',
          description: 'A sophisticated citrus experience with Japanese yuzu and local honey, optionally finished with a silky egg white foam.'
        },
        {
          name: 'Kiwi Mojito',
          price: 120,
          ingredients: 'Coconut Water / Kiwi / Lemon / Mint / Ginger',
          description: 'All the freshness of a mojito with tropical kiwi and coconut, and a comforting touch of ginger.'
        }
      ]
    },
    {
      title: 'SHOTS BY THE METER',
      items: [
        {
          name: 'Passion Vodka',
          price: 550,
          ingredients: 'Russian Vodka / Passion Fruit / Lemon',
          description: 'An intense shot of pure passion, combining the boldness of vodka with the vibrant energy of fresh passion fruit.'
        },
        {
          name: 'B52',
          price: 550,
          ingredients: 'Baileys / Coffee Liqueur / Triple Sec',
          description: 'A layered classic with creamy Baileys, rich coffee liqueur and citrusy Triple Sec - light it on fire for dramatic effect!'
        },
        {
          name: 'Rainbow',
          price: 550,
          ingredients: 'Vodka / Blue Curaçao / Orange / Coconut liqueur / Grenadine Syrup',
          description: 'A vibrant, colorful shot that takes you through a spectrum of sweet, tropical flavors.'
        },
        {
          name: 'Tequila',
          price: 550,
          ingredients: 'Camino Tequila',
          description: 'Straightforward, no frills - just the bold, earthy kick of premium Camino Tequila.'
        }
      ]
    },
    {
      title: 'SHOTS',
      items: [
        {
          name: 'Chaouen (x4)',
          price: 160,
          ingredients: 'Sambuca / Blue Curaçao / Russian Vodka / Vanilla Syrup',
        },
        {
          name: 'Te a la Meister (x4)',
          price: 160,
          ingredients: 'Jägermeister / Ginger Syrup / Chocolate Liqueur / Mint / White Rum',
          description: 'A complex blend of herbs and spices from Jägermeister, complemented by chocolate and mint for a surprisingly balanced shot.'
        },
        {
          name: 'Passion (x4)',
          price: 160,
          ingredients: 'Russian Vodka / Passion Fruit / Lemon',
          description: 'Pure tropical hedonism in shot form - vibrant passion fruit tempered by bright citrus and smooth vodka.'
        }
      ]
    }
  ];

  return (
    <div 
    id="menu-section"
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
            Drinks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Prepared with passion
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

        <div className="space-y-12">
          {menuSections.map((section, index) => (
            <CocktailMenuSection 
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
              Savor responsibly
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default CocktailMenu;