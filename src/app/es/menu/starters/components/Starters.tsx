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
      title: 'PARA COMPARTIR',
      items: [
        {
          name: 'Ostras de Dakhla',
          price: '140 / 260',
          description: 'Frescas y yodadas',
          options: '6 unidades / 12 unidades',
          detailedDescription: 'Brillantes joyas de la costa atlántica de Dakhla, estas ostras ofrecen un sabor delicadamente yodado y una textura cremosa que evocan la esencia pura del océano en cada bocado.'
        },
        {
          name: 'Trío de Tapenades de Olivas',
          price: 95,
          description: 'Una selección de paté de olivas verdes, olivas negras y olivas con harissa',
          detailedDescription: 'Olivas cuidadosamente seleccionadas y finamente elaboradas para ofrecer tres sabores únicos: la frescura de las olivas verdes, la riqueza de las olivas negras y el toque picante y sutil de las olivas con harissa. Una delicada sinfonía mediterránea que deleitará a los amantes de los sabores auténticos.'
        },
        {
          name: 'Anchoas Marinadas',
          price: 80,
          description: 'Filetes de anchoa fresca marinados en aceite de oliva y ajo',
          detailedDescription: 'Una preparación mediterránea tradicional donde el intenso sabor de las anchoas se suaviza con un aromático marinado de aceite de oliva virgen y ajo, para una experiencia gustativa profunda y satisfactoria.'
        },
        {
          name: 'Gambas Popcorn',
          price: 160,
          description: 'Bocados de gambas crujientes y especiadas',
          detailedDescription: 'Gambas rebozadas en un empanado ligeramente especiado y fritas a la perfección, creando un contraste irresistible entre el exterior crujiente y la jugosa ternura interior.'
        },
        {
          name: 'Tacos de Tartar de Atún',
          price: 160,
          description: 'Taco crujiente, mousse de aguacate casera, mango fresco, atún rojo y chalotes fritos.',
          detailedDescription: 'El atún rojo de primera calidad se combina con la dulzura exótica del mango fresco y la suavidad de una mousse de aguacate casera. Todo ello realzado por el delicado crujido de los chalotes fritos y servido en un taco casero crujiente, ofreciendo un sutil juego de texturas y sabores refinados.'
        },
        {
          name: 'Tacos de Gambas',
          price: 140,
          description: 'Tacos crujientes rellenos de gambas a la plancha, aguacate, tomates, cebolla y una vinagreta ligeramente especiada',
          detailedDescription: 'El mar y la tierra se unen en estos tacos donde las jugosas gambas se encuentran con la frescura de las verduras y la cremosidad del aguacate, realzados por una vinagreta que despierta delicadamente el paladar.'
        },
        {
          name: 'Hummus',
          price: 120,
          description: 'Crema de garbanzos al estilo libanés',
          detailedDescription: 'Una receta ancestral de Oriente Medio que transforma los garbanzos en una crema sedosa, donde el equilibrio entre el tahini, el limón y el aceite de oliva crea una sinfonía de sabores.'
        },
        {
          name: 'Patatas Alioli',
          price: 70,
          description: 'Patatas doradas servidas con un alioli casero delicadamente aromatizado con ajo.',
          detailedDescription: 'Una tapa española emblemática donde las patatas perfectamente doradas se combinan con la suavidad de un alioli casero sutilmente infusionado con ajo, ofreciendo un delicado contraste de texturas y sabores refinados.'
        },
        {
          name: 'Batata Harra',
          price: 60,
          description: 'Patatas fritas con chile, cilantro, limón y ajo',
          detailedDescription: 'Un viaje al Líbano en un bocado, donde las patatas crujientes bailan con el calor del chile, la frescura del limón y las notas aromáticas del cilantro fresco.'
        },
        {
          name: 'Tabla de Quesos',
          price: 180,
          description: 'Selección de quesos variados',
          detailedDescription: 'Una tabla seleccionada con pasión que presenta quesos de carácter, desde los más suaves hasta los más curados, acompañados de condimentos que realzan sus complejas notas.'
        },
        {
          name: 'Ensaladilla Rusa',
          price: 90,
          description: 'Patatas, zanahorias, huevos, judías verdes, atún, mayonesa',
          detailedDescription: 'Una elaboración nostálgica donde las verduras crujientes y el atún se funden en un abrazo cremoso de mayonesa, creando el equilibrio perfecto entre riqueza y frescura.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Vainas de soja al vapor con sal marina y marinado de ajo',
          detailedDescription: 'Pequeños tesoros verdes de Japón, estas vainas de soja se realzan con sal marina y ajo, ofreciendo una experiencia táctil y gustativa a la vez lúdica y satisfactoria.'
        },
        {
          name: 'Tortilla Española',
          price: 90,
          description: 'Tortilla de patatas',
          detailedDescription: 'Un clásico español elaborado con patatas que se deshacen en la boca y huevos esponjosos, cocinados lentamente para crear esa textura característica que se funde entre lo sólido y lo suave.'
        },
        {
          name: 'Croquetas de Mariscos',
          price: 80,
          description: 'Cremosa bechamel de mariscos',
          detailedDescription: 'Bocados dorados y crujientes que revelan un corazón tierno de bechamel enriquecida con delicados mariscos, capturando la esencia del Mediterráneo en cada mordisco.'
        },
        {
          name: 'Croquetas de Pollo y Champiñones',
          price: 80,
          description: 'Pollo tierno y champiñones aromáticos',
          detailedDescription: 'El pollo jugoso y los champiñones terrosos se encuentran en una bechamel aterciopelada, todo envuelto en un pan rallado dorado que cruje deliciosamente en cada bocado.'
        },
        {
          name: 'Champiñones Crujientes',
          price: 100,
          description: 'Champiñones empanados marinados y fritos con salsa tártara',
          detailedDescription: 'Champiñones irresistibles gracias a un marinado especiado y un rebozado crujiente, acompañados de una salsa tártara casera que equilibra perfectamente su carácter atrevido.'
        },
        {
          name: 'Champiñones al Ajillo',
          price: 100,
          description: 'Champiñones, aceite de oliva, ajo y perejil',
          detailedDescription: 'La sencillez en su máxima expresión, donde los jugosos champiñones absorben la esencia del ajo dorado y el perfume del perejil fresco, todo bañado en un aceite de oliva afrutado de primera presión.'
        },
        {
          name: 'Almejas al Ajillo',
          price: 140,
          description: 'Almejas, aceite de oliva y perejil',
          detailedDescription: 'Estos delicados moluscos se abren para revelar su carne tierna, bañada en un elixir de aceite de oliva infusionado con ajo y espolvoreada con perejil fresco — un homenaje al mar.'
        },
        {
          name: 'Gambas al Ajillo',
          price: 140,
          description: 'En aceite de oliva especiado',
          detailedDescription: 'Jugosas gambas salteadas en un aceite de oliva ardiente que captura toda la esencia del ajo y el chile, creando un jugo irresistible que invita a disfrutarse con pan.'
        },
        {
          name: 'Calamares Fritos "Estilo Andaluz"',
          price: 160,
          description: 'Calamares fritos con harina andaluza',
          detailedDescription: 'El arte andaluz de la fritura en todo su esplendor, con anillas de calamar tiernas envueltas en una masa ligera y crujiente, servidas con un toque de limón para despertar los sabores.'
        },
        {
          name: 'Chipirones a la Plancha',
          price: 220,
          description: 'Con ensalada, aceite de oliva y ajo',
          detailedDescription: 'Chipirones enteros a la plancha en su punto perfecto, conservando su ternura natural y realzados por la sutil combinación de ajo y aceite de oliva sobre una cama de ensalada fresca.'
        },
        {
          name: 'Vitello Tonnato',
          price: 160,
          description: 'Finas lonchas de entrecot asado, napadas con una salsa cremosa de atún y espolvoreadas con alcaparras, tomates cherry y virutas de parmesano.',
          detailedDescription: 'Una refinada interpretación de la elegancia italiana, donde el entrecot asado en finas lonchas se combina con la riqueza de una suave salsa de atún. Las alcaparras, los tomates cherry y las virutas de parmesano aportan frescura, notas saladas y textura, para un plato delicado y bien equilibrado.'
        },
        {
          name: 'Pulpo a la Gallega',
          price: 160,
          description: 'Pulpo servido sobre un puré de patatas',
          detailedDescription: 'Una especialidad del norte de España donde el tierno pulpo descansa sobre un lecho de aterciopeladas patatas, generosamente regado con aceite de oliva y espolvoreado con pimentón ahumado.'
        }
      ]
    },
    {
      title: 'ENSALADAS',
      items: [
        {
          name: 'Ensalada César – Clásica –',
          price: 160,
          description: 'Lechuga romana, pollo a la plancha, tomates cherry, anchoas marinadas, huevo, alcaparras, picatostes dorados y virutas de parmesano, acompañados de una salsa César casera.',
          detailedDescription: 'Crujiente lechuga romana, pollo a la plancha y jugosos tomates cherry, complementados con anchoas marinadas y alcaparras delicadamente sazonadas. Los picatostes dorados y las virutas de parmesano aportan textura y riqueza, mientras que nuestra salsa César casera — suave y sabrosa — une todos los ingredientes para una experiencia clásica e indulgente.'
        },
        {
          name: 'Ensalada Arcoíris',
          price: 120,
          description: 'Lechuga romana y mesclun, zanahorias, pepino, cebollas, pimientos rojos, verdes y amarillos, tomates cherry, atún, huevos y anchoas.',
          detailedDescription: 'Un auténtico cuadro de colores y sabores, donde las verduras frescas y crujientes se encuentran con la riqueza del atún y los huevos. Cada bocado ofrece un equilibrio armonioso de texturas y sabores, para una experiencia ligera, saludable y refinada.'
        },
        {
          name: 'Ensalada Griega',
          price: 140,
          description: 'Tomates, pimientos, cebolla, pepino, feta',
          detailedDescription: 'Una escapada a las islas griegas en cada bocado, donde las verduras maduras al sol se combinan con la salinidad de la feta y la dulzura de las hierbas mediterráneas.'
        },
        {
          name: 'Ensalada de Cangrejo Azul de Tánger',
          price: 130,
          description: 'Chifonada fina de lechuga romana, 100g de carne de cangrejo y mayonesa',
          detailedDescription: 'Nuestra firma local donde la delicada carne de cangrejo azul florece sobre un lecho de crujiente romana, todo envuelto en una ligera mayonesa con sutiles notas cítricas.'
        },
        {
          name: 'Ensalada Chiringuito',
          price: 140,
          description: 'Ensalada crujiente, aguacate en finas láminas, gambas, pulpo, calamares y salmón ahumado, todo realzado por una salsa cóctel casera.',
          detailedDescription: 'Nuestra ensalada estrella pone en valor la frescura y la fineza de los mariscos: gambas, pulpo, calamares y salmón ahumado se combinan con la cremosidad del aguacate y el crujido de las hojas de ensalada. Sutilmente realzada por nuestra salsa cóctel casera, ofrece un refinado equilibrio de texturas y sabores.'
        },
        {
          name: 'Ensalada Fresca de Pulpo',
          price: 180,
          description: 'Pulpo tierno, tomates frescos, brunoise de pimientos rojos, amarillos y verdes, chalote y cilantro, delicadamente aliñados con aceite de oliva, zumo de limón fresco y una pizca de flor de sal',
          detailedDescription: 'El pulpo tierno y jugoso se combina con el crujido de los pimientos multicolores y la dulzura jugosa de los tomates cherry. Perfumada con cilantro fresco y realzada con un chorrito de aceite de oliva de primera calidad y una pizca de flor de sal, esta ensalada ofrece una armoniosa y refrescante mezcla de sabores mediterráneos.'
        },
        {
          name: 'Ensalada de Burrata',
          price: 160,
          description: 'Servida con tomates, pesto casero y crema balsámica',
          detailedDescription: 'El contraste perfecto entre la cremosa burrata de corazón fluido y los tomates maduros al sol, realzado por nuestro pesto artesanal con notas de albahaca recién recolectada.'
        },
        {
          name: 'Ensalada de Queso de Cabra',
          price: 160,
          description: 'Lechuga romana y mesclun crujientes, queso de cabra fresco, dos rondas de queso de cabra fritas, nueces, higos secos y piñones, todo realzado con crema balsámica y un toque de mermelada de frambuesa.',
          detailedDescription: 'La suavidad que se deshace en la boca del queso de cabra y las rondas fritas se mezcla con el crujido de la romana y el mesclun, mientras que la mermelada de frambuesa y la crema balsámica aportan notas dulces y ácidas, creando una delicada y refinada armonía de sabores.'
        },
        {
          name: 'Carpaccio de Tomate con Atún',
          price: 140,
          description: 'Finas lonchas de tomate y atún premium',
          detailedDescription: 'Lonchas de tomate de una fineza extrema aderezadas con delicado atún, rociadas con aceite de oliva afrutado y espolvoreadas con hierbas frescas para un plato de elegante sencillez.'
        },
        {
          name: 'Ensalada de Tomate, Aguacate, Cebolla y Atún',
          price: 140,
          description: 'Finas lonchas de tomate, atún premium, delicadas láminas de aguacate y cebolla finamente cortada, todo realzado con un chorrito de aceite de oliva y una pizca de flor de sal',
          detailedDescription: 'Las finas lonchas de tomate se combinan con el atún de calidad superior y el aguacate en delicadas láminas, mientras que la cebolla finamente cortada aporta un toque sutil. Todo ello rematado con un chorrito de aceite de oliva virgen y una pizca de flor de sal, ofreciendo un equilibrio fresco, refinado y delicadamente perfumado.'
        },
        {
          name: 'Carpaccio de Ternera',
          price: 140,
          description: 'Finas lonchas de ternera cruda, virutas de parmesano, alcaparras, salsa pesto, aceite de oliva, flor de sal y piñones.',
          detailedDescription: 'Lonchas de ternera de una fineza excepcional, delicadamente dispuestas y realzadas con un chorrito de aceite de oliva de primera presión, virutas de parmesano curado y alcaparras que acentúan su delicado sabor. Un toque de pesto casero y piñones añaden frescura y textura, para una experiencia refinada y bien equilibrada.'
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
            Entrantes & Ensaladas
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Frescura y sabor
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
              Buen provecho
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default StartersMenu;