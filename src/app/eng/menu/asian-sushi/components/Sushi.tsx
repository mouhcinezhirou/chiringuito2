'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  details?: string;
  pieces?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  note?: string;
}

const SushiMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  description,
  details,
  pieces,
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
          {pieces && (
            <span className="text-xs text-neutral-500 font-light">({pieces} pieces)</span>
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
        {isExpanded && details && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-neutral-500 italic text-sm pl-4 border-l-2 border-amber-200">{details}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {details && (
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

const SushiMenuSection: React.FC<MenuSection> = ({ title, items, note }) => {
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
          <SushiMenuItem
            key={index}
            {...item}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedItem === index}
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
      title: 'STARTERS',
      items: [
        {
          name: 'Chicken Spring Rolls',
          price: 160,
          description: 'Chicken, Chinese mushrooms, vermicelli, fried rice paper',
          details: 'A classic revisited with finesse – our crispy spring rolls reveal a tender heart where chicken intertwines with mushrooms in a dance of flavors, wrapped in rice paper that cracks with every bite.'
        },
        {
          name: 'Spicy Ebi Fry',
          price: 150,
          description: 'Fried shrimp, spicy mayonnaise',
          details: 'Shrimp captured at dawn, coated in a light batter with secret spices, then fried to perfection. Served with our homemade spicy mayonnaise that gently inflames the taste buds without burning them.'
        }
      ]
    },
    {
      title: 'ROLLS',
      note: '(8 pieces per roll unless otherwise indicated)',
      items: [
        {
          name: 'Spicy Tuna Roll',
          price: 160,
          description: 'Spicy bluefin tuna tartare, fresh bluefin tuna, wasabi mayonnaise',
          details: 'A double tuna experience – raw and tartare – enhanced by a touch of chili that awakens the senses without masking the nobility of this fish. Wasabi mayonnaise adds a creamy dimension with a finale that builds in intensity.'
        },
        {
          name: 'Spicy Salmon Roll',
          price: 160,
          description: 'Spicy salmon tartare, fresh salmon, sriracha mayonnaise',
          details: 'The unctuous tenderness of salmon meets the boldness of sriracha in this roll that plays on contrasts. Each bite progressively reveals its complexity, starting with sweetness and ending with a pleasant spicy warmth.'
        },
        {
          name: 'Tropical Crab Roll',
          price: 160,
          description: 'Crab tartare, avocado, seasonal mango',
          details: 'A tropical journey in eight bites where the delicate crab meat unites with the vegetable butter of avocado, while mango brings a sunny touch that illuminates the ensemble with its sweet exotic acidity.'
        },
        {
          name: 'Salmon Avocado California Roll',
          price: 180,
          description: 'Fresh salmon, smoked salmon, avocado, cream cheese',
          details: 'A dialogue between two expressions of salmon – fresh rawness and smoked depth – harmonized by the creamy richness of avocado and the lightness of cream cheese. Our interpretation of a Californian classic with a Mediterranean touch.'
        },
        {
          name: 'Shrimp Green Roll',
          price: 180,
          description: 'Fried shrimp, cucumber and avocado tartare, toasted sesame, spicy mayonnaise',
          details: 'The crispy texture of golden shrimp marries with the herbal freshness of green tartare in this invigorating roll. Toasted sesame seeds add nutty notes that dance with the subtle heat of the mayonnaise.'
        },
        {
          name: 'Crispy Chicken Roll',
          price: 180,
          description: 'Chicken tempura, cream cheese, caramelized onions, spicy mayonnaise, fried onions',
          details: 'A bold fusion creation where crispy chicken tempura meets the sweet-savory gentleness of caramelized onions. A double texture of onions and spicy mayonnaise create a roll with comforting and complex flavors.'
        },
        {
          name: 'Chiringuito Roll',
          price: 190,
          description: 'Bluefin tuna, tempura shrimp, fresh salmon, Asilah crab, cream cheese, chives',
          details: 'Our ultimate signature – an exceptional marine quartet where each ingredient preserves its character while forming a harmonious symphony. Hand-caught Asilah crab brings an iodized sweetness that the freshness of chives sublimely enhances.'
        }
      ]
    },
    {
      title: 'CRUNCHY ASIAN',
      items: [
        {
          name: 'Crunchy Roll',
          price: 140,
          description: 'Shrimp, avocado, cream cheese, tobiko, teriyaki, spicy mayonnaise',
          pieces: 8,
          details: 'The quintessence of contrast: the crispy exterior gives way to a tender heart where shrimp dance with avocado. Fish eggs burst in the mouth like bubbles of marine flavor, while the sauces intertwine their sweet and spicy notes.'
        },
        {
          name: 'Dragon Roll',
          price: 160,
          description: 'Salmon, cream cheese, spicy sauce, tobiko, teriyaki, chives',
          pieces: 8,
          details: 'Inspired by the legendary Asian dragon, this sinuous roll captures its strength and grace. Salmon, like precious scales, wraps around a creamy heart vibrant with spices, while tobiko adds a tactile dimension evoking the dragon\'s fire.'
        },
        {
          name: 'Salmon Sushi Pizza',
          price: 160,
          description: 'Salmon, avocado, cream cheese, tobiko, spicy mayonnaise, teriyaki',
          details: 'A bold fusion between Italy and Japan – our crispy rice disc evokes pizza, generously topped with velvety salmon and avocado. The sauces intertwine in artistic spirals, creating a unique gustatory tableau.'
        }
      ]
    },
    {
      title: 'NIGIRI',
      note: '(8 pieces per order unless otherwise indicated)',
      items: [
        {
          name: 'Bluefin Tuna Nigiri',
          price: 180,
          description: 'Slices of bluefin tuna on pressed sushi rice',
          details: 'Marine nobility in its purest form – our bluefin tuna, selected for its deep color and silky texture, majestically rests on a pillow of fragrant rice. A minimalist dialogue between two exceptional ingredients.'
        },
        {
          name: 'Salmon Nigiri',
          price: 180,
          description: 'Slices of fresh salmon on pressed sushi rice',
          details: 'Salmon slices of incomparable tenderness, precisely cut to reveal their delicate marbling. On the rice, they slowly melt, releasing their essential oils that blend with the subtle vinegar of the rice.'
        },
        {
          name: 'Sea Bass Nigiri',
          price: 180,
          description: 'Delicate sea bass slices on pressed sushi rice',
          details: 'Refinement incarnate – our Mediterranean sea bass offers a pearly flesh of exceptional delicacy. Its pure and elegant flavor is enhanced by the simplicity of the rice, creating an experience of zen purity.'
        },
        {
          name: 'Shrimp Nigiri',
          price: 140,
          description: 'Cooked shrimp on pressed sushi rice',
          details: 'Our shrimp are delicately cooked to preserve their bouncy texture and natural sweetness. Placed like pink jewels on their rice base, they offer a temperature contrast that amplifies their marine aromas.'
        },
        {
          name: 'Nigiri Selection',
          price: 180,
          description: 'Bluefin tuna, salmon, shrimp & sea bass',
          details: 'A harmonious quartet celebrating the diversity of marine flavors – from powerful bluefin tuna to delicate sea bass, through creamy salmon and sweet shrimp. A complete tasting served in the ideal order.'
        }
      ]
    },
    {
      title: 'SASHIMI & TATAKI',
      items: [
        {
          name: 'Bluefin Tuna Sashimi',
          price: 220,
          description: 'Fresh slices of premium bluefin tuna',
          details: 'Marine rubies cut with the precision of a master jeweler. Our tuna, selected for its exceptional quality, is sliced into perfect strips that celebrate its firm texture and deep flavor, enhanced by a simple touch of real wasabi.'
        },
        {
          name: 'Salmon Sashimi',
          price: 220,
          description: 'Fresh slices of high-quality salmon',
          details: 'Petals of delicate coral – our salmon is cut into thin slices that catch the light like stained glass. Its melting flesh releases a buttery richness and a delicate marine flavor that evokes the cold waters from which it comes.'
        },
        {
          name: 'Sea Bass Sashimi',
          price: 220,
          description: 'Fresh slices of delicate sea bass',
          details: 'The very essence of marine subtlety – our line-caught sea bass is presented in transparent slices that reveal its immaculate flesh. Its delicate, almost sweet flavor is a hymn to the purity of Mediterranean sandy bottoms.'
        },
        {
          name: 'Rainbow Sashimi',
          price: 220,
          description: 'Assortment of bluefin tuna, salmon and sea bass',
          details: 'A chromatic palette that delights the eyes as much as the taste buds – from the deep red of tuna to the bright orange of salmon to the pearly white of sea bass. Each variety is artistically arranged to create an enchanting marine gradient.'
        },
        {
          name: 'Bluefin Tuna Tataki',
          price: 240,
          description: 'Seared bluefin tuna with light seasoning',
          details: 'A perfect balance between raw and cooked – our tuna is briefly seared over a high flame to caramelize its surface while preserving its raw heart. This thermal alchemy reveals new aromatic dimensions, enhanced by our secret marinade.'
        },
        {
          name: 'Salmon Tataki',
          price: 240,
          description: 'Seared salmon with light seasoning',
          details: 'The metamorphosis of salmon – the fleeting heat transforms its surface into a golden veil that seals the precious oils inside. Our citrus and sesame seasoning amplifies its natural richness, creating a fascinating contrast between exterior and interior.'
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
            Asian Sushi Menu
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fresh & Delicious
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A service charge of 6% will be added to your bill.
            <br/>The establishment only accepts certified checks.
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
              Enjoy your meal
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default SushiMenu;