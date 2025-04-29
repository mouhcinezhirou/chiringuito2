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
            <span className="text-xs text-neutral-500 font-light">({pieces} piezas)</span>
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
      title: 'PARA COMENZAR',
      items: [
        {
          name: 'Rollitos de Pollo',
          price: 160,
          description: 'Pollo, setas chinas, fideos de arroz, hoja de arroz frita',
          details: 'Un clásico reinventado con delicadeza - nuestros rollitos crujientes revelan un corazón tierno donde el pollo se entrelaza con las setas en un baile de sabores, envueltos en una hoja de arroz que cruje en cada bocado.'
        },
        {
          name: 'Ebi Fry Picante',
          price: 150,
          description: 'Camarones fritos, mayonesa picante',
          details: 'Camarones capturados al amanecer, cubiertos con un rebozado ligero de especias secretas y fritos a la perfección. Servidos con nuestra mayonesa picante casera que enciende suavemente las papilas sin quemarlas.'
        }
      ]
    },
    {
      title: 'ROLLS',
      note: '(8 piezas por roll excepto indicación contraria)',
      items: [
        {
          name: 'Spicy Tuna Roll',
          price: 160,
          description: 'Tartar de atún rojo picante, atún rojo fresco, mayonesa de wasabi',
          details: 'Una doble experiencia de atún - crudo y en tartar - realzada por un toque de picante que despierta los sentidos sin eclipsar la nobleza de este pescado. La mayonesa de wasabi añade una dimensión cremosa con un final que aumenta en intensidad.'
        },
        {
          name: 'Spicy Salmon Roll',
          price: 160,
          description: 'Tartar de salmón picante, salmón fresco, mayonesa de sriracha',
          details: 'La ternura mantecosa del salmón se encuentra con el atrevimiento del sriracha en este roll que juega con contrastes. Cada bocado revela progresivamente su complejidad, comenzando con suavidad y terminando con un agradable calor picante.'
        },
        {
          name: 'Tropical Crab Roll',
          price: 160,
          description: 'Tartar de cangrejo, aguacate, mango de temporada',
          details: 'Un viaje tropical en ocho bocados donde la delicada carne de cangrejo se une a la mantequilla vegetal del aguacate, mientras el mango aporta un toque solar que ilumina el conjunto con su dulce acidez exótica.'
        },
        {
          name: 'Salmon Avocado California Roll',
          price: 180,
          description: 'Salmón fresco, salmón ahumado, aguacate, queso fresco',
          details: 'Un diálogo entre dos expresiones del salmón - la frescura cruda y la profundidad ahumada - armonizado por la riqueza cremosa del aguacate y la ligereza del queso fresco. Nuestra interpretación de un clásico californiano con un toque mediterráneo.'
        },
        {
          name: 'Shrimp Green Roll',
          price: 180,
          description: 'Camarones fritos, tartar de pepino y aguacate, sésamo tostado, mayonesa picante',
          details: 'La textura crujiente de los camarones dorados se combina con la frescura herbácea del tartar verde en este roll vivificante. Las semillas de sésamo tostadas añaden notas avellanadas que bailan con el calor sutil de la mayonesa.'
        },
        {
          name: 'Crispy Chicken Roll',
          price: 180,
          description: 'Pollo tempura, queso fresco, cebollas caramelizadas, mayonesa picante, cebollas fritas',
          details: 'Una creación fusión audaz donde lo crujiente del pollo tempura encuentra la dulzura agridulce de las cebollas caramelizadas. Una doble textura de cebollas y una mayonesa especiada crean un roll con sabores reconfortantes y complejos.'
        },
        {
          name: 'Chiringuito Roll',
          price: 190,
          description: 'Atún rojo, camarón tempura, salmón fresco, cangrejo de Asilah, queso fresco, cebollino',
          details: 'Nuestra firma definitiva - un cuarteto marino de excepción donde cada ingrediente preserva su carácter mientras forma una sinfonía armoniosa. El cangrejo de Asilah, pescado a mano, aporta una dulzura yodada que la frescura del cebollino sublima.'
        }
      ]
    },
    {
      title: 'CRUNCHY ASIAN',
      items: [
        {
          name: 'Crunchy Roll',
          price: 140,
          description: 'Camarón, aguacate, queso fresco, tobiko, teriyaki, mayonesa picante',
          pieces: 8,
          details: 'La quintaesencia del contraste: lo crujiente exterior cede paso a un corazón tierno donde los camarones bailan con el aguacate. Los huevos de pescado estallan en boca como burbujas de sabor marino, mientras las salsas entrelazan sus notas dulces y picantes.'
        },
        {
          name: 'Dragon Roll',
          price: 160,
          description: 'Salmón, queso fresco, salsa picante, tobiko, teriyaki, cebollino',
          pieces: 8,
          details: 'Inspirado en el legendario dragón asiático, este roll sinuoso captura su fuerza y gracia. El salmón, como escamas preciosas, envuelve un corazón cremoso vibrante de especias, mientras el tobiko añade una dimensión táctil que evoca el fuego del dragón.'
        },
        {
          name: 'Pizza Sushi Salmón',
          price: 160,
          description: 'Salmón, aguacate, queso fresco, tobiko, mayonesa picante, teriyaki',
          details: 'Una fusión audaz entre Italia y Japón - nuestro disco de arroz crujiente evoca la pizza, generosamente cubierto con suave salmón y aguacate. Las salsas se entrelazan en espirales artísticas, creando un cuadro gustativo único.'
        }
      ]
    },
    {
      title: 'NIGIRI',
      note: '(8 piezas por pedido excepto indicación contraria)',
      items: [
        {
          name: 'Nigiri Atún Rojo',
          price: 180,
          description: 'Lonchas de atún rojo sobre arroz de sushi prensado',
          details: 'La nobleza marina en estado puro - nuestro atún rojo, seleccionado por su color profundo y textura sedosa, reposa majestuosamente sobre un almohadón de arroz perfumado. Un diálogo minimalista entre dos ingredientes excepcionales.'
        },
        {
          name: 'Nigiri Salmón',
          price: 180,
          description: 'Lonchas de salmón fresco sobre arroz de sushi prensado',
          details: 'Láminas de salmón de una ternura incomparable, cortadas con precisión para revelar su delicado veteado. Sobre el arroz, se derriten lentamente, liberando sus aceites esenciales que se casan con el vinagre sutil del arroz.'
        },
        {
          name: 'Nigiri Lubina',
          price: 180,
          description: 'Lonchas de lubina delicadas sobre arroz de sushi prensado',
          details: 'La finura encarnada - nuestra lubina del Mediterráneo ofrece una carne nacarada de excepcional delicadeza. Su sabor puro y elegante se realza con la simplicidad del arroz, creando una experiencia de pureza zen.'
        },
        {
          name: 'Nigiri Camarón',
          price: 140,
          description: 'Camarones cocidos sobre arroz de sushi prensado',
          details: 'Nuestros camarones se cocinan delicadamente para preservar su textura elástica y dulzura natural. Colocados como joyas rosas sobre su base de arroz, ofrecen un contraste de temperatura que amplifica sus aromas marinos.'
        },
        {
          name: 'Selección de Nigiris',
          price: 180,
          description: 'Atún rojo, salmón, camarón & lubina',
          details: 'Un cuarteto armonioso que celebra la diversidad de sabores marinos - desde el potente atún rojo hasta la delicadeza de la lubina, pasando por lo cremoso del salmón y la dulzura de los camarones. Una degustación completa servida en el orden ideal.'
        }
      ]
    },
    {
      title: 'SASHIMI & TATAKI',
      items: [
        {
          name: 'Sashimi Atún Rojo',
          price: 220,
          description: 'Lonchas frescas de atún rojo premium',
          details: 'Rubíes marinos cortados con la precisión de un joyero artesano. Nuestro atún, seleccionado por su calidad excepcional, se corta en láminas perfectas que celebran su textura firme y sabor profundo, realzado por un simple toque de wasabi auténtico.'
        },
        {
          name: 'Sashimi Salmón',
          price: 220,
          description: 'Lonchas frescas de salmón de alta calidad',
          details: 'Pétalos de un coral delicado - nuestro salmón se corta en finas lonchas que capturan la luz como vitrales. Su carne fundente libera una riqueza mantecosa y un delicado sabor marino que evoca las frías aguas de su origen.'
        },
        {
          name: 'Sashimi Lubina',
          price: 220,
          description: 'Lonchas frescas de lubina delicada',
          details: 'La esencia misma de la sutileza marina - nuestra lubina de línea se presenta en lonchas transparentes que revelan su carne inmaculada. Su sabor delicado, casi dulce, es un himno a la pureza de los fondos arenosos mediterráneos.'
        },
        {
          name: 'Rainbow Sashimi',
          price: 220,
          description: 'Surrido de atún rojo, salmón y lubina',
          details: 'Una paleta cromática que deleita tanto los ojos como el paladar - desde el rojo intenso del atún al naranja luminoso del salmón hasta el blanco nacarado de la lubina. Cada variedad se dispone con arte para crear un degradado marino encantador.'
        },
        {
          name: 'Tataki Atún Rojo',
          price: 240,
          description: 'Atún rojo sellado con aliño ligero',
          details: 'Un equilibrio perfecto entre crudo y cocido - nuestro atún se sella brevemente al fuego para caramelizar su superficie mientras preserva su corazón crudo. Esta alquimia térmica revela nuevas dimensiones aromáticas, realzadas por nuestro aliño secreto.'
        },
        {
          name: 'Tataki Salmón',
          price: 240,
          description: 'Salmón sellado con aliño ligero',
          details: 'La metamorfosis del salmón - el calor fugaz transforma su superficie en un velo dorado que sella los preciosos aceites en su interior. Nuestro aliño de cítricos y sésamo amplifica su riqueza natural, creando un fascinante contraste entre exterior e interior.'
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
            Menú Asiático de Sushi
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Fresco & Delicioso
          </motion.p>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs text-neutral-600 mt-8 max-w-md mx-auto font-light italic"
            style={{ color: 'rgba(129, 113, 94, 0.7)' }}
          >
            Se añadirá un 6% de cargo por servicio a su factura.
            <br/>El establecimiento solo acepta cheques certificados.
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
              Buen provecho
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default SushiMenu;