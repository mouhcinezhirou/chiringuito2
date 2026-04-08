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
          options: '6 pieces / 12 pieces',
          detailedDescription: 'Shining gems from the Atlantic coast of Dakhla, these oysters offer a delicately briny taste and a creamy texture that evoke the pure essence of the ocean with every bite.'
        },
        {
          name: 'Olive Tapenade Trio',
          price: 95,
          description: 'A trio of green olive, black olive, and harissa-spiced olive spreads',
          detailedDescription: 'Carefully selected olives finely crafted to deliver three unique flavors: the freshness of green olives, the richness of black olives, and the subtle heat of harissa olives. A delicate Mediterranean symphony that will delight lovers of authentic flavors.'
        },
        {
          name: 'Marinated Anchovies',
          price: 80,
          description: 'Fresh anchovy fillets marinated in olive oil and garlic',
          detailedDescription: 'A traditional Mediterranean preparation where the intense flavor of anchovies is softened by a fragrant marinade of virgin olive oil and garlic, for a deep and satisfying taste experience.'
        },
        {
          name: 'Popcorn Shrimp',
          price: 160,
          description: 'Crispy spiced shrimp bites',
          detailedDescription: 'Shrimp coated in a lightly spiced breading and fried to perfection, creating an irresistible contrast between the crispy exterior and the juicy tenderness within.'
        },
        {
          name: 'Tuna Tartare Tacos',
          price: 160,
          description: 'Crispy taco, homemade avocado mousse, fresh mango, bluefin tuna and fried shallots.',
          detailedDescription: 'Premium bluefin tuna pairs with the exotic sweetness of fresh mango and the smoothness of a homemade avocado mousse. Finished with the delicate crunch of fried shallots and served in a crispy homemade taco, offering a subtle interplay of refined textures and flavors.'
        },
        {
          name: 'Shrimp Tacos',
          price: 140,
          description: 'Crispy tacos filled with grilled shrimp, avocado, tomatoes, onions and a lightly spiced vinaigrette',
          detailedDescription: 'Sea and land unite in these tacos where juicy shrimp meet fresh vegetables and creamy avocado, lifted by a vinaigrette that gently awakens the palate.'
        },
{
  name: 'Tangy/Spicy Hummus',
  price: 120,
  description: 'Subtly tangy and spiced chickpea cream, served with golden, tender homemade bread',
  detailedDescription: 'A bold take on classic hummus, where the mildness of chickpeas meets the brightness of pickles and marinated onions. Tahini and olive oil create a silky texture, while the tangy flavors bring balance and character. Served with golden, tender homemade bread — perfect for savoring every nuance.'
},
{
  name: 'Classic Hummus',
  price: 120,
  description: 'Smooth and velvety chickpea cream, served with golden, tender homemade bread',
  detailedDescription: 'A pure and refined take on hummus, showcasing the natural richness of chickpeas. Its velvety, creamy texture, delicately perfumed with olive oil, offers a subtle and indulgent experience — the perfect way to enjoy the simplicity of a Middle Eastern classic. Served with golden, tender homemade bread, ideal for bringing out all its delicacy.'
},
        {
          name: 'Alioli Potatoes',
          price: 70,
          description: 'Golden potatoes served with a homemade garlic aioli.',
          detailedDescription: 'An iconic Spanish tapa where perfectly golden potatoes meet the smoothness of a homemade aioli subtly infused with garlic, offering a delicate contrast of textures and refined flavors.'
        },
        {
          name: 'Batata Harra',
          price: 60,
          description: 'Fried potatoes with chili, coriander, lemon and garlic',
          detailedDescription: 'A journey to Lebanon in one bite, where crispy potatoes dance with the warmth of chili, the brightness of lemon and the aromatic notes of fresh coriander.'
        },
        {
          name: 'Cheese Board',
          price: 180,
          description: 'Selection of assorted cheeses',
          detailedDescription: 'A passionately curated board presenting cheeses of character, ranging from the mildest to the most aged, accompanied by condiments that enhance their complex notes.'
        },
        {
          name: 'Russian Salad',
          price: 90,
          description: 'Potatoes, carrots, eggs, green beans, tuna, mayonnaise',
          detailedDescription: 'A nostalgic preparation where crunchy vegetables and tuna come together in a creamy mayonnaise embrace, creating the perfect balance between richness and freshness.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Steamed soy beans with sea salt and garlic marinade',
          detailedDescription: 'Little green treasures from Japan, these soy beans in their pods are enhanced with sea salt and garlic, offering a tactile and flavorful experience that is both playful and satisfying.'
        },
        {
          name: 'Spanish Tortilla',
          price: 90,
          description: 'Spanish omelet with eggs, melting potatoes and delicately caramelized onions.',
          detailedDescription: 'A Spanish classic made with melt-in-the-mouth potatoes and soft eggs, slowly cooked to create that distinctive texture — somewhere between firm and silky.'
        },
        {
          name: 'Seafood Croquettes',
          price: 80,
          description: 'Creamy seafood béchamel',
          detailedDescription: 'Golden, crispy bites that reveal a tender heart of béchamel enriched with delicate seafood, capturing the essence of the Mediterranean in every mouthful.'
        },
        {
          name: 'Chicken & Mushroom Croquettes',
          price: 80,
          description: 'Tender chicken and aromatic mushrooms',
          detailedDescription: 'Melt-in-the-mouth chicken and earthy mushrooms come together in a velvety béchamel, all wrapped in a golden breadcrumb crust that crackles delightfully with every bite.'
        },
        {
          name: 'Crunchy Mushrooms',
          price: 100,
          description: 'Marinated breaded mushrooms, fried and served with tartare sauce',
          detailedDescription: 'Mushrooms made irresistible by a spiced marinade and a crispy coating, served with a homemade tartare sauce that perfectly balances their bold character.'
        },
        {
          name: 'Garlic Mushrooms',
          price: 100,
          description: 'Mushrooms, olive oil, garlic and parsley',
          detailedDescription: 'Simplicity at its finest, where juicy mushrooms absorb the essence of golden garlic and fresh parsley, all coated in a fruity first-press olive oil.'
        },
        {
          name: 'Garlic Clams',
          price: 140,
          description: 'Clams, olive oil and parsley',
          detailedDescription: 'These delicate shellfish open to reveal their tender flesh, bathed in an elixir of garlic-infused olive oil and scattered with fresh parsley — a true homage to the sea.'
        },
        {
          name: 'Garlic Shrimp',
          price: 140,
          description: 'In spiced olive oil',
          detailedDescription: 'Juicy shrimp sautéed in a fiery olive oil that captures all the essence of garlic and chili, creating an irresistible sauce best savored with bread.'
        },
        {
          name: 'Fried Calamari "Andalusian Style"',
          price: 160,
          description: 'Calamari fried in Andalusian flour',
          detailedDescription: 'The Andalusian art of frying at its finest, with tender calamari rings coated in a light, crispy batter and served with a squeeze of lemon to brighten the flavors.'
        },
        {
          name: 'Grilled Baby Squid',
          price: 220,
          description: 'With salad, olive oil and garlic',
          detailedDescription: 'Whole baby squid grilled to perfection, retaining their natural tenderness and lifted by the subtle pairing of garlic and olive oil on a bed of fresh salad.'
        },
        {
          name: 'Vitello Tonnato',
          price: 160,
          description: 'Thin slices of roasted entrecôte, topped with a creamy tuna sauce, capers, cherry tomatoes and parmesan shavings.',
          detailedDescription: 'A refined take on Italian elegance, where thinly sliced roasted entrecôte meets the richness of a smooth tuna sauce. Capers, cherry tomatoes and parmesan shavings add freshness, savory notes and texture, for a delicate and well-balanced dish.'
        },
        {
          name: 'Galician-Style Octopus',
          price: 160,
          description: 'Octopus served on a potato purée',
          detailedDescription: 'A specialty from northern Spain where tender octopus rests on a bed of velvety potatoes, generously drizzled with olive oil and dusted with smoked paprika.'
        }
      ]
    },
    {
      title: 'SALADS',
      items: [
        {
          name: 'Classic Caesar Salad',
          price: 160,
          description: 'Romaine lettuce, grilled chicken, cherry tomatoes, marinated anchovies, egg, capers, golden croutons and parmesan shavings, with a homemade Caesar dressing.',
          detailedDescription: 'Crunchy romaine lettuce, grilled chicken and juicy cherry tomatoes, complemented by marinated anchovies and delicately seasoned capers. Golden croutons and parmesan shavings add texture and richness, while our homemade Caesar dressing — smooth and flavorful — ties it all together for a classic yet indulgent experience.'
        },
        {
          name: 'Rainbow Salad',
          price: 120,
          description: 'Romaine and mesclun, carrots, cucumber, onions, red, green and yellow peppers, cherry tomatoes, tuna, eggs and anchovies.',
          detailedDescription: 'A true tableau of colors and flavors, where crunchy fresh vegetables meet the richness of tuna and eggs. Every bite offers a harmonious balance of textures and tastes, for a light, healthy and refined experience.'
        },
        {
          name: 'Greek Salad',
          price: 140,
          description: 'Tomatoes, peppers, onions, cucumber, feta',
          detailedDescription: 'An escape to the Greek islands in every bite, where sun-ripened vegetables meet the saltiness of feta and the sweetness of Mediterranean herbs.'
        },
        {
          name: 'Chiringuito Salad',
          price: 140,
          description: 'Crisp salad, thinly sliced avocado, shrimp, octopus, calamari and smoked salmon, all brought together by a homemade cocktail sauce.',
          detailedDescription: 'Our signature salad showcases the freshness and finesse of seafood: shrimp, octopus, calamari and smoked salmon pair with creamy avocado and crisp salad leaves. Subtly lifted by our homemade cocktail sauce, it offers a refined balance of textures and flavors.'
        },
        {
          name: 'Fresh Octopus Salad',
          price: 180,
          description: 'Tender octopus, fresh tomatoes, red, yellow and green pepper brunoise, shallot and coriander, delicately dressed with olive oil, fresh lemon juice and a pinch of fleur de sel',
          detailedDescription: 'Tender, melt-in-the-mouth octopus pairs with the crunch of multicolored peppers and the juicy sweetness of cherry tomatoes. Fragrant with fresh coriander and lifted by a drizzle of premium olive oil and a pinch of fleur de sel, this salad offers a harmonious and refreshing blend of Mediterranean flavors.'
        },
        {
          name: 'Burrata Salad',
          price: 160,
          description: 'Served with tomatoes, homemade pesto and balsamic cream',
          detailedDescription: 'The perfect contrast between creamy burrata with its flowing heart and sun-ripened tomatoes, elevated by our artisanal pesto with notes of freshly picked basil.'
        },
        {
          name: 'Goat Cheese Salad',
          price: 160,
          description: 'Crisp romaine and mesclun, fresh goat cheese, two fried goat cheese rounds, walnuts, dried figs and pine nuts, finished with balsamic cream and a touch of raspberry jam.',
          detailedDescription: 'The melt-in-the-mouth softness of goat cheese and fried rounds mingles with the crunch of romaine and mesclun, while raspberry jam and balsamic cream bring sweet and tangy notes, creating a delicate and refined harmony of flavors.'
        },
        {
          name: 'Tomato & Tuna Carpaccio',
          price: 140,
          description: 'Thinly sliced tomatoes and premium tuna',
          detailedDescription: 'Extremely thin slices of tomato dressed with delicate tuna, drizzled with fruity olive oil and scattered with fresh herbs for a dish of elegant simplicity.'
        },
        {
          name: 'Tomato, Avocado, Onion & Tuna Salad',
          price: 140,
          description: 'Thin slices of tomato, premium tuna, delicate avocado slices and finely sliced onions, finished with a drizzle of olive oil and a pinch of fleur de sel',
          detailedDescription: 'Thin slices of tomato meet premium tuna and delicate avocado, while finely sliced onions add a subtle touch. Finished with a drizzle of virgin olive oil and a pinch of fleur de sel, this salad offers a fresh, refined and delicately fragrant balance.'
        },
        {
          name: 'Beef Carpaccio',
          price: 140,
          description: 'Thin slices of raw beef, parmesan shavings, capers, pesto sauce, olive oil, fleur de sel and pine nuts.',
          detailedDescription: 'Exceptionally thin slices of beef, delicately arranged and elevated by a drizzle of first-press olive oil, aged parmesan shavings and capers that accentuate its gentle flavor. A touch of homemade pesto and pine nuts add freshness and texture, for a refined and well-balanced experience.'
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
            Freshness and flavor
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