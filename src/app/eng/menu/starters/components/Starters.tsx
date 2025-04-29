'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number | string;
  description: string;
  options?: string;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const StarterMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  description,
  options,
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
          {options && (
            <span className="text-xs text-neutral-500 font-light">{options}</span>
          )}
        </div>
        <span 
          className="font-light text-base transition-all duration-300 group-hover:text-amber-800"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      <p className="text-neutral-600 text-sm font-light tracking-wide">{description.toLowerCase()}</p>
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

const StarterMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <StarterMenuItem
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

const StartersMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'TO SHARE',
      items: [
        {
          name: 'Dakhla Oysters',
          price: '140 / 260',
          description: 'Fresh and briny',
          options: '6 units / 12 units',
          detailedDescription: 'Glistening jewels from the Atlantic coast of Dakhla, these oysters offer a delicately briny taste and creamy texture that evoke the pure essence of the ocean with every bite.'
        },
        {
          name: 'Fried "Padron"',
          price: 80,
          description: 'fried sweet green peppers, accompanied by fleur de sel',
          detailedDescription: 'A Spanish roulette game where some are mild and others surprise with their heat, these crispy fried little peppers are enhanced by the crunch of coarse sea salt.'
        },
        {
          name: 'Marinated Anchovies',
          price: 80,
          description: 'Fresh anchovy fillets marinated in olive oil and garlic',
          detailedDescription: 'A traditional Mediterranean preparation where the intense flavor of anchovies is softened by a fragrant marinade of virgin olive oil and garlic, for a deep flavor experience.'
        },
        {
          name: 'Popcorn Shrimp',
          price: 90,
          description: 'Crispy spiced shrimp',
          detailedDescription: 'Bite-sized shrimp coated in a lightly spiced batter and fried to perfection, creating an irresistible contrast between the crispy exterior and juicy tenderness inside.'
        },
        {
          name: 'Tuna Tartare Tacos',
          price: 120,
          description: 'Crispy tacos, red tuna, mango, avocado',
          detailedDescription: 'An elegant fusion of flavors where raw red tuna meets the exotic sweetness of mango and the creaminess of avocado, all wrapped in the crispy embrace of an artisanal taco.'
        },
        {
          name: 'Shrimp Tacos',
          price: 120,
          description: 'Crispy tacos filled with a mix of grilled shrimp, avocado, tomatoes, onions with a lightly spiced vinaigrette',
          detailedDescription: 'Sea and land unite in these tacos where juicy shrimp meet the freshness of vegetables and the creaminess of avocado, enhanced by a vinaigrette that gently awakens the taste buds.'
        },
        {
          name: 'Hummus',
          price: 120,
          description: 'Lebanese-style chickpea cream',
          detailedDescription: 'An ancestral Middle Eastern recipe transforming chickpeas into a silky cream, where the balance between tahini, lemon and olive oil creates a symphony of flavors.'
        },
        {
          name: 'Alioli Potatoes',
          price: 70,
          description: 'Fried potatoes with garlic mayonnaise',
          detailedDescription: 'An essential Spanish tapas where the warmth of golden potatoes meets the freshness of a creamy garlic aioli, for a comforting contrast of temperatures and textures.'
        },
        {
          name: 'Batata Harra',
          price: 60,
          description: 'Fried potatoes with chili, coriander, lemon and garlic',
          detailedDescription: 'A journey to Lebanon in one bite, where crispy potatoes dance with the heat of chilies, the freshness of lemon and the aromatic notes of coriander.'
        },
        {
          name: 'Cheese Platter',
          price: 180,
          description: 'Selection of various cheeses',
          detailedDescription: 'A passionately curated platter featuring character cheeses, ranging from mild to mature, accompanied by condiments that enhance their complex notes.'
        },
        {
          name: 'Russian Salad',
          price: 70,
          description: 'Potatoes, carrots, eggs, peas, tuna, mayonnaise',
          detailedDescription: 'A nostalgic preparation where crunchy vegetables and tuna marry in a creamy mayonnaise embrace, creating a perfect balance between richness and freshness.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Steamed soybeans with sea salt and garlic marinade',
          detailedDescription: 'Little green treasures from Japan, these soybean pods are enhanced by sea salt and garlic, offering a tactile and gustatory experience that is both playful and satisfying.'
        },
        {
          name: 'Spanish Tortilla',
          price: 70,
          description: 'Potato omelette',
          detailedDescription: 'A Spanish classic reinterpreted with melting potatoes and fluffy eggs, slowly cooked to create this distinctive texture that melts in the mouth, between solid and creamy.'
        },
        {
          name: 'Seafood Croquettes',
          price: 80,
          description: 'Creamy béchamel with seafood',
          detailedDescription: 'Golden and crispy bites that reveal a tender heart of béchamel enriched with delicate seafood, capturing the essence of the Mediterranean in every bite.'
        },
        {
          name: 'Chicken and Mushroom Croquettes',
          price: 80,
          description: 'Tender chicken and aromatic mushrooms',
          detailedDescription: 'The meeting of melting chicken and earthy mushrooms in a velvety béchamel, all wrapped in a golden breadcrumb that joyfully cracks under the tooth.'
        },
        {
          name: 'Champi-Crunchi',
          price: 100,
          description: 'Breaded marinated and spicy mushrooms with tartar sauce',
          detailedDescription: 'Mushrooms made addictive by a spicy marinade and crispy coating, accompanied by a homemade tartar sauce that perfectly balances their bold character.'
        },
        {
          name: 'Sautéed Mushrooms with Garlic & Herbs',
          price: 100,
          description: 'Mushrooms, olive oil, garlic and parsley',
          detailedDescription: 'Simplicity at its peak, where juicy mushrooms absorb the essence of golden garlic and the aroma of fresh parsley, all coated in a fruity first-press olive oil.'
        },
        {
          name: 'Sautéed Clams',
          price: 140,
          description: 'Clams, garlic, olive oil and parsley',
          detailedDescription: 'These delicate shellfish open to reveal their tender flesh, bathed in an elixir of garlic-infused olive oil and sprinkled with fresh parsley - a tribute to the sea.'
        },
        {
          name: 'Garlic Shrimp',
          price: 140,
          description: 'In spicy olive oil',
          detailedDescription: 'Juicy shrimp sautéed in an ardent olive oil that captures the essence of garlic and chili, creating an irresistible juice that calls to be savored with bread.'
        },
        {
          name: 'Andalusian Style Calamari',
          price: 160,
          description: 'Fried calamari with Andalusian flour',
          detailedDescription: 'The Andalusian art of frying in all its splendor, with tender calamari rings coated in a light and crispy batter, served with a lemon zest to awaken the flavors.'
        },
        {
          name: 'Grilled Baby Calamari',
          price: 220,
          description: 'With salad, olive oil and garlic',
          detailedDescription: 'Small whole calamari grilled to perfection, preserving their natural tenderness and enhanced by the subtle alliance of garlic and olive oil on a bed of fresh salad.'
        },
        {
          name: 'Vitello Tonnato',
          price: 160,
          description: 'Thin slices of veal in a creamy tuna mayonnaise, served with capers',
          detailedDescription: 'A classic Italian elegance where the delicacy of pink veal marries the richness of tuna sauce, punctuated by the salty bursts of capers and the acidity of lemon.'
        },
        {
          name: 'Galician Style Octopus',
          price: 160,
          description: 'Boiled octopus, mashed potatoe, sea salt, de la vera paprika',
          detailedDescription: 'A specialty from northern Spain where tender octopus rests on a bed of velvety potatoes, all generously drizzled with olive oil and sprinkled with smoked paprika.'
        }
      ]
    },
    {
      title: 'SALADS',
      items: [
        {
          name: 'Caesar Salad – Classic –',
          price: 140,
          description: 'Romaine lettuce, grilled chicken, anchovies, tomatoes, egg, bread croutons, parmesan shavings and caesar dressing',
          detailedDescription: 'The iconic salad reinvented with juicy chicken and all the ingredients that have made it famous, enhanced by our homemade caesar dressing with the perfect balance between cream and umami.'
        },
        {
          name: 'Rainbow Salad',
          price: 120,
          description: 'Lettuce, Vegetables, Tuna, Eggs, Anchovies',
          detailedDescription: 'A colorful and nutritious tableau where each bite offers a different combination of flavors and textures, from the crunch of fresh vegetables to the richness of tuna and eggs.'
        },
        {
          name: 'Greek Salad',
          price: 140,
          description: 'Tomatoes, Peppers, Onions, Cucumber, Feta',
          detailedDescription: 'An escape to the Greek islands in every bite, where the freshness of sun-drenched vegetables marries the saltiness of feta and the sweetness of Mediterranean herbs.'
        },
        {
          name: 'Tangier Blue Crab Salad',
          price: 130,
          description: 'Fine chiffonade of romaine lettuce, 100gr crab meat and mayonnaise',
          detailedDescription: 'Our local signature where the delicacy of blue crab meat blooms on a bed of crunchy romaine, all wrapped in an airy mayonnaise with subtle lemony notes.'
        },
        {
          name: 'Chiringuito Salad',
          price: 140,
          description: 'Salad, Avocado, Mixed seafood and a cocktail sauce',
          detailedDescription: 'Our emblematic creation that captures the very essence of our establishment - a generous portion of fresh seafood meeting creamy avocado on a bed of crunchy greens.'
        },
        {
          name: 'Octopus Salad',
          price: 160,
          description: 'Octopus, Potatoes, Grilled peppers, Parsley, Oil, Salt',
          detailedDescription: 'Tender and meaty octopus unites with melting potatoes and smoky peppers in a dance of olive oil perfumed with fresh parsley - a true ode to the Mediterranean.'
        },
        {
          name: 'Burrata Salad',
          price: 160,
          description: 'Serviced with tomatoes, Homemade pesto, and balsamic cream',
          detailedDescription: 'The perfect contrast between creamy burrata with a flowing heart and sun-drenched tomatoes, magnified by our artisanal pesto with notes of freshly picked basil.'
        },
        {
          name: 'Goat Cheese Salad',
          price: 140,
          description: 'Arugula, Goat cheese, Balsamic cream, Candied raspberries',
          detailedDescription: 'The warmth of melting goat cheese marries the peppery freshness of arugula, while candied raspberries bring a sweet-tangy note that dances with the balsamic vinegar.'
        },
        {
          name: 'Tomato Carpaccio with Tuna',
          price: 140,
          description: 'Fine tomatoes and premium tuna',
          detailedDescription: 'Extremely thin slices of tomatoes adorned with delicate tuna, all drizzled with fruity olive oil and sprinkled with fresh herbs for a dish of elegant simplicity.'
        },
        {
          name: 'Sautéed Red Tuna & Pepper Salad',
          price: 140,
          description: 'Lightly seared tuna',
          detailedDescription: 'Red tuna briefly seared to preserve its natural tenderness, placed on a bed of smoked-flavored peppers that perfectly complement the richness of the fish without ever dominating it.'
        },
        {
          name: 'Beef Carpaccio',
          price: 140,
          description: 'Thin slices of raw beef, shaved parmesan, olive oil, sea salt, capres',
          detailedDescription: 'Extraordinarily fine slices of beef, beautifully arranged and seasoned with first press olive oil, aged parmesan and capers that enhance its delicate taste.'
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
            Starters & Salads
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Freshness and flavors
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A service charge of 6% will be added to your bill.
            <br/>The establishment accepts only certified checks.
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
              Enjoy your meal
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default StartersMenu;