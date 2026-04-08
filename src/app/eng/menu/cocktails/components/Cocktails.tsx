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
  ingredients: 'mango / grand marnier / Chili-infused tequila / cilantro',
  description: 'A tropical escape that combines the exotic sweetness of mango with the sophistication of Grand Marnier and the spicy heat of chili-infused tequila, enhanced by the herbaceous freshness of cilantro.'
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
      name: 'Mediterranean Collins',
      price: 160,
      ingredients: 'Gin / Fliou (Moroccan mint) / Lavender / Fever Tree Mediterranean tonic water',
      description: 'A refreshing sigh for the soul'
    },
    {
      name: 'Tora Sensai',
      price: 160,
      ingredients: 'Sake and cachaça blend / Homemade wasabi syrup / Lemon / Caramelized ginger',
      description: 'Delicate, with a fierce soul'
    },
    {
      name: 'Chebakia',
      price: 160,
      ingredients: 'Homemade chebakia liqueur / Almond liqueur / Honey',
      description: 'Sweet home, my refuge'
    },
    {
      name: 'Zahara',
      price: 160,
      ingredients: 'Aperol / Cointreau / Carrot / Cardamom / Orange blossom water / Spoonful of Rhumtella',
      description: 'Sip of golden sunset'
    },
    {
      name: 'Ambarina',
      price: 160,
      ingredients: 'Rosé wine and rosemary reduction / Orange / Peach / Vermouth / Prosecco',
      description: 'Sweet, spicy, herbaceous, warm glow'
    },
    {
      name: 'Berber Fire',
      price: 160,
      ingredients: 'Bourbon infused with spices and red apples / Amaro / Splash of sparkling water / Citrus aroma / Olives',
      description: 'Between tradition and desire'
    },
    {
      name: 'Carmesí',
      price: 160,
      ingredients: 'Maraschino liqueur / Sparkling red berry shrub / Cava',
      description: 'Vibrant freshness'
    },
    {
      name: 'Paloma Ajena',
      price: 180,
      ingredients: 'Mezcal / Yuzu / Lemon / Grapefruit Juice / Spicy Salt',
      description: 'An exotic Paloma with Japanese yuzu adding complexity to traditional grapefruit, with a spicy salt rim.'
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
          name: 'Mango Mojito',
          price: 120,
          ingredients: 'Mangue / citron / mint / sparkling water',
          description: 'A tropical and exotic twist on a classic'
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