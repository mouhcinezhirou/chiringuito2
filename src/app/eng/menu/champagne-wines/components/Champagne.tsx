'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price?: number;
  glassPrice?: number;
  bottlePrice?: number;
  halfBottlePrice?: number;
  description?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const WineMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price,
  glassPrice,
  bottlePrice,
  halfBottlePrice,
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
      className="border-b border-amber-100 py-1.5 cursor-pointer group"
      whileHover={{ x: 4 }}
      onClick={onExpand}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-6 pr-2">
          <h3 
            className="font-serif text-sm md:text-base transition-all duration-300 group-hover:text-amber-800"
            style={{ 
              color: '#81715E',
              display: 'block',
              whiteSpace: 'normal',
              overflow: 'visible',
              lineHeight: '1.2',
              minHeight: '1.2em'
            }}
          >
            {name}
          </h3>
        </div>
        
        <div className="col-span-2 text-right pr-1 sm:pr-2">
          <span className="text-[#81715E] font-light text-xs">{bottlePrice || '—'}</span>
        </div>
        
        <div className="col-span-2 text-right pr-1 sm:pr-2">
          <span className="text-[#81715E] font-light text-xs">{halfBottlePrice || '—'}</span>
        </div>
        
        <div className="col-span-2 text-right">
          <span className="text-[#81715E] font-light text-xs">{glassPrice || '—'}</span>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pl-4"
          >
            <p className="text-neutral-500 italic text-sm pl-4 border-l-2 border-amber-200">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {description && (
        <div className="mt-2 text-xs text-amber-700 opacity-70 flex items-center pl-4">
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

const WineMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
      className="bg-white bg-opacity-60 backdrop-blur-sm p-3 md:p-6 rounded-lg shadow-sm"
    >
      <h2 
        className="text-lg md:text-xl font-serif tracking-wide mb-4 pb-2 border-b relative"
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
      
      <div className="grid grid-cols-12 mb-2 pb-1 border-b border-amber-200 relative">
        <div className="col-span-6"></div>
        <div className="col-span-2 text-right pr-1 sm:pr-2">
          <span className="text-xs font-medium text-amber-800">75cl</span>
        </div>
        <div className="col-span-2 text-right sm:pr-2">
          <span className="text-xs font-medium text-amber-800">37.5cl</span>
        </div>
        <div className="col-span-2 text-right">
          <span className="text-xs font-medium text-amber-800">Glass</span>
        </div>
      </div>
      
      <div>
        {items.map((item, index) => (
          <WineMenuItem
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

const WineMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'CHAMPAGNE & PROSECCO',
      items: [
        {
          name: 'Martini Prosecco',
          glassPrice: 100,
          bottlePrice: 1200
        },
        {
          name: 'Laurent Perrier Brut',
          bottlePrice: 2000
        },
        {
          name: 'Laurent Perrier Rosé',
          bottlePrice: 2900
        },
        {
          name: 'Laurent Perrier Blanc de Blanc',
          bottlePrice: 2900
        },
        {
          name: 'Laurent Perrier Brut Magnum',
          bottlePrice: 3600
        },
        {
          name: 'Ruinart Blanc de Blanc',
          bottlePrice: 3900
        },
        {
          name: 'Dom Perignon',
          bottlePrice: 7000
        },
        {
          name: 'Dom Perignon Rosé',
          bottlePrice: 15000
        }
      ]
    },
    {
      title: 'MOROCCAN WHITE WINES',
      items: [
        {
          name: 'Beauvallon',
          bottlePrice: 290,
          glassPrice: 80
        },
        {
          name: 'Médaillon',
          bottlePrice: 340,
          halfBottlePrice: 180,
          glassPrice: 100
        },
        {
          name: 'S de Siroua',
          bottlePrice: 390
        },
        {
          name: 'CB Signature',
          bottlePrice: 450
        },
        {
          name: 'Château Roslane AOC',
          bottlePrice: 600
        }
      ]
    },
    {
      title: 'MOROCCAN RED WINES',
      items: [
        {
          name: 'Beauvallon',
          bottlePrice: 290,
          glassPrice: 80
        },
        {
          name: 'Médaillon',
          bottlePrice: 340,
          halfBottlePrice: 180,
          glassPrice: 100
        },
        {
          name: 'S de Siroua',
          bottlePrice: 390
        },
        {
          name: 'CB Signature',
          bottlePrice: 480
        },
        {
          name: 'Azayi',
          bottlePrice: 590
        },
        {
          name: 'Château Roslane AOC',
          bottlePrice: 600
        },
        {
          name: 'Tandem',
          bottlePrice: 600
        }
      ]
    },
    {
      title: 'MOROCCAN ROSÉ WINES',
      items: [
        {
          name: 'Médaillon',
          bottlePrice: 340,
          glassPrice: 100
        },
        {
          name: 'S de Siroua',
          bottlePrice: 390
        },
        {
          name: 'CB Signature',
          bottlePrice: 420
        },
        {
          name: 'Tandem',
          bottlePrice: 450
        }
      ]
    },
    {
      title: 'MOROCCAN GREY WINES',
      items: [
        {
          name: 'Boulaouane',
          bottlePrice: 290,
          glassPrice: 80
        },
        {
          name: 'Medaillon',
          bottlePrice: 340,
          glassPrice: 100
        },
        {
          name: 'Ait Souala',
          bottlePrice: 420
        }
      ]
    },
    {
      title: 'SPANISH WHITE WINES',
      items: [
        {
          name: 'Marques de Caceres',
          bottlePrice: 320,
          glassPrice: 110
        },
        {
          name: 'Vina Esmeralda',
          bottlePrice: 360
        },
        {
          name: 'Albarino Pazo San Mauro',
          bottlePrice: 540
        }
      ]
    },
    {
      title: 'FRENCH WHITE WINES',
      items: [
        {
          name: 'Domaine Chiroulet',
          bottlePrice: 360,
          glassPrice: 110
        },
        {
          name: 'Bourgogne Chardonnay Rodet',
          bottlePrice: 540
        },
        {
          name: 'Chablis Tremblay',
          bottlePrice: 560
        },
        {
          name: 'Sancerre J de Villebois',
          bottlePrice: 590
        },
        {
          name: 'Pouilly Fumé J de Villebois',
          bottlePrice: 640
        }
      ]
    },
    {
      title: 'PORTUGUESE WHITE WINES',
      items: [
        {
          name: 'Mateus Blanc 75cl',
          bottlePrice: 260
        }
      ]
    },
    {
      title: 'SPANISH RED WINES',
      items: [
        {
          name: 'Marques de Caceres',
          bottlePrice: 420,
          glassPrice: 110
        },
        {
          name: 'Altos Ibericos',
          bottlePrice: 360
        },
        {
          name: 'Celeste Crianza Torres',
          bottlePrice: 560
        },
        {
          name: 'Conde de San Cristobal',
          bottlePrice: 620
        },
        {
          name: 'Sela Bodega Roda',
          bottlePrice: 690
        },
        {
          name: 'Marques de Vargas Reserva',
          bottlePrice: 690
        },
        {
          name: 'Roda 1 Bodega Roda',
          bottlePrice: 1800
        }
      ]
    },
    {
      title: 'FRENCH RED WINES',
      items: [
        {
          name: 'La Vieille Ferme Ventoux',
          bottlePrice: 290
        },
        {
          name: 'Fleur de Bazeau',
          bottlePrice: 320,
          glassPrice: 110
        },
        {
          name: 'Brouilly Les Jarrons Thorins',
          bottlePrice: 590
        },
        {
          name: 'Château Lafitte',
          bottlePrice: 640
        },
        {
          name: 'Chamirey Mercurey Bourgogne',
          bottlePrice: 900
        },
        {
          name: 'Châteauneuf Du-Pape Les Sinards Perrin',
          bottlePrice: 1200
        }
      ]
    },
    {
      title: 'ARGENTINIAN RED WINES',
      items: [
        {
          name: 'La Celia Reserva Malbec',
          bottlePrice: 420
        }
      ]
    },
    {
      title: 'CHILEAN RED WINES',
      items: [
        {
          name: 'Tarapaca Reserva Carmenere',
          bottlePrice: 390
        }
      ]
    },
    {
      title: 'ITALIAN RED WINES',
      items: [
        {
          name: 'Chianti Superiore Vigneti Trebbio',
          bottlePrice: 480
        }
      ]
    },
    {
      title: 'PORTUGUESE RED WINES',
      items: [
        {
          name: 'Silk & Spice',
          bottlePrice: 320
        }
      ]
    },
    {
      title: 'INTERNATIONAL ROSÉ WINES',
      items: [
        {
          name: 'Mateus rosé',
          bottlePrice: 290
        },
        {
          name: 'Manon Côte de Provence',
          bottlePrice: 320
        },
        {
          name: 'Studio By Miraval',
          bottlePrice: 440
        },
        {
          name: 'Pétales de Rose',
          bottlePrice: 460
        },
        {
          name: 'Miraval',
          bottlePrice: 580
        },
        {
          name: 'Minuty Prestige',
          bottlePrice: 590
        }
      ]
    }
  ];

  return (
    <div 
      id="menu-section"
      className="min-h-screen py-6 md:py-12 px-2 sm:px-4"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url(/api/placeholder/1000/1000)', 
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto max-w-4xl">
        <header className="mb-6 md:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-60" />
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-4 rounded-full opacity-40" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4"
            style={{ color: '#81715E' }}
          >
            Wines & Champagnes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Selection of wines and champagnes
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-6 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            A 6% service charge will be added to your bill.
            <br/>The establishment only accepts certified checks.
          </motion.p>
        </header>

        <div className="space-y-4 md:space-y-8">
          {menuSections.map((section, index) => (
            <WineMenuSection 
              key={index} 
              title={section.title} 
              items={section.items} 
            />
          ))}
        </div>
        
        <footer className="mt-8 md:mt-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 mx-auto bg-amber-600 mb-1 rounded-full opacity-40" />
            <div className="w-20 h-1 mx-auto bg-amber-600 mb-4 rounded-full opacity-60" />
            <p className="text-xs uppercase tracking-widest font-light" style={{ color: 'rgba(129, 113, 94, 0.6)' }}>
              Cheers and enjoy your meal
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default WineMenu;