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
            className="font-serif italic text-xl transition-all duration-300 group-hover:text-amber-800"
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
      <p className="text-neutral-600 text-sm font-light tracking-wide">{description}</p>
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
      title: 'À PARTAGER',
      items: [
        {
          name: 'Huîtres de Dakhla',
          price: '140 / 260',
          description: 'Fraîches et iodées',
          options: '6 unités / 12 unités',
          detailedDescription: 'Joyaux brillants de la côte atlantique de Dakhla, ces huîtres offrent un goût délicatement iodé et une texture crémeuse qui évoquent l\'essence pure de l\'océan à chaque bouchée.'
        },
        {
          name: 'Poivrons "Padron" Frit avec Gros Sel',
          price: 80,
          description: 'Poivrons verts doux légèrement pimentés',
          detailedDescription: 'Un jeu de roulette espagnole où certains sont doux et d\'autres surprennent par leur chaleur, ces petits poivrons frits croustillants sont rehaussés par le craquant du gros sel de mer.'
        },
        {
          name: 'Anchois marinés',
          price: 80,
          description: 'Filets d\'anchois frais marinés dans de l\'huile d\'olive et de l\'ail',
          detailedDescription: 'Une préparation traditionnelle méditerranéenne où la saveur intense des anchois est adoucie par une marinade parfumée à l\'huile d\'olive vierge et à l\'ail, pour une expérience gustative profonde.'
        },
        {
          name: 'Crevettes pop-corn',
          price: 90,
          description: 'Crevettes croustillantes épicées',
          detailedDescription: 'Des bouchées de crevettes enrobées d\'une panure légèrement épicée et frites à la perfection, créant un contraste irrésistible entre le croustillant extérieur et la tendreté juteuse à l\'intérieur.'
        },
        {
          name: 'Tacos de tartare de thon',
          price: 120,
          description: 'Tacos croustillant, thon rouge, mangue, avocat',
          detailedDescription: 'Une fusion élégante de saveurs où le thon rouge cru rencontre la douceur exotique de la mangue et l\'onctuosité de l\'avocat, le tout enveloppé dans l\'étreinte croustillante d\'un tacos artisanal.'
        },
        {
          name: 'Tacos de crevettes',
          price: 120,
          description: 'Tacos croustillant farcis d\'un mélange de crevettes grillées, avocat, tomates, oignons avec une vinaigrette légèrement épicée',
          detailedDescription: 'La mer et la terre s\'unissent dans ces tacos où les crevettes jutteuses rencontrent la fraîcheur des légumes et l\'onctuosité de l\'avocat, relevés par une vinaigrette qui éveille délicatement les papilles.'
        },
        {
          name: 'Hummus',
          price: 120,
          description: 'Crème de pois chiches à la libanaise',
          detailedDescription: 'Une recette ancestrale du Moyen-Orient transformant les pois chiches en une crème soyeuse, où l\'équilibre entre le tahini, le citron et l\'huile d\'olive crée une symphonie de saveurs.'
        },
        {
          name: 'Pommes de terre alioli',
          price: 70,
          description: 'Pommes de terre frites avec mayonnaise à l\'ail',
          detailedDescription: 'Une tapas espagnole incontournable où la chaleur des pommes de terre dorées rencontre la fraîcheur d\'une aïoli crémeuse infusée d\'ail, pour un contraste de températures et de textures réconfortant.'
        },
        {
          name: 'Batata harra',
          price: 60,
          description: 'Pommes de terre frites avec du piment, de la coriandre, du citron et de l\'ail',
          detailedDescription: 'Un voyage au Liban en une bouchée, où les pommes de terre croustillantes dansent avec la chaleur des piments, la fraîcheur du citron et les notes aromatiques de la coriandre.'
        },
        {
          name: 'Assiette de fromages',
          price: 180,
          description: 'Sélection de fromages variés',
          detailedDescription: 'Un plateau curated avec passion présentant des fromages de caractère, allant des plus doux aux plus affinés, accompagnés de condiments qui en rehaussent les notes complexes.'
        },
        {
          name: 'Salade Russe',
          price: 70,
          description: 'Pommes de terre, carottes, oeufs, petits pois, thon, mayonnaise',
          detailedDescription: 'Une préparation nostalgique où les légumes croquants et le thon se marient dans une étreinte crémeuse de mayonnaise, créant un équilibre parfait entre richesse et fraîcheur.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Fèves de soja cuites à la vapeur avec du sel marin et mariné à l\'ail',
          detailedDescription: 'Petits trésors verts du Japon, ces fèves de soja en cosses sont rehaussées par le sel marin et l\'ail, offrant une expérience tactile et gustative à la fois ludique et satisfaisante.'
        },
        {
          name: 'Tortilla espagnole',
          price: 70,
          description: 'Omelette aux pommes de terre',
          detailedDescription: 'Un classique espagnol réinterprété avec des pommes de terre fondantes et des œufs moelleux, cuits lentement pour créer cette texture distinctive qui fond en bouche, entre solide et onctueux.'
        },
        {
          name: 'Croquettes de fruits de mer',
          price: 80,
          description: 'Béchamel crémeuse aux fruits de mer',
          detailedDescription: 'Des bouchées dorées et croustillantes qui révèlent un cœur tendre de béchamel enrichie de fruits de mer délicats, capturant l\'essence de la Méditerranée dans chaque morsure.'
        },
        {
          name: 'Croquettes de poulet et champignon',
          price: 80,
          description: 'Poulet tendre et champignons aromatiques',
          detailedDescription: 'La rencontre du poulet fondant et des champignons terreux dans une béchamel veloutée, le tout enveloppé d\'une chapelure dorée qui craque joyeusement sous la dent.'
        },
        {
          name: 'Crunchi-champignons avec sauce tartare',
          price: 100,
          description: 'Champignons panés marinés et piquants avec sauce tartare',
          detailedDescription: 'Des champignons rendus addictifs par une marinade épicée et une panure croustillante, accompagnés d\'une sauce tartare maison qui équilibre parfaitement leur caractère audacieux.'
        },
        {
          name: 'Champignons à l\'ail',
          price: 100,
          description: 'Champignons, huile d\'olive ail et persil',
          detailedDescription: 'La simplicité à son apogée, où les champignons juteux absorbent l\'essence de l\'ail doré et le parfum du persil frais, le tout enrobé d\'une huile d\'olive fruitée de première pression.'
        },
        {
          name: 'Palourdes à l\'ail',
          price: 140,
          description: 'Palourdes, huile d\'olive et persil',
          detailedDescription: 'Ces coquillages délicats s\'ouvrent pour révéler leur chair tendre, baignée dans un élixir d\'huile d\'olive infusée à l\'ail et parsemée de persil frais - un hommage à la mer.'
        },
        {
          name: 'Crevettes à l\'ail',
          price: 140,
          description: 'Dans une huile d\'olive épicée',
          detailedDescription: 'Des crevettes juteuses sautées dans une huile d\'olive ardente qui capture toute l\'essence de l\'ail et du piment, créant un jus irrésistible qui appelle à être savouré avec du pain.'
        },
        {
          name: 'Calamars frits "Style andalouse"',
          price: 160,
          description: 'Calamars frits avec farine andalouse',
          detailedDescription: 'L\'art andalou de la friture dans toute sa splendeur, avec des anneaux de calamars tendres enrobés d\'une pâte légère et croustillante, servis avec un zeste de citron pour réveiller les saveurs.'
        },
        {
          name: 'Petits calamars grillés',
          price: 220,
          description: 'Avec de la salade, de l\'huile d\'olive et de l\'ail',
          detailedDescription: 'De petits calamars entiers grillés à la perfection, conservant leur tendreté naturelle et relevés par l\'alliance subtile de l\'ail et de l\'huile d\'olive sur un lit de salade fraîche.'
        },
        {
          name: 'Vitello tonnato',
          price: 160,
          description: 'Fines tranches de veau dans une mayonnaise onctueuse au thon, servies avec des câpres',
          detailedDescription: 'Une élégance italienne classique où la délicatesse du veau rosé se marie à la richesse de la sauce au thon, ponctuée par les éclats salés des câpres et l\'acidité du citron.'
        },
        {
          name: 'Poulpe à la galicienne',
          price: 160,
          description: 'Poulpe cuit sur une purée de pommes de terre',
          detailedDescription: 'Une spécialité du nord de l\'Espagne où le poulpe tendre repose sur un lit de pommes de terre veloutées, le tout généreusement arrosé d\'huile d\'olive et saupoudré de paprika fumé.'
        }
      ]
    },
    {
      title: 'SALADES',
      items: [
        {
          name: 'Salade César – Classique –',
          price: 140,
          description: 'Laitue romaine, poulet grillé, anchois, tomates, oeuf, croûtons de pain, copeaux de parmesan et sauce césar',
          detailedDescription: 'L\'emblématique salade réinventée avec du poulet juteux et tous les ingrédients qui en ont fait sa renommée, rehaussée par notre sauce césar maison au parfait équilibre entre crème et umami.'
        },
        {
          name: 'Salade Arc-en-ciel',
          price: 120,
          description: 'Laitue, légumes, thon, oeufs, anchois',
          detailedDescription: 'Un tableau coloré et nutritif où chaque bouchée offre une combinaison différente de saveurs et de textures, du croquant des légumes frais à la richesse du thon et des œufs.'
        },
        {
          name: 'Salade Grecque',
          price: 140,
          description: 'Tomates, poivrons, oignons, concombre, feta',
          detailedDescription: 'Une évasion vers les îles grecques dans chaque bouchée, où la fraîcheur des légumes gorgés de soleil se marie à la salinité de la feta et à la douceur des herbes méditerranéennes.'
        },
        {
          name: 'Salade de crabe bleu TANGEROIS',
          price: 130,
          description: 'Chiffonnade fine de salade romaine, 100gr chair de crabe et mayonnaise',
          detailedDescription: 'Notre signature locale où la délicatesse de la chair de crabe bleu s\'épanouit sur un lit de romaine croquante, le tout enveloppé d\'une mayonnaise aérienne aux notes citronnées subtiles.'
        },
        {
          name: 'Salade Chiringuito (fruits de mer)',
          price: 140,
          description: 'Salade, avocat, mélange de fruits de mer et une sauce cocktail',
          detailedDescription: 'Notre création emblématique qui capture l\'essence même de notre établissement - une généreuse portion de fruits de mer frais rencontrant l\'avocat crémeux sur un lit de verdure croquante.'
        },
        {
          name: 'Salade de Poulpe',
          price: 160,
          description: 'Poulpe, pommes de terres, poivrons grillés, persil, huile, sel',
          detailedDescription: 'Le poulpe tendre et charnu s\'unit aux pommes de terre fondantes et aux poivrons fumés dans une danse d\'huile d\'olive parfumée au persil frais - une véritable ode à la Méditerranée.'
        },
        {
          name: 'Salade burrata et tomates',
          price: 160,
          description: 'Servie avec des tomates et notre pesto fait maison',
          detailedDescription: 'Le contraste parfait entre la burrata crémeuse au cœur coulant et les tomates gorgées de soleil, magnifié par notre pesto artisanal aux notes de basilic fraîchement cueilli.'
        },
        {
          name: 'Salade de chèvre chaud',
          price: 140,
          description: 'Roquette, fromage de chèvre, crème balsamique, framboises confits',
          detailedDescription: 'La chaleur du fromage de chèvre fondant se marie à la fraîcheur poivrée de la roquette, tandis que les framboises confites apportent une note sucrée-acidulée qui danse avec le vinaigre balsamique.'
        },
        {
          name: 'Carpaccio de tomates avec thon',
          price: 140,
          description: 'Tomates fines et thon premium',
          detailedDescription: 'Des tranches de tomates d\'une finesse extrême qui se parent de thon délicat, le tout arrosé d\'une huile d\'olive fruitée et parsemé d\'herbes fraîches pour un plat d\'une élégante simplicité.'
        },
        {
          name: 'Emincé de thon rouge sautée sur un lit de poivrons grillés',
          price: 140,
          description: 'Thon saisi avec légèreté',
          detailedDescription: 'Le thon rouge brièvement saisi pour préserver sa tendreté naturelle, posé sur un lit de poivrons au goût fumé qui complète parfaitement la richesse du poisson sans jamais le dominer.'
        },
        {
          name: 'Carpaccio de boeuf',
          price: 140,
          description: 'Fines tranches de bœuf cru',
          detailedDescription: 'Des tranches de bœuf d\'une finesse extraordinaire, joliment disposées et assaisonnées d\'huile d\'olive première pression, de parmesan affiné et de câpres qui en rehaussent le goût délicat.'
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
            Entrées & Salades
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fraîcheur et saveurs
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
              Bon appétit
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default StartersMenu;