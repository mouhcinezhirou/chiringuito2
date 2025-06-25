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
      title: 'COCKTAILS TIKI',
      items: [
{
  name: 'De Tu Bikini',
  price: 220,
  ingredients: 'mangue / grand marnier / tequila infusée au piment / coriandre',
  description: 'Une évasion tropicale qui marie la douceur exotique de la mangue avec la sophistication du Grand Marnier et la chaleur épicée de la tequila au piment, rehaussée par la fraîcheur herbacée de la coriandre.'
},
        {
          name: 'Mai Tai Chiringuito',
          price: 220,
          ingredients: 'Bacardi Gold / Liqueur de Mandarine / Orgeat / Orange / Bitter Angostura',
          description: 'Notre version signature du classique Mai Tai, apportant le coucher de soleil sur la plage dans votre verre avec des notes d\'amande riches et des agrumes vibrants.'
        },
        {
          name: 'No Te Olvides Del Verano',
          price: 220,
          ingredients: 'Vodka Russian Standard / Blue Curaçao / Orgeat / Liqueur de Coco / Tonic',
          description: 'Un souvenir d\'été capturé dans un bleu azur, avec des notes délicates de noix de coco et d\'amande qui persistent comme le dernier jour de vacances.'
        },
        {
          name: 'Tuki-Tuki',
          price: 220,
          ingredients: 'Saké / Fruits de la Passion / Liqueur de Pêche / Falernum / Citron',
          description: 'Un voyage exotique alliant tradition japonaise et épices des Caraïbes, créant une harmonie équilibrée de sucré, d\'acide et d\'umami.'
        }
      ]
    },
    {
      title: 'COCKTAILS CHIRINGUITO',
  items: [
    {
      name: 'Mediterranean Collins',
      price: 160,
      ingredients: 'Gin / Fliou (menthe marocaine) / Lavande / Eau tonique fever tree mediterranean',
      description: 'Un soupir rafraîchissant pour l\'âme'
    },
    {
      name: 'Bloody Tanja',
      price: 160,
      ingredients: 'Vodka / Jus maison de céleri et de tomate / Mélange de sauces / Clarifié',
      description: 'Classique cristallin'
    },
    {
      name: 'Tora Sensai',
      price: 160,
      ingredients: 'Mélange de saké et de cachaça / Sirop maison au wasabi / Citron / Gingembre caramélisé',
      description: 'Délicat, avec une âme féroce'
    },
    {
      name: 'Chebakia',
      price: 160,
      ingredients: 'Liqueur maison de chebakia / Liqueur d\'amande / Miel',
      description: 'Douce maison, mon foyer'
    },
    {
      name: 'Zahara',
      price: 160,
      ingredients: 'Aperol / Cointreau / Carotte / Cardamome / Eau de fleur d\'oranger / Cuillère de Rhumtella',
      description: 'Gorgée de coucher de soleil doré'
    },
    {
      name: 'Ambarina',
      price: 160,
      ingredients: 'Réduction de vin rosé et romarin / Orange / Pêche / Vermouth / Prosecco',
      description: 'Doux, épicé, herbacé, éclat chaleureux'
    },
    {
      name: 'Berber Fire',
      price: 160,
      ingredients: 'Bourbon infusé aux épices et aux pommes rouges / Amaro / Trait d\'eau gazeuse / Parfum d\'agrumes / Olives',
      description: 'Entre la tradition et le désir'
    },
    {
      name: 'Carmesi',
      price: 160,
      ingredients: 'Liqueur de marasquin / Shrub aux fruits rouges gazeux / Cava',
      description: 'Fraîcheur vibrante'
    },
    {
      name: 'Paloma Ajena',
      price: 160,
      ingredients: 'Tequila / Yuzu / Citron / Jus de Pamplemousse / Sel Piquant',
      description: 'Une Paloma exotique avec du yuzu japonais qui ajoute de la complexité au pamplemousse traditionnel, avec une bordure de sel épicé.'
    }
  ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'Detox Chiringuito',
          price: 60,
          ingredients: 'Eau / Citron / Menthe / Concombre / Céleri',
          description: 'Un mélange pur et revigorant qui nettoie et rafraîchit, apportant l\'essence du bien-être dans votre verre.'
        },
        {
          name: 'Amor Narcótico',
          price: 120,
          ingredients: 'Pêche / Pastèque / Herbes',
          description: 'Un mélange rafraîchissant et addictif de fruits à noyau et de melon avec des herbes aromatiques qui rehaussent cette indulgence sans alcool.'
        },
        {
  name: 'Mango Mojito',
  price: 120,
  ingredients: 'Mangue / citron / menthe / eau pétillante',
  description: 'Une version tropicale et exotique d\'un classique'
}
      ]
    },
    {
      title: 'SHOTS PAR MÈTRE',
      items: [
        {
          name: 'Passion Vodka',
          price: 550,
          ingredients: 'Vodka Russe / Fruits de la Passion / Citron',
          description: 'Un shot intense de passion pure, combinant l\'audace de la vodka avec l\'énergie vibrante des fruits de la passion frais.'
        },
        {
          name: 'B52',
          price: 550,
          ingredients: 'Baileys / Liqueur Café / Triple Sec',
          description: 'Un classique à plusieurs couches avec du Baileys crémeux, une riche liqueur de café et du Triple Sec citronné - enflammez-le pour un effet dramatique !'
        },
        {
          name: 'Tequila',
          price: 550,
          ingredients: 'Tequila Camino',
          description: 'Direct, sans chichis - juste le coup de pied audacieux et terreux de la Tequila Camino premium.'
        }
      ]
    },
    {
      title: 'SHOTS',
      items: [
        {
          name: 'Chaouen (x4)',
          price: 160,
          ingredients: 'Sambuca / Blue Curaçao / Vodka Russe / Sirop de Vanille',
        },
        {
          name: 'Te a la Meister (x4)',
          price: 160,
          ingredients: 'Jägermeister / Sirop de Gingembre / Liqueur de Chocolat / Menthe / Rhum Blanc',
          description: 'Un mélange complexe d\'herbes et d\'épices du Jägermeister, complété par du chocolat et de la menthe pour un shot étonnamment équilibré.'
        },
        {
          name: 'Passion (x4)',
          price: 160,
          ingredients: 'Vodka Russe / Fruits de la Passion / Citron',
          description: 'L\'hédonisme tropical pur sous forme de shot - des fruits de la passion vibrants tempérés par des agrumes brillants et une vodka douce.'
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
  Boissons
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-sm tracking-widest uppercase mb-2 font-light"
  style={{ color: 'rgba(129, 113, 94, 0.8)' }}
>
  Préparées avec passion
</motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            Un service de 6% sera ajouté à votre addition.
            <br/>La maison n’accepte que les chèques certifiés.
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