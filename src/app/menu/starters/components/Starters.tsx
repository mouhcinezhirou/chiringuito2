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
          name: 'Trio de tapenades d’olives',
          price: 95,
          description: 'Déclinaison d’olives vertes, d’olives noires et d’olives délicatement parfumées à l’harissa',
          detailedDescription: 'Olives soigneusement sélectionnées et finement travaillées pour offrir trois saveurs uniques : la fraîcheur des olives vertes, la richesse des olives noires et le piquant subtil des olives à l’harissa. Une symphonie méditerranéenne délicate et raffinée, qui ravira les amateurs de saveurs authentiques.'
        },
        {
          name: 'Anchois Marinés',
          price: 80,
          description: 'Filets d\'anchois frais marinés dans de l\'huile d\'olive et de l\'ail',
          detailedDescription: 'Une préparation traditionnelle méditerranéenne où la saveur intense des anchois est adoucie par une marinade parfumée à l\'huile d\'olive vierge et à l\'ail, pour une expérience gustative profonde.'
        },
        {
          name: 'Crevettes Pop-corn',
          price: 160,
          description: 'Crevettes croustillantes épicées',
          detailedDescription: 'Des bouchées de crevettes enrobées d\'une panure légèrement épicée et frites à la perfection, créant un contraste irrésistible entre le croustillant extérieur et la tendreté juteuse à l\'intérieur.'
        },
        {
          name: 'Tacos de Tartare de Thon',
          price: 160,
          description: 'Tacos croustillant, mousse d’avocat maison, mangue fraîche, thon rouge et échalotes frites.',
          detailedDescription: 'Le thon rouge de première qualité s’allie à la douceur exotique de la mangue fraîche et à l’onctuosité d’une mousse d’avocat maison. Le tout est rehaussé par le croquant délicat des échalotes frites et servi dans un taco maison croustillant, offrant un jeu subtil de textures et de saveurs raffinées.'
        },
        {
          name: 'Tacos de Crevettes',
          price: 140,
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
          name: 'Pommes de Terre Alioli',
          price: 70,
          description: 'Pommes de terre dorées servies avec une aïoli maison délicatement parfumée à l’ail.',
          detailedDescription: 'Une tapas espagnole emblématique où les pommes de terre dorées à la perfection se mêlent à l’onctuosité d’une aïoli maison subtilement infusée à l’ail, offrant un contraste délicat de textures et de saveurs raffinées.'
        },
        {
          name: 'Batata Harra',
          price: 60,
          description: 'Pommes de terre frites avec du piment, de la coriandre, du citron et de l\'ail',
          detailedDescription: 'Un voyage au Liban en une bouchée, où les pommes de terre croustillantes dansent avec la chaleur des piments, la fraîcheur du citron et les notes aromatiques de la coriandre.'
        },
        {
          name: 'Assiette de Fromages',
          price: 180,
          description: 'Sélection de fromages variés',
          detailedDescription: 'Un plateau curated avec passion présentant des fromages de caractère, allant des plus doux aux plus affinés, accompagnés de condiments qui en rehaussent les notes complexes.'
        },
        {
          name: 'Salade Russe',
          price: 90,
          description: 'Pommes de terre, carottes, oeufs, haricot vert, thon, mayonnaise',
          detailedDescription: 'Une préparation nostalgique où les légumes croquants et le thon se marient dans une étreinte crémeuse de mayonnaise, créant un équilibre parfait entre richesse et fraîcheur.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Fèves de soja cuites à la vapeur avec du sel marin et mariné à l\'ail',
          detailedDescription: 'Petits trésors verts du Japon, ces fèves de soja en cosses sont rehaussées par le sel marin et l\'ail, offrant une expérience tactile et gustative à la fois ludique et satisfaisante.'
        },
        {
          name: 'Tortilla Espagnole',
          price: 90,
          description: 'Omelette aux pommes de terre',
          detailedDescription: 'Un classique espagnol réinterprété avec des pommes de terre fondantes et des œufs moelleux, cuits lentement pour créer cette texture distinctive qui fond en bouche, entre solide et onctueux.'
        },
        {
          name: 'Croquettes de Fruits de Mer',
          price: 80,
          description: 'Béchamel crémeuse aux fruits de mer',
          detailedDescription: 'Des bouchées dorées et croustillantes qui révèlent un cœur tendre de béchamel enrichie de fruits de mer délicats, capturant l\'essence de la Méditerranée dans chaque morsure.'
        },
        {
          name: 'Croquettes de Poulet et Champignon',
          price: 80,
          description: 'Poulet tendre et champignons aromatiques',
          detailedDescription: 'La rencontre du poulet fondant et des champignons terreux dans une béchamel veloutée, le tout enveloppé d\'une chapelure dorée qui craque joyeusement sous la dent.'
        },
        {
          name: 'Crunchi-Champi',
          price: 100,
          description: 'Champignons panés marinés et frits avec une sauce tartare',
          detailedDescription: 'Des champignons rendus addictifs par une marinade épicée et une panure croustillante, accompagnés d\'une sauce tartare maison qui équilibre parfaitement leur caractère audacieux.'
        },
        {
          name: 'Champignons à L\'Ail',
          price: 100,
          description: 'Champignons, huile d\'olive ail et persil',
          detailedDescription: 'La simplicité à son apogée, où les champignons juteux absorbent l\'essence de l\'ail doré et le parfum du persil frais, le tout enrobé d\'une huile d\'olive fruitée de première pression.'
        },
        {
          name: 'Palourdes à L\'Ail',
          price: 140,
          description: 'Palourdes, huile d\'olive et persil',
          detailedDescription: 'Ces coquillages délicats s\'ouvrent pour révéler leur chair tendre, baignée dans un élixir d\'huile d\'olive infusée à l\'ail et parsemée de persil frais - un hommage à la mer.'
        },
        {
          name: 'Crevettes à L\'Ail',
          price: 140,
          description: 'Dans une huile d\'olive épicée',
          detailedDescription: 'Des crevettes juteuses sautées dans une huile d\'olive ardente qui capture toute l\'essence de l\'ail et du piment, créant un jus irrésistible qui appelle à être savouré avec du pain.'
        },
        {
          name: 'Calamars Frits "Style Andalouse"',
          price: 160,
          description: 'Calamars frits avec farine andalouse',
          detailedDescription: 'L\'art andalou de la friture dans toute sa splendeur, avec des anneaux de calamars tendres enrobés d\'une pâte légère et croustillante, servis avec un zeste de citron pour réveiller les saveurs.'
        },
        {
          name: 'Petits Calamars Grillés',
          price: 220,
          description: 'Avec de la salade, de l\'huile d\'olive et de l\'ail',
          detailedDescription: 'De petits calamars entiers grillés à la perfection, conservant leur tendreté naturelle et relevés par l\'alliance subtile de l\'ail et de l\'huile d\'olive sur un lit de salade fraîche.'
        },
        {
          name: 'Vitello Tonnato',
          price: 160,
          description: 'Fines tranches d’entrecôte rôtie, nappées d’une sauce onctueuse au thon et parsemées de câpres, tomates cerises et copeaux de parmesan.',
          detailedDescription: 'Une interprétation raffinée de l’élégance italienne, où l’entrecôte rôtie tranchée finement se mêle à la richesse onctueuse de la sauce au thon. Les câpres, les tomates cerises et les copeaux de parmesan apportent fraîcheur, notes salées et texture, pour un équilibre délicat et savoureux.'
        },
        {
          name: 'Poulpe à la Galicienne',
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
          price: 160,
          description: 'Laitue romaine, poulet grillé, tomates cerises, anchois marinés, œuf, câpres, croûtons dorés et parmesan en copeaux, accompagnés d’une sauce César maison.',
          detailedDescription: 'Laitue romaine croquante, poulet grillé et tomates cerises juteuses, relevés par des anchois marinés et des câpres délicatement assaisonnés. Les croûtons dorés et les copeaux de parmesan apportent texture et richesse, tandis que notre sauce César maison, onctueuse et savoureuse, lie l’ensemble pour offrir une expérience à la fois classique et gourmande.'
        },
        {
          name: 'Salade Arc-en-ciel',
          price: 120,
          description: 'Salade romaine et mesclun, carottes, concombre, oignons, poivrons rouges, verts et jaunes, tomates cerises, thon, œufs et anchois.',
          detailedDescription: 'Un véritable tableau de couleurs et de saveurs, où les légumes frais croquants rencontrent la richesse du thon et des œufs. Chaque bouchée offre un équilibre harmonieux de textures et de goûts, pour une expérience légère, saine et raffinée.'
        },
        {
          name: 'Salade Grecque',
          price: 140,
          description: 'Tomates, Poivrons, Oignons, Concombre, Feta',
          detailedDescription: 'Une évasion vers les îles grecques dans chaque bouchée, où la fraîcheur des légumes gorgés de soleil se marie à la salinité de la feta et à la douceur des herbes méditerranéennes.'
        },
        {
          name: 'Salade de Crabe Bleu Tangerois',
          price: 130,
          description: 'Chiffonnade fine de salade romaine, 100gr chair de crabe et mayonnaise',
          detailedDescription: 'Notre signature locale où la délicatesse de la chair de crabe bleu s\'épanouit sur un lit de romaine croquante, le tout enveloppé d\'une mayonnaise aérienne aux notes citronnées subtiles.'
        },
        {
          name: 'Salade Chiringuito',
          price: 140,
          description: 'Salade croquante, avocat en fines lamelles, crevettes, poulpe, calamars et saumon fumé, le tout sublimé par une sauce cocktail maison.',
          detailedDescription: 'Notre salade signature met en valeur la fraîcheur et la finesse des fruits de mer : crevettes, poulpe, calamars et saumon fumé se marient à l’onctuosité de l’avocat et au croquant des feuilles de salade. Subtilement relevée par notre sauce cocktail maison, elle offre un équilibre raffiné de textures et de saveurs.'
        },
        {
          name: 'Salade Fraîche de Poulpe',
          price: 180,
          description: 'Poulpe tendre, tomates fraîches, brunoise de poivrons rouges, jaunes et verts, échalote et coriandre, délicatement assaisonnés d’un filet d’huile d’olive, de jus de citron frais et d’une pincée de fleur de sel',
          detailedDescription: 'Le poulpe tendre et fondant s’allie au croquant des poivrons multicolores et à la douceur juteuse des tomates cerises. Parfumée à la coriandre fraîche et relevée d’un filet d’huile d’olive de première qualité et d’une pincée de de fleur de sel, cette salade offre une harmonie de saveurs méditerranéennes délicates et rafraîchissantes.'
        },
        {
          name: 'Salade Burrata',
          price: 160,
          description: 'Servie avec des tomates, Pesto fait maison, et crème balsamique',
          detailedDescription: 'Le contraste parfait entre la burrata crémeuse au cœur coulant et les tomates gorgées de soleil, magnifié par notre pesto artisanal aux notes de basilic fraîchement cueilli.'
        },
        {
          name: 'Salade de Chèvre',
          price: 160,
          description: 'Salade romaine et mesclun croquants, fromage de chèvre frais, deux crottins de chèvre frits, noix, figues séchées et pignons de pin, sublimés par une crème balsamique et une touche de confiture de framboises.',
          detailedDescription: 'La douceur fondante du fromage de chèvre et des crottins frits se mêle à la fraîcheur croquante de la salade romaine et du mesclun, tandis que les framboises confites et la crème balsamique apportent des notes sucrées et acidulées, créant une harmonie délicate et raffinée de saveurs.'
        },
        {
          name: 'Carpaccio de Tomates avec Thon',
          price: 140,
          description: 'Tomates fines et thon premium',
          detailedDescription: 'Des tranches de tomates d\'une finesse extrême qui se parent de thon délicat, le tout arrosé d\'une huile d\'olive fruitée et parsemé d\'herbes fraîches pour un plat d\'une élégante simplicité.'
        },
        {
          name: 'Salade Tomate, Avocat, Oignon, Thon',
          price: 140,
          description: 'Fines tranches de tomates, thon premium, avocat en délicates lamelles et oignons finement émincés, le tout sublimé d’un filet d’huile d’olive et d’une pointe de fleur de sel',
          detailedDescription: 'Les fines tranches de tomates s’allient au thon de qualité supérieure et à l’avocat en délicates lamelles, tandis que les oignons finement émincés apportent une touche subtile. Le tout est relevé par un filet d’huile d’olive vierge et une pointe de fleur de sel, offrant un équilibre frais, raffiné et délicatement parfumé.'
        },
        {
          name: 'Carpaccio de Boeuf',
          price: 140,
          description: 'Fines tranches de bœuf cru, copeaux de parmesan, câpres, sauce pesto, huile d’olive, fleur de sel et pignons de pin.',
          detailedDescription: 'Des tranches de bœuf d’une finesse exceptionnelle, délicatement disposées et sublimées par un filet d’huile d’olive première pression, des copeaux de parmesan affiné et des câpres qui en accentuent le goût délicat. La touche de pesto maison et les pignons de pin ajoutent fraîcheur et texture, pour une expérience raffinée et équilibrée.'
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