'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  note?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  subtitle?: string;
}
 
const FoodMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  description,
  note,
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
            className="font-serif italic text-xl transition-all duration-300 group-hover:text-amber-800"
            style={{ color: '#81715E' }}
          >
            {name}
          </h3>
          {note && (
            <span className="text-xs text-neutral-500 font-light">{note}</span>
          )}
        </div>
        <span 
          className="font-light text-base transition-all duration-300 group-hover:text-amber-800"
          style={{ color: '#81715E' }}
        >
          {price}
        </span>
      </div>
      {description && !isExpanded && description.length <= 60 && (
        <p className="text-neutral-600 text-sm font-light tracking-wide">{description}</p>
      )}
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
    </motion.div>
  );
};

const FoodMenuSection: React.FC<MenuSection> = ({ title, items, subtitle }) => {
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
        className="text-2xl font-serif tracking-wide mb-4 pb-3 border-b relative" 
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
      {subtitle && (
        <p className="text-sm text-neutral-500 mb-6 italic">{subtitle}</p>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <FoodMenuItem
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

const FishMeatMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'FISH',
      subtitle: 'Served with side dish of your choice',
      items: [
        {
          name: 'Fish Tagra (tagine)',
          price: 340,
          description: 'Our signature tagine slowly cooked in its traditional terrine, where fresh fish of the day is simmered with tomatoes, colorful peppers, olives, and aromatic Moroccan spices, creating an authentic dish rich in Mediterranean and North African flavors.',
          note: 'house specialty'
        },
        {
          name: 'Royal Shrimp Tagra (tagine)',
          price: 800,
          description: 'A luxurious feast of king prawns prepared in our house tagine, gently simmered with a blend of saffron, garlic, fresh ginger, coriander, and a hint of mild chili. Served bubbling in its traditional terrine.',
          note: 'house specialty'
        },
        {
          name: 'Grilled Salmon',
          price: 340,
          description: 'Premium salmon fillet grilled to perfection with a golden crust and tender, juicy interior. Simply seasoned with fresh herbs, a drizzle of olive oil, and lemon zest to highlight its natural and delicate flavor.'
        },
        {
          name: 'Grilled Swordfish',
          price: 260,
          description: 'Meaty swordfish steak grilled to perfection, offering a firm texture and rich yet delicate flavor. Lightly marinated with Mediterranean herbs, olive oil, and lemon to enhance its natural marine freshness.'
        },
        {
          name: 'Sole meunière',
          price: 280,
          description: 'A French classic prepared with finesse - sole fillet delicately pan-fried in brown butter, flavored with garlic and parsley, creating a golden crust that perfectly contrasts with the white tender flesh of the fish. Served with a wedge of fresh lemon.'
        },
        {
          name: 'Grilled Sea Bass',
          price: 280,
          description: 'Mediterranean sea bass grilled whole or as a fillet depending on availability, with crispy skin and delicate white flesh. Simply prepared with olive oil, fresh herbs, and sea salt to preserve its exceptional natural flavor.'
        },
        {
          name: 'Grilled John Dory',
          price: 290,
          description: 'This noble fish with fine flesh is delicately grilled to preserve its delicate texture and subtle flavor. Its delicate taste is enhanced by a simple seasoning of fresh herbs, extra virgin olive oil, and a touch of fleur de sel.'
        },
        {
          name: 'Grilled Scampi',
          price: 600,
          description: 'Fresh langoustines grilled to perfection, revealing their sweet and tender meat. Served in their shell with homemade garlic and herb butter that delicately melts over these delicate and aromatic crustaceans.'
        },
        {
          name: 'Grilled Red Prawns',
          price: 800,
          description: 'Sumptuous king prawns of exceptional caliber, delicately grilled to preserve their firm texture and naturally sweet taste. Served with a touch of lemon-infused olive oil and fresh herbs of Provence.'
        }
      ]
    },
    {
      title: 'MEATS',
      subtitle: 'Served with side dish of your choice',
      items: [
        {
          name: 'Beef Tagliata',
          price: 380,
          description: 'Tender beef tenderloin thinly sliced after perfect cooking, served slightly pink and garnished with parmesan shavings, fresh arugula, and a drizzle of truffle-scented extra virgin olive oil. An Italian-inspired dish that highlights the exceptional quality of our meat.'
        },
        {
          name: 'Beef Tenderloin Sautéed with Garlic',
          price: 340,
          description: 'Tender pieces of beef tenderloin sautéed over high heat with crushed fresh garlic, creating a perfect contrast between the caramelized exterior and juicy, tender interior. A simple preparation that celebrates the quality of our carefully selected meat.'
        },
        {
          name: 'Shish Taouk',
          price: 220,
          description: 'Chicken skewers marinated in a traditional Lebanese blend of yogurt, garlic, lemon, and spices like sumac and zaatar. Grilled until perfectly tender with light caramelization, and served with our homemade herb aioli sauce.'
        },
        {
          name: 'Rib Eye Steak',
          price: 320,
          description: 'Top-quality aged ribeye, grilled to your preference and served with our house sauce of crushed black pepper, shallots, and cognac. The perfect marbling of this cut offers incomparable tenderness and flavor.'
        },
        {
          name: 'Hamburger (100% homemade)',
          price: 140,
          description: 'Our signature burger made with hand-ground beef steak, grilled to perfection and topped with melted cheddar cheese, slowly caramelized onions, and our slightly smoked secret sauce. All served in a butter-toasted artisanal brioche bun.'
        },
        {
          name: 'Mini Beef Hamburgers',
          price: 140,
          description: 'Trio of delicious mini burgers prepared with the same care as our classic version. Each bite offers a perfect balance between juicy beef, melting cheddar, and our creamy homemade sauce, all in a soft mini brioche bun. Ideal for sharing or as a generous appetizer.'
        }
      ]
    },
    {
      title: 'SIDE DISHES',
      items: [
        {
          name: 'Sautéed Vegetables',
          price: 60,
          description: 'A colorful mix of seasonal vegetables finely cut and quickly sautéed in olive oil with a touch of garlic and fresh herbs. The cooking preserves their crunch and natural flavors for a side dish that is both healthy and delicious.'
        },
        {
          name: 'Mashed Potatoes',
          price: 60,
          description: 'Creamy purée prepared from floury potatoes, mashed with churned butter and fresh cream. Its velvety texture and richness make it the perfect complement to our fish and meat dishes.'
        },
        {
          name: 'Sautéed Potatoes',
          price: 60,
          description: 'New potatoes cut into quarters and slowly sautéed until golden and crispy on the outside with a tender interior. Flavored with fresh thyme and garlic, they are the ideal accompaniment to enhance our main dishes.'
        },
        {
          name: 'French Fries',
          price: 60,
          description: 'Crispy fries prepared in our kitchen according to the traditional method: hand-cut, cooked twice to obtain a perfectly golden exterior and a soft interior, and seasoned with a pinch of fleur de sel.'
        },
        {
          name: 'Green Salad',
          price: 60,
          description: 'Fresh mix of young shoots and crisp leaves, lightly dressed with a homemade vinaigrette made from extra virgin olive oil and aged balsamic vinegar. The perfect option for a light and refreshing side dish.'
        }
      ]
    }
  ];

  return (
    <div 
      id="fish-meat-menu-section"
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
            Fish & Meats
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Freshness and quality
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
            <FoodMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
              subtitle={section.subtitle}
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

export default FishMeatMenu;