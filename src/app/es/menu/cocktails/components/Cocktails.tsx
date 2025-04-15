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
          className="font-serif italic text-xl transition-all duration-300 group-hover:text-amber-800"
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
      <p className="text-neutral-600 text-sm font-light tracking-wide">{ingredients}</p>
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
      title: 'CÓCTELES TIKI',
      items: [
        {
          name: 'De Tu Bikini',
          price: 220,
          ingredients: 'Bacardi blanco y dorado / mango / canela / pastis / granadina / naranja',
          description: 'Una escapada tropical que combina el calor de la canela con la dulce frescura del mango y la granadina, complementada con un sutil toque de anís.'
        },
        {
          name: 'Mai Tai Chiringuito',
          price: 220,
          ingredients: 'Bacardi Gold / Licor de mandarina / Orgeat / Naranja / Bitter angostura',
          description: 'Nuestra versión distintiva del clásico Mai Tai, trayendo la puesta de sol en la playa a tu vaso con ricas notas de almendra y cítricos vibrantes.'
        },
        {
          name: 'No Te Olvides Del Verano',
          price: 220,
          ingredients: 'Vodka Russian Standard / Blue curaçao / Orgeat / Licor de coco / Tónica',
          description: 'Un recuerdo del verano capturado en azul turquesa, con delicadas notas de coco y almendra que permanecen como el último día de vacaciones.'
        },
        {
          name: 'Tuki-Tuki',
          price: 220,
          ingredients: 'Sake / maracuyá / licor de melocotón / falernum / limón',
          description: 'Un viaje exótico que combina la tradición japonesa con especias caribeñas, creando una equilibrada armonía de dulce, ácido y umami.'
        }
      ]
    },
    {
      title: 'CÓCTELES CHIRINGUITO',
      items: [
        {
          name: 'Moscow Mule',
          price: 160,
          ingredients: 'Vodka Russian standard / Ginger beer',
          description: 'El clásico atemporal servido con un toque de cáscara mediterránea, en nuestra taza de cobre característica que lo mantiene perfectamente fresco.'
        },
        {
          name: 'Copresso',
          price: 160,
          ingredients: 'Bacardi Gold / Bacardi Blanc / Licor de Café / Expresso / Puré de Coco',
          description: 'Una sofisticada fusión de ron caribeño y café intenso, suavizada por la sutil dulzura del coco.'
        },
        {
          name: 'Soprano',
          price: 160,
          ingredients: 'Whisky Jack Daniel Honey / Amareto / Bitter Angostura / Twist naranja',
        },
        {
          name: 'Caipitanja',
          price: 160,
          ingredients: 'Vodka Russian / Sirope de sandía / Limón',
          description: 'Nuestra refrescante versión de la caipiriña, destacando la dulce sandía y los brillantes cítricos que danzan perfectamente juntos.'
        },
        {
          name: 'Bloody Tanja',
          price: 160,
          ingredients: 'Vodka Ruso / Zumo de tomate casero / Apio / Salsa Worcestershire / Tabasco',
          description: 'Nuestro Bloody Mary distintivo con zumo de tomate casero y un equilibrio preciso de calor y umami.'
        },
        {
          name: 'Alcides',
          price: 160,
          ingredients: 'Bombay saphire / licor maraschino / violeta / remolacha / tónica',
          description: 'Una creación visualmente impresionante con la dulzura terrosa de la remolacha y la violeta floral, finalizada con una tónica efervescente.'
        },
        {
          name: 'Maroc Julep',
          price: 160,
          ingredients: 'Whisky bourbon / té shiba / menta / azúcar glaseado',
          description: 'El norte de África se encuentra con Kentucky en esta aromática variación de julep con delicadas notas de té y menta fresca.'
        },
        {
          name: 'Paloma Ajena',
          price: 160,
          ingredients: 'Tequila / yuzu / limón / zumo de pomelo / sal picante',
          description: 'Una Paloma exótica con yuzu japonés que añade complejidad al pomelo tradicional, con un borde de sal picante.'
        },
        {
          name: 'Coco Jamboo',
          price: 160,
          ingredients: 'Baileys / licor de plátano / puré de coco / canela / nuez moscada',
        },
        {
          name: 'El General Spritz',
          price: 160,
          ingredients: 'Campari / brandy de albaricoque / mango / prosecco',
        },
        {
          name: 'Vilma Palma',
          price: 160,
          ingredients: 'Grey goose pera / calvados boulard / flor de saúco / prosecco',
          description: 'Un elegante spritz inspirado en los huertos, combinando el mejor vodka de pera con brandy de manzana y la delicada flor de saúco.'
        },
        {
          name: 'Green Mary',
          price: 160,
          ingredients: 'Vodka russian / pepino / apio / pimienta negra / salsa inglesa',
          description: 'Una variación verde y fresca del jardín del Bloody Mary, más ligera pero con toda la complejidad sabrosa del original.'
        },
        {
          name: 'Burbujas de Amor',
          price: 160,
          ingredients: 'Bombay bramble / rosas / licor de mandarina / frutos rojos / tónica',
          description: 'El romance en un vaso - floral, afrutado y efervescente con un sutil toque de color y una dulzura persistente.'
        }
      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'Detox Chiringuito',
          price: 60,
          ingredients: 'Agua / limón / menta / pepino / apio',
          description: 'Una mezcla pura y vigorizante que limpia y refresca, trayendo la esencia del bienestar a tu vaso.'
        },
        {
          name: 'Amor Narcótico',
          price: 120,
          ingredients: 'Melocotón / sandía / hierbas',
          description: 'Una mezcla refrescante y adictiva de frutas de hueso y melón con hierbas aromáticas que realzan esta indulgencia sin alcohol.'
        },
        {
          name: 'Tangerina Sour',
          price: 120,
          ingredients: 'Mandarina / yuzu / miel / clara de huevo opcional',
          description: 'Una sofisticada experiencia de cítricos con yuzu japonés y miel local, opcionalmente terminada con una sedosa espuma de clara de huevo.'
        },
        {
          name: 'Kiwi Mojito',
          price: 120,
          ingredients: 'Agua de coco / kiwi / limón / menta / jengibre',
          description: 'Toda la frescura de un mojito con kiwi tropical y coco, y un reconfortante toque de jengibre.'
        }
      ]
    },
    {
      title: 'CHUPITOS POR METRO',
      items: [
        {
          name: 'Passion Vodka',
          price: 550,
          ingredients: 'Vodka Ruso / Maracuyá / Limón',
          description: 'Un intenso chupito de pura pasión, combinando la audacia del vodka con la vibrante energía de la maracuyá fresca.'
        },
        {
          name: 'B52',
          price: 550,
          ingredients: 'Baileys / licor de café / triple sec',
          description: 'Un clásico de varias capas con cremoso Baileys, rico licor de café y Triple Sec cítrico - ¡enciéndelo para un efecto dramático!'
        },
        {
          name: 'Rainbow',
          price: 550,
          ingredients: 'Vodka / curaçao azul / naranja / licor de coco / sirope de granadina',
          description: 'Un chupito vibrante y colorido que te lleva a través de un espectro de sabores dulces y tropicales.'
        },
        {
          name: 'Tequila',
          price: 550,
          ingredients: 'Tequila Camino',
          description: 'Directo, sin adornos - solo el audaz y terroso golpe del Tequila Camino premium.'
        }
      ]
    },
    {
      title: 'CHUPITOS',
      items: [
        {
          name: 'Chaouen (x4)',
          price: 160,
          ingredients: 'Sambuca / Blue Curaçao / Vodka Ruso / Sirope de vainilla',
        },
        {
          name: 'Te a la Meister (x4)',
          price: 160,
          ingredients: 'Jägermeister / Sirope de jengibre / Licor de chocolate / Menta / Ron Blanco',
          description: 'Una compleja mezcla de hierbas y especias del Jägermeister, complementada con chocolate y menta para un chupito sorprendentemente equilibrado.'
        },
        {
          name: 'Passion (x4)',
          price: 160,
          ingredients: 'Vodka Ruso / Maracuyá / Limón',
          description: 'Puro hedonismo tropical en forma de chupito - vibrante maracuyá templada por brillantes cítricos y suave vodka.'
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
  Bebidas
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="text-sm tracking-widest uppercase mb-2 font-light"
  style={{ color: 'rgba(129, 113, 94, 0.8)' }}
>
  Preparadas con pasión
</motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            Se añadirá un cargo por servicio del 6% a su cuenta.
            <br/>El establecimiento solo acepta cheques certificados.
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
              Disfruta con responsabilidad
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default CocktailMenu;