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
  ingredients: 'mango / grand marnier / tequila infusionado chili / cilantro',
  description: 'Una escapada tropical que combina la dulzura exótica del mango con la sofisticación del Grand Marnier y el calor picante del tequila al chile, realzada por la frescura herbácea del cilantro.'
},
        {
          name: 'Mai Tai Chiringuito',
          price: 220,
          ingredients: 'Bacardi oro / Licor de Mandarina / Orgeat / Naranja / Bitter Angostura',
          description: 'Nuestra versión distintiva del clásico Mai Tai, trayendo la puesta de sol en la playa a tu vaso con ricas notas de almendra y cítricos vibrantes.'
        },
        {
          name: 'No Te Olvides Del Verano',
          price: 220,
          ingredients: 'Vodka Russian Standard / Blue Curaçao / Orgeat / Licor de Coco / Tónica',
          description: 'Un recuerdo del verano capturado en azul turquesa, con delicadas notas de coco y almendra que permanecen como el último día de vacaciones.'
        },
        {
          name: 'Tuki-Tuki',
          price: 220,
          ingredients: 'Sake / Maracuyá / Licor de Melocotón / Falernum / Limón',
          description: 'Un viaje exótico que combina la tradición japonesa con especias caribeñas, creando una equilibrada armonía de dulce, ácido y umami.'
        }
      ]
    },
    {
      title: 'CÓCTELES CHIRINGUITO',
      items: [
    {
      name: 'Mediterranean Collins',
      price: 160,
      ingredients: 'gin / fliou/ lavanda / tonica fever tree mediterranean',
      description: 'Un suspiro refrescante para el alma'
    },
    {
      name: 'Tora Sensai',
      price: 160,
      ingredients: 'Mix sake&cachaca / sirop casero wasabi / citron / gemgibre caramelizado',
      description: 'Delicado, con alma feroz'
    },
    {
      name: 'Chebakia',
      price: 160,
      ingredients: 'Licor casero de chebakia / Licor de almendra / Miel',
      description: 'hogar, dulce hogar'
    },
    {
      name: 'Zahara',
      price: 160,
      ingredients: 'Aperol / Cointreau / Zanahoria / Cardamomo / Agua de azahar / Cucharada de Rhumtella',
      description: 'Sorbo de atardecer dorado'
    },
    {
      name: 'Ambarina',
      price: 160,
      ingredients: 'Reducción de vino rosado y romero / Naranja / Melocotón / Vermut / Prosecco',
      description: 'Suave, especiado, herbal, resplandor calido'
    },
    {
      name: 'Berber Fire',
      price: 160,
      ingredients: 'whisky bourbon macerado con especias y manzanas rojas / amaro / dash agua con gas/perfume citrico/olivas',
      description: 'Entre la tradición y el deseo'
    },
    {
      name: 'Carmesí',
      price: 160,
      ingredients: 'licor maraschino / Co2 shrub frutos rojos / cava',
      description: 'Frescura vibrante'
    },
    {
      name: 'Paloma Ajena',
      price: 180,
      ingredients: 'Mezcal / Yuzu / Limón / Zumo de Pomelo / Sal Picante',
      description: 'Una Paloma exótica con yuzu japonés que añade complejidad al pomelo tradicional, con un borde de sal picante.'
    }
      ]
    },
    {
      title: 'MOCKTAILS',
      items: [
        {
          name: 'Detox Chiringuito',
          price: 60,
          ingredients: 'Agua / Limón / Menta / Pepino / Apio',
          description: 'Una mezcla pura y vigorizante que limpia y refresca, trayendo la esencia del bienestar a tu vaso.'
        },
        {
          name: 'Amor Narcótico',
          price: 120,
          ingredients: 'Melocotón / Sandía / Hierbas',
          description: 'Una mezcla refrescante y adictiva de frutas de hueso y melón con hierbas aromáticas que realzan esta indulgencia sin alcohol.'
        },
        {
  name: 'Mango Mojito',
  price: 120,
  ingredients: 'Mango / limón / menta / agua con gas',
  description: 'Un giro tropical y exótico de un clásico'
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
          ingredients: 'Baileys / licor de Café / Triple Sec',
          description: 'Un clásico de varias capas con cremoso Baileys, rico licor de café y Triple Sec cítrico - ¡enciéndelo para un efecto dramático!'
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
          ingredients: 'Sambuca / Blue Curaçao / Vodka Ruso / Sirope de Vainilla',
        },
        {
          name: 'Te a la Meister (x4)',
          price: 160,
          ingredients: 'Jägermeister / Sirope de Jengibre / Licor de Chocolate / Menta / Ron Blanco',
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