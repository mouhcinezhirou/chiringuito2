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
            <span className="text-xs text-neutral-500 font-light">({pieces} pièces)</span>
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
      title: 'POUR COMMENCER',
      items: [
        {
          name: 'Nems au Poulet',
          price: 160,
          description: 'Poulet, champignons chinois, vermicelles, feuille de riz frite',
          details: 'Un classique revisité avec finesse – nos nems croustillants révèlent un cœur tendre où le poulet s\'entrelace aux champignons dans une danse de saveurs, enveloppés dans une feuille de riz qui craque à chaque bouchée.'
        },
        {
          name: 'Spicy Ebi Fry',
          price: 150,
          description: 'Crevettes frites, mayonaise picante',
          details: 'Des crevettes capturées à l\'aube, enrobées d\'une panure légère aux épices secrètes, puis frites à perfection. Servies avec notre mayonnaise piquante maison qui enflamme délicatement les papilles sans les brûler.'
        }
      ]
    },
    {
      title: 'ROLLS',
      note: '(8 pièces par roll sauf indication contraire)',
      items: [
        {
          name: 'Spicy Tuna Roll',
          price: 160,
          description: 'Tartare de thon rouge piquant, thon rouge frais, mayonnaise au wasabi',
          details: 'Une double expérience de thon – cru et en tartare – relevée par une touche de piment qui éveille les sens sans masquer la noblesse de ce poisson. La mayonnaise au wasabi ajoute une dimension crémeuse avec une finale qui monte en puissance.'
        },
        {
          name: 'Spicy Salmon Roll',
          price: 160,
          description: 'Tartare de saumon piquant, saumon frais, mayonnaise au sriracha',
          details: 'La tendresse onctueuse du saumon rencontre l\'audace du sriracha dans ce roll qui joue sur les contrastes. Chaque bouchée révèle progressivement sa complexité, commençant par la douceur et terminant sur une agréable chaleur épicée.'
        },
        {
          name: 'Tropical Crab Roll',
          price: 160,
          description: 'Tartare de crabe, avocat, mangue de saison',
          details: 'Un voyage tropical en huit bouchées où la chair délicate du crabe s\'unit au beurre végétal de l\'avocat, tandis que la mangue apporte une touche solaire qui illumine l\'ensemble avec sa douce acidité exotique.'
        },
        {
          name: 'Salmon Avocado California Roll',
          price: 180,
          description: 'Saumon frais, saumon fumé, avocat, fromage frais',
          details: 'Un dialogue entre deux expressions du saumon – la fraîcheur crue et la profondeur fumée – harmonisé par la richesse crémeuse de l\'avocat et la légèreté du fromage frais. Notre interprétation d\'un classique californien avec une touche méditerranéenne.'
        },
        {
          name: 'Shrimp Green Roll',
          price: 180,
          description: 'Crevettes frites, tartare de concombre et avocat, sésame grillé, mayonnaise piquante',
          details: 'La texture croustillante des crevettes dorées se marie à la fraîcheur herbacée du tartare vert dans ce roll vivifiant. Les graines de sésame torréfiées ajoutent des notes noisettées qui dansent avec la chaleur subtile de la mayonnaise.'
        },
        {
          name: 'Crispy Chicken Roll',
          price: 180,
          description: 'Poulet tempura, fromage frais, oignons caramélisés, mayonnaise piquante, oignons frits',
          details: 'Une création fusion audacieuse où le croustillant du poulet tempura rencontre la douceur sucrée-salée des oignons caramélisés. Une double texture d\'oignons et une mayonnaise épicée créent un roll aux saveurs réconfortantes et complexes.'
        },
        {
          name: 'Chiringuito Roll',
          price: 190,
          description: 'Thon rouge, crevette tempura, saumon frais, crabe d\'Asilah, fromage frais, ciboulette',
          details: 'Notre signature ultime – un quatuor marin d\'exception où chaque ingrédient préserve son caractère tout en formant une symphonie harmonieuse. Le crabe d\'Asilah, pêché à la main, apporte une douceur iodée que la fraîcheur de la ciboulette sublime.'
        }
      ]
    },
    {
      title: 'CRUNCHY ASIAN',
      items: [
        {
          name: 'Crunchy Roll',
          price: 140,
          description: 'Crevette, avocat, fromage frais, tobiko, teriyaki, mayonnaise piquante',
          pieces: 8,
          details: 'La quintessence du contraste: le craquant extérieur cède place à un cœur tendre où les crevettes dansent avec l\'avocat. Les œufs de poisson éclatent en bouche comme des bulles de saveur marine, pendant que les sauces entrelacent leurs notes sucrées et épicées.'
        },
        {
          name: 'Dragon Roll',
          price: 160,
          description: 'Saumon, fromage frais, sauce piquante, tobiko, teriyaki, ciboulette',
          pieces: 8,
          details: 'Inspiré du légendaire dragon asiatique, ce roll sinueux capture sa force et sa grâce. Le saumon, tel des écailles précieuses, enveloppe un cœur crémeux vibrant d\'épices, tandis que le tobiko ajoute une dimension tactile évoquant le feu du dragon.'
        },
        {
          name: 'Pizza Sushi Saumon',
          price: 160,
          description: 'Saumon, avocat, fromage frais, tobiko, mayonnaise piquante, teriyaki',
          details: 'Une fusion audacieuse entre l\'Italie et le Japon – notre disque de riz croustillant évoque la pizza, garni généreusement de saumon velouté et d\'avocat. Les sauces s\'entrelacent en spirales artistiques, créant un tableau gustatif unique.'
        }
      ]
    },
    {
      title: 'NIGIRI',
      note: '(8 pièces par commande sauf indication contraire)',
      items: [
        {
          name: 'Nigiri Thon Rouge',
          price: 180,
          description: 'Tranches de thon rouge sur riz à sushi pressé',
          details: 'La noblesse marine à l\'état pur – notre thon rouge, sélectionné pour sa couleur profonde et sa texture soyeuse, repose majestueusement sur un oreiller de riz parfumé. Un dialogue minimaliste entre deux ingrédients d\'exception.'
        },
        {
          name: 'Nigiri Saumon',
          price: 180,
          description: 'Tranches de saumon frais sur riz à sushi pressé',
          details: 'Des lamelles de saumon d\'une tendreté incomparable, coupées avec précision pour révéler leur marbrure délicate. Sur le riz, elles fondent lentement, libérant leurs huiles essentielles qui se marient au vinaigre subtil du riz.'
        },
        {
          name: 'Nigiri Loup',
          price: 180,
          description: 'Tranches de loup délicates sur riz à sushi pressé',
          details: 'La finesse incarnée – notre loup de Méditerranée offre une chair nacrée d\'une délicatesse exceptionnelle. Sa saveur pure et élégante est mise en valeur par la simplicité du riz, créant une expérience d\'une pureté zen.'
        },
        {
          name: 'Nigiri Crevette',
          price: 140,
          description: 'Crevettes cuites sur riz à sushi pressé',
          details: 'Nos crevettes sont délicatement cuites pour préserver leur texture rebondissante et leur douceur naturelle. Posées comme des joyaux roses sur leur socle de riz, elles offrent un contraste de température qui amplifie leurs arômes marins.'
        },
        {
          name: 'Sélection de Nigiris',
          price: 180,
          description: 'Thon rouge, saumon, crevette & loup',
          details: 'Un quatuor harmonieux qui célèbre la diversité des saveurs marines – du puissant thon rouge à la délicatesse du loup, en passant par le crémeux du saumon et la douceur des crevettes. Une dégustation complète servie dans l\'ordre idéal.'
        }
      ]
    },
    {
      title: 'SASHIMI & TATAKI',
      items: [
        {
          name: 'Sashimi Thon Rouge',
          price: 220,
          description: 'Tranches fraîches de thon rouge premium',
          details: 'Des rubis marins découpés avec la précision d\'un artisan joaillier. Notre thon, sélectionné pour sa qualité exceptionnelle, est tranché en lamelles parfaites qui célèbrent sa texture ferme et sa saveur profonde, relevée par une simple touche de wasabi véritable.'
        },
        {
          name: 'Sashimi Saumon',
          price: 220,
          description: 'Tranches fraîches de saumon de haute qualité',
          details: 'Des pétales d\'un corail délicat – notre saumon est découpé en fines tranches qui captent la lumière comme des vitraux. Sa chair fondante libère une richesse beurrée et une délicate saveur marine qui évoque les eaux froides dont il provient.'
        },
        {
          name: 'Sashimi Loup',
          price: 220,
          description: 'Tranches fraîches de loup délicat',
          details: 'L\'essence même de la subtilité marine – notre loup de ligne est présenté en tranches transparentes qui révèlent sa chair immaculée. Sa saveur délicate, presque sucrée, est un hymne à la pureté des fonds sablonneux méditerranéens.'
        },
        {
          name: 'Rainbow Sashimi',
          price: 220,
          description: 'Assortiment de thon rouge, saumon et loup',
          details: 'Une palette chromatique qui ravit autant les yeux que les papilles – du rouge profond du thon au orange lumineux du saumon jusqu\'au blanc nacré du loup. Chaque variété est disposée avec art pour créer un dégradé marin enchanteur.'
        },
        {
          name: 'Tataki Thon Rouge',
          price: 240,
          description: 'Thon rouge saisi avec assaisonnement léger',
          details: 'Un équilibre parfait entre cru et cuit – notre thon est brièvement saisi sur une flamme vive pour caraméliser sa surface tout en préservant son cœur cru. Cette alchimie thermique révèle de nouvelles dimensions aromatiques, rehaussées par notre marinade secrète.'
        },
        {
          name: 'Tataki Saumon',
          price: 240,
          description: 'Saumon saisi avec assaisonnement léger',
          details: 'La métamorphose du saumon – la chaleur furtive transforme sa surface en un voile doré qui scelle les huiles précieuses à l\'intérieur. Notre assaisonnement aux agrumes et sésame amplifie sa richesse naturelle, créant un contraste fascinant entre extérieur et intérieur.'
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
            Menu Sushi Asiatique
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Frais & Délicieux
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
              Bon appétit
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default SushiMenu;