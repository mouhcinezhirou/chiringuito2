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
      title: 'POISSONS',
      subtitle: 'Servis avec accompagnement au choix',
      items: [
        {
          name: 'Tagra (tagine) de poisson',
          price: 340,
          description: 'Notre tagine signature cuit lentement dans sa terrine traditionnelle, où le poisson frais du jour est mijoté avec des tomates, des poivrons colorés, des olives et des épices marocaines aromatiques, créant un plat authentique riche en saveurs méditerranéennes et nord-africaines.',
          note: 'spécialité maison'
        },
        {
          name: 'Tagra (tagine) de crevettes royale',
          price: 800,
          description: 'Un festin luxueux de crevettes royales préparées dans notre tagine maison, mijotées délicatement avec un mélange de safran, d\'ail, de gingembre frais, de coriandre et d\'un soupçon de piment doux. Servi bouillonnant dans sa terrine traditionnelle.',
          note: 'spécialité maison'
        },
        {
          name: 'Saumon grillé',
          price: 340,
          description: 'Filet de saumon premium grillé à la perfection avec une croûte dorée et un intérieur tendre et juteux. Assaisonné simplement d\'herbes fraîches, d\'un filet d\'huile d\'olive et de zeste de citron pour mettre en valeur sa saveur naturelle et délicate.'
        },
        {
          name: 'Espadon grillé',
          price: 260,
          description: 'Steak d\'espadon charnu grillé à la perfection, offrant une texture ferme et une saveur riche mais délicate. Légèrement mariné avec des herbes méditerranéennes, de l\'huile d\'olive et du citron pour rehausser sa fraîcheur marine naturelle.'
        },
        {
          name: 'Sole meunière',
          price: 280,
          description: 'Un classique français préparé avec finesse - filet de sole délicatement poêlé dans un beurre noisette, parfumé à l\'ail et au persil, créant une croûte dorée qui contraste parfaitement avec la chair blanche et tendre du poisson. Accompagné d\'un quartier de citron frais.'
        },
        {
          name: 'Loup grillé',
          price: 280,
          description: 'Bar méditerranéen (loup de mer) grillé entier ou en filet selon disponibilité, avec une peau croustillante et une chair blanche délicate. Préparé simplement avec huile d\'olive, herbes fraîches et sel de mer pour préserver sa saveur naturelle exceptionnelle.'
        },
        {
          name: 'Saint-Pierre grillé',
          price: 290,
          description: 'Ce poisson noble à la chair fine est grillé délicatement pour préserver sa texture délicate et sa saveur subtile. Son goût délicat est rehaussé par un simple assaisonnement d\'herbes fraîches, d\'huile d\'olive extra vierge et d\'une touche de fleur de sel.'
        },
        {
          name: 'Langoustines grillées',
          price: 600,
          description: 'Langoustines fraîches grillées à la perfection, révélant leur chair douce et sucrée. Servies dans leur carapace avec un beurre à l\'ail et aux herbes fait maison qui fond délicatement sur ces crustacés délicats et aromatiques.'
        },
        {
          name: 'Crevettes royales grillées',
          price: 800,
          description: 'Somptueuses crevettes royales de calibre exceptionnel, grillées délicatement pour préserver leur texture ferme et leur goût naturellement sucré. Servies avec une touche d\'huile d\'olive infusée au citron et aux herbes de Provence fraîches.'
        }
      ]
    },
    {
      title: 'VIANDES',
      subtitle: 'Servies avec accompagnement au choix',
      items: [
        {
          name: 'Tagliata de boeuf',
          price: 380,
          description: 'Filet de bœuf tendre tranché finement après cuisson parfaite, servi légèrement rosé et garni de copeaux de parmesan, roquette fraîche et un filet d\'huile d\'olive extra vierge parfumée à la truffe. Un plat d\'inspiration italienne qui met en valeur la qualité exceptionnelle de notre viande.'
        },
        {
          name: 'Filet de boeuf sauté à l\'ail',
          price: 340,
          description: 'Morceaux tendres de filet de bœuf sautés à feu vif avec de l\'ail frais écrasé, créant un contraste parfait entre l\'extérieur caramélisé et l\'intérieur juteux et tendre. Une préparation simple qui célèbre la qualité de notre viande sélectionnée avec soin.'
        },
        {
          name: 'Chich taouk',
          price: 220,
          description: 'Brochettes de poulet mariné dans un mélange traditionnel libanais de yaourt, d\'ail, de citron et d\'épices comme le sumac et le zaatar. Grillées jusqu\'à obtenir une parfaite tendreté avec une légère caramélisation, et servies avec notre sauce aïoli maison aux herbes fraîches.'
        },
        {
          name: 'Entrecôte de Paris',
          price: 320,
          description: 'Entrecôte maturée de première qualité, grillée selon votre préférence et servie avec notre sauce maison au poivre noir concassé, échalotes et cognac. La marbrure parfaite de cette coupe offre une tendreté et une saveur incomparables.'
        },
        {
          name: 'Hamburger (100% fait maison)',
          price: 140,
          description: 'Notre burger signature élaboré avec un steak de bœuf haché à la main, grillé à la perfection et garni de fromage cheddar fondu, d\'oignons lentement caramélisés et de notre sauce secrète légèrement fumée. Le tout servi dans un pain brioché artisanal doré au beurre.'
        },
        {
          name: 'Mini hamburgers au boeuf',
          price: 140,
          description: 'Trio de délicieux mini burgers préparés avec le même soin que notre version classique. Chaque bouchée offre un équilibre parfait entre le bœuf juteux, le cheddar fondant et notre sauce maison crémeuse, le tout dans un petit pain brioché moelleux. Idéal pour partager ou comme entrée généreuse.'
        }
      ]
    },
    {
      title: 'ACCOMPAGNEMENTS',
      items: [
        {
          name: 'Légumes sautés',
          price: 60,
          description: 'Un mélange coloré de légumes de saison finement coupés et sautés rapidement à l\'huile d\'olive avec une touche d\'ail et d\'herbes fraîches. La cuisson préserve leur croquant et leurs saveurs naturelles pour un accompagnement à la fois sain et délicieux.'
        },
        {
          name: 'Purée de pommes de terre',
          price: 60,
          description: 'Purée onctueuse préparée à partir de pommes de terre à chair farineuse, écrasées avec du beurre de baratte et de la crème fraîche. Sa texture veloutée et sa richesse en font le complément parfait pour nos poissons et viandes.'
        },
        {
          name: 'Pommes de terre sautées',
          price: 60,
          description: 'Pommes de terre nouvelles coupées en quartiers et sautées lentement jusqu\'à obtenir un extérieur doré et croustillant avec un intérieur tendre. Parfumées au thym frais et à l\'ail, elles sont l\'accompagnement idéal pour rehausser nos plats principaux.'
        },
        {
          name: 'Pommes frites',
          price: 60,
          description: 'Frites croustillantes préparées dans notre cuisine selon la méthode traditionnelle: coupées à la main, cuites deux fois pour obtenir un extérieur parfaitement doré et un intérieur moelleux, et assaisonnées d\'une pincée de fleur de sel.'
        },
        {
          name: 'Salade verte',
          price: 60,
          description: 'Mélange frais de jeunes pousses et de feuilles croquantes, légèrement assaisonnées d\'une vinaigrette maison à base d\'huile d\'olive extra vierge et de vinaigre balsamique âgé. L\'option parfaite pour un accompagnement léger et rafraîchissant.'
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
            Poissons & Viandes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fraîcheur et qualité
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
              Bon appétit
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default FishMeatMenu;