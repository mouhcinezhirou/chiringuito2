'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  preparationTime?: string;
  detailedDescription?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const DessertMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
  name, 
  price, 
  description,
  preparationTime,
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
          {preparationTime && (
            <span className="text-xs text-neutral-500 font-light">({preparationTime})</span>
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
          <span className="mr-1">{isExpanded ? 'Menos' : 'Detalles'}</span>
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

const DessertMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <DessertMenuItem
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

const DessertsMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: 'POSTRES',
      items: [
        {
          name: 'Happiness Piña',
          price: 130,
          description: 'Sorbete casero de piña y coco',
          detailedDescription: 'Una sinfonía tropical donde la piña jugosa se encuentra con la suavidad cremosa del coco, transportando tu paladar bajo las palmeras de una playa paradisíaca.'
        },
        {
          name: 'Pain Perdu',
          price: 80,
          description: 'Tostada francesa caramelizada, servida con helado de vainilla',
          preparationTime: '10 min',
          detailedDescription: 'Un recuerdo de la infancia reinventado con pan brioche dorado y crujiente, cubierto con caramelo suave que danza con las delicadas notas de vainilla de Madagascar.'
        },
        {
          name: 'Pavlova de Frutos Rojos',
          price: 80,
          description: 'Merengue crujiente y frutos rojos de temporada',
          detailedDescription: 'Una nube de ligereza crujiente coronada con bayas brillantes y un toque de crema batida, como un ballet de texturas que se revela en cada bocado.'
        },
        {
          name: 'Fondant de Chocolate',
          price: 80,
          description: 'Servido con helado de vainilla',
          preparationTime: '10 min',
          detailedDescription: 'Un corazón misterioso de chocolate negro intenso que se revela en un flujo de calidez voluptuosa, contrastado por la frescura de un helado de vainilla artesanal.'
        },
        {
          name: 'Tiramisú de Spéculoos',
          price: 80,
          description: 'Reinterpretación del clásico italiano',
          detailedDescription: 'Un romance franco-italiano donde la riqueza del mascarpone se encuentra con las especias cálidas de los spéculoos, creando una armonía perfecta entre dulzura y carácter.'
        },
        {
          name: 'Crème Brûlée',
          price: 70,
          description: 'Crema suave con una costra de caramelo crujiente',
          detailedDescription: 'Un clásico atemporal con dos caras: el crujido exquisito del caramelo quemado protege un tesoro de vainilla sedoso y delicado. Un vals de contradicciones perfectas.'
        },
        {
          name: 'Helados / Sorbetes',
          price: 80,
          description: 'Vainilla o limón',
          detailedDescription: 'Creaciones heladas con sabores puros e intensos, elaboradas cada día en nuestra cocina con ingredientes cuidadosamente seleccionados para una experiencia refrescante.'
        },
        {
          name: 'Frutas de Temporada',
          price: 70,
          description: 'Selección de frutas frescas',
          detailedDescription: 'Una cosecha colorida de las mejores frutas del mercado, presentada en su simplicidad natural para celebrar los sabores auténticos que la naturaleza nos ofrece cada temporada.'
        },
        {
          name: 'Irish Coffee',
          price: 80,
          description: 'Whiskey, café y crema batida',
          detailedDescription: 'Una dulce embriaguez donde la elegante amargura del café abraza el calor del whiskey irlandés, todo suavemente cubierto por una nube de crema ligeramente endulzada.'
        },
        {
          name: 'Café Gourmand',
          price: 80,
          description: 'Fondant de chocolate, crème brûlée y helado de vainilla',
          detailedDescription: 'Una trilogía de placeres en miniatura acompañando nuestro café de autor, ofreciendo un viaje gustativo completo para satisfacer todos tus antojos dulces en un solo plato.'
        },
        {
          name: 'Colonel',
          price: 120,
          description: 'Vodka, sorbete de limón',
          detailedDescription: 'Un interludio helado y alcohólico donde la mordida viva del limón se entrelaza con el calor sutil de la vodka, creando un momento de frescura sofisticada y vigorizante.'
        }
      ]
    }
  ];

  return (
    <div 
      id="desserts-menu-section"
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
            Postres
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Dulzura y placer azucarado
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            Se añadirá un cargo por servicio del 6% a su factura.
            <br/>El establecimiento solo acepta cheques certificados.
          </motion.p>
        </header>

        <div className="space-y-4">
          {menuSections.map((section, index) => (
            <DessertMenuSection 
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
              ¡Buen provecho!
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default DessertsMenu;
