'use client';

import React, { useState } from 'react';
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
}) => (
  <div 
    className="border-b pb-4 mb-4 cursor-pointer group"
    onClick={onExpand}
  >
    <div className="flex justify-between items-center mb-2">
      <h3 
        className="font-medium text-lg transition-all duration-300 group-hover:text-opacity-70"
        style={{ color: '#81715E' }}
      >
        {name}
      </h3>
      <span 
        className="font-semibold transition-all duration-300 group-hover:text-opacity-70"
        style={{ color: '#81715E' }}
      >
        {price}
      </span>
    </div>
    <p className="text-neutral-600 text-sm">{ingredients}</p>
    <AnimatePresence>
      {isExpanded && description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-2"
        >
          <p className="text-neutral-500 italic text-sm">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const CocktailMenuSection: React.FC<MenuSection> = ({ title, items }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div>
      <h2 
        className="text-2xl font-semibold mb-6 pb-2 border-b" 
        style={{ color: '#81715E', borderColor: 'rgba(129, 113, 94, 0.3)' }}
      >
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <CocktailMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
          />
        ))}
      </div>
    </div>
  );
};

const CocktailMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'COCKTAILS TIKI',
      items: [
        {
          name: 'DE TU BIKINI',
          price: 220,
          ingredients: 'Bacardi blanc & gold / mango / cinnamon / pastis / pomegranate / orange',
        },
        {
          name: 'MAI TAI CHIRINGUITO',
          price: 220,
          ingredients: 'Bacardi Gold / Tangerine liquor / Orgeat / Orange / Bitter angostura',
        },
        {
          name: 'NO TE OLVIDES DEL VERANO',
          price: 220,
          ingredients: 'Russian Standard Vodka / Blue curaçao / Orgeat / Coconut liquor / Tonic',
        },
        {
          name: 'TUKI-TUKI',
          price: 220,
          ingredients: 'Sake / passion fruit / peach liquor / falernum / lemon',
        }
      ]
    },
    {
      title: 'COCKTAILS CHIRINGUITO',
      items: [
        {
          name: 'Moscow Mule',
          price: 160,
          ingredients: 'Russian standard vodka / Ginger beer',
        },
        {
          name: 'Copresso',
          price: 160,
          ingredients: 'Bacardi Gold / Bacardi White / Coffee Liquor / Expresso coffee / Coconut Purée',
        },
        {
          name: 'Soprano',
          price: 160,
          ingredients: 'Whisky Jack Daniel Honey / Amareto / Bitter Angostura / Twist orange'
        },
        {
          name: 'Caipitanja',
          price: 160,
          ingredients: 'Vodka Russian / Watermelon syrup / Lemon'
        },
        {
          name: 'Bloody Tanja',
          price: 160,
          ingredients: 'Vodka Russe / Homemade tomato juice / Celery / Worcestershire sauce / Tabasco'
        },
        {
          name: 'Alcides',
          price: 160,
          ingredients: 'Bombay saphire / maraschino liquor / violet / beet / tonic'
        },
        {
          name: 'Maroc Julep',
          price: 160,
          ingredients: 'Whisky bourbon / shiba tea / mint / icing sugar'
        },
        {
          name: 'Paloma ajena',
          price: 160,
          ingredients: 'Tequila / yuzu / lemon / grapefruit juice / spicy salt'
        },
        {
          name: 'Coco jamboo',
          price: 160,
          ingredients: 'Baileys / banana liquor / coconut puree / cinnamon / nutmeg'
        },
        {
          name: 'El general spritz',
          price: 160,
          ingredients: 'Campari / apricot brandy / mango / prosecco'
        },
        {
          name: 'Vilma palma',
          price: 160,
          ingredients: 'Grey goose pear / calvados boulard / elderflower / prosecco'
        },
        {
          name: 'Green Mary',
          price: 160,
          ingredients: 'Vodka russian / cucumber / celery / black pepper / english sauce'
        },
        {
          name: 'Burbujas de amor',
          price: 160,
          ingredients: 'Bombay bramble / roses / tangerine liquor / red fruits / tonic'
        }
      ]
    },
    {
      title: 'MOCKTAILS',
  items: [
    {
      name: 'Detox Chiringuito',
      price: 60,
      ingredients: 'Water / lemon / mint / cucumber / celery',
      description: 'A pure, revitalizing blend that cleanses and refreshes, bringing the essence of wellness to your glass.'
    },
    {
      name: 'Amor Narcótico',
      price: 120,
      ingredients: 'Peach / watermelon / herbs'
    },
    {
      name: 'Tangerina Sour',
      price: 120,
      ingredients: 'Tangerine / yuzu / honey / egg white in option'
    },
    {
      name: 'Kiwi Mojito',
      price: 120,
      ingredients: 'Coconut water / kiwi / lemon / mint / ginger'
    }
      ]
    },
    {
      title: 'METER SHOTS',
      items: [
        {
          name: 'Passion Vodka',
          price: 550,
          ingredients: 'Russian Vodka / Passion fruits / Lemon',
          description: 'An intense shot of pure passion, combining the boldness of vodka with the vibrant energy of fresh passion fruit.'
        },
        {
          name: 'B52',
          price: 550,
          ingredients: 'Baileys / coffee liquor / triple sec',
          description: 'A layered classic with creamy Baileys, rich coffee liqueur, and citrusy Triple Sec—ignite it for drama!'
        },
        {
          name: 'Rainbow',
          price: 550,
          ingredients: 'Vodka / blue curaçao / orange / coconut liquor / grenadine syrup',
          description: 'A vibrant, colorful shot that takes you through a sweet and tropical flavor spectrum.'
        },
        {
          name: 'Tequila',
          price: 550,
          ingredients: 'Tequila Camino',
          description: 'Straight-up, no fuss—just the bold, earthy kick of premium Tequila Camino.'
        }
      ]
    },
    {
      title: 'SHOTS',
      items: [
        {
          name: 'Chaouen (x4)',
          price: 160,
          ingredients: 'Sambuca / Blue Curaçao / Russian Vodka / Vanilla syrup'
        },
        {
          name: 'Te a la Meister (x4)',
          price: 160,
          ingredients: 'Jägermeister / Ginger syrup / Chocolate liquor / Mint / White rum'
        },
        {
          name: 'Passion (x4)',
          price: 160,
          ingredients: 'Russian Vodka / Passion fruits / Lemon'
        }
      ]
    }
  ];

  return (
    <div className="bg-neutral-50 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-optima text-4xl md:text-5xl font-light text-center mb-8"
          style={{ color: '#81715E' }}
        >
          Cocktail Menu
        </motion.h1>
        <p 
          className="text-center text-xs text-neutral-600 mb-8 -mt-4"
          style={{ color: 'rgba(129, 113, 94, 0.7)' }}
        >
          A 6% service charge will be added to your bill. The establishment only accepts certified checks.
        </p>

        <div className="space-y-12">
          {menuSections.map((section, index) => (
            <CocktailMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailMenu;