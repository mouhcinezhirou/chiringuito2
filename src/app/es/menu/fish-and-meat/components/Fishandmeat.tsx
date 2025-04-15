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
      title: 'PESCADOS',
      subtitle: 'Servidos con guarnición a elegir',
      items: [
        {
          name: 'Tagra (tajine) de pescado "especialidad de la casa"',
          price: 340,
          description: 'Nuestro tajine estrella cocinado lentamente en su terrina tradicional, donde el pescado fresco del día se guisa con tomates, pimientos de colores, aceitunas y especias marroquíes aromáticas, creando un plato auténtico rico en sabores mediterráneos y norteafricanos.'
        },
        {
          name: 'Tagra (tajine) de gambas reales',
          price: 800,
          description: 'Un festín lujoso de gambas reales preparadas en nuestro tajine casero, cocinadas suavemente con una mezcla de azafrán, ajo, jengibre fresco, cilantro y un toque de pimiento dulce. Servido burbujeante en su terrina tradicional.'
        },
        {
          name: 'Salmón a la parrilla',
          price: 340,
          description: 'Filete de salmón premium a la parrilla con una corteza dorada y un interior tierno y jugoso. Sazonado simplemente con hierbas frescas, un chorrito de aceite de oliva y ralladura de limón para realzar su sabor natural y delicado.'
        },
        {
          name: 'Pez espada a la parrilla',
          price: 260,
          description: 'Filete de pez espada carnoso a la parrilla perfectamente cocinado, ofreciendo una textura firme y un sabor rico pero delicado. Ligeramente marinado con hierbas mediterráneas, aceite de oliva y limón para realzar su frescura marina natural.'
        },
        {
          name: 'Lenguado "meunière"',
          price: 280,
          description: 'Un clásico francés preparado con finura - filete de lenguado delicadamente salteado en mantequilla avellana, perfumado con ajo y perejil, creando una corteza dorada que contrasta perfectamente con la carne blanca y tierna del pescado. Acompañado de un gajo de limón fresco.'
        },
        {
          name: 'Lubina a la parrilla',
          price: 280,
          description: 'Lubina mediterránea a la parrilla entera o en filete según disponibilidad, con una piel crujiente y carne blanca delicada. Preparada simplemente con aceite de oliva, hierbas frescas y sal marina para preservar su excepcional sabor natural.'
        },
        {
          name: 'San Pedro a la parrilla',
          price: 290,
          description: 'Este noble pescado de carne fina se cocina delicadamente a la parrilla para preservar su textura delicada y su sabor sutil. Su delicado sabor se realza con un simple aderezo de hierbas frescas, aceite de oliva virgen extra y un toque de flor de sal.'
        },
        {
          name: 'Cigalas a la parrilla',
          price: 600,
          description: 'Cigalas frescas a la parrilla perfectamente cocinadas, revelando su carne suave y dulce. Servidas en su caparazón con mantequilla casera de ajo y hierbas que se derrite delicadamente sobre estos delicados y aromáticos crustáceos.'
        },
        {
          name: 'Gambas Reales a la parrilla',
          price: 800,
          description: 'Suntuosas gambas reales de calibre excepcional, cocinadas delicadamente a la parrilla para preservar su textura firme y su sabor naturalmente dulce. Servidas con un toque de aceite de oliva infusionado con limón y hierbas frescas de Provenza.'
        }
      ]
    },
    {
      title: 'CARNES',
      subtitle: 'Servidas con guarnición a elegir',
      items: [
        {
          name: 'Tagliata de ternera (solomillo)',
          price: 380,
          description: 'Solomillo de ternera tierno finamente cortado después de una cocción perfecta, servido ligeramente rosado y guarnecido con virutas de parmesano, rúcula fresca y un chorrito de aceite de oliva virgen extra perfumado con trufa. Un plato de inspiración italiana que realza la calidad excepcional de nuestra carne.'
        },
        {
          name: 'Solomillo de ternera salteado al ajo',
          price: 340,
          description: 'Trozos tiernos de solomillo de ternera salteados a fuego vivo con ajo fresco machacado, creando un contraste perfecto entre el exterior caramelizado y el interior jugoso y tierno. Una preparación sencilla que celebra la calidad de nuestra carne seleccionada cuidadosamente.'
        },
        {
          name: 'Chich taouk',
          price: 220,
          description: 'Brochetas de pollo marinado en una mezcla tradicional libanesa de yogur, ajo, limón y especias como el zumaque y el zataar. Asadas hasta conseguir una perfecta ternura con una ligera caramelización, y servidas con nuestra salsa alioli casera de hierbas frescas.'
        },
        {
          name: 'Entrecot de París',
          price: 320,
          description: 'Entrecot madurado de primera calidad, asado según su preferencia y servido con nuestra salsa casera de pimienta negra triturada, chalotes y coñac. El veteado perfecto de este corte ofrece una ternura y un sabor incomparables.'
        },
        {
          name: 'Hamburguesa (100% casera)',
          price: 140,
          description: 'Nuestra hamburguesa estrella elaborada con carne de ternera picada a mano, asada a la perfección y guarnecida con queso cheddar fundido, cebollas lentamente caramelizadas y nuestra salsa secreta ligeramente ahumada. Todo ello servido en un pan brioche artesanal dorado en mantequilla.'
        },
        {
          name: 'Mini hamburguesa de ternera',
          price: 140,
          description: 'Trío de deliciosas mini hamburguesas preparadas con el mismo cuidado que nuestra versión clásica. Cada bocado ofrece un equilibrio perfecto entre la ternera jugosa, el cheddar fundido y nuestra salsa casera cremosa, todo ello en un pequeño pan brioche esponjoso. Ideal para compartir o como entrada generosa.'
        }
      ]
    },
    {
      title: 'GUARNICIONES',
      items: [
        {
          name: 'Verduras salteadas',
          price: 60,
          description: 'Una mezcla colorida de verduras de temporada finamente cortadas y salteadas rápidamente en aceite de oliva con un toque de ajo y hierbas frescas. La cocción preserva su crujido y sus sabores naturales para un acompañamiento tanto saludable como delicioso.'
        },
        {
          name: 'Puré de patatas',
          price: 60,
          description: 'Puré cremoso preparado con patatas de pulpa harinosa, aplastadas con mantequilla de barril y nata fresca. Su textura aterciopelada y su riqueza lo convierten en el complemento perfecto para nuestros pescados y carnes.'
        },
        {
          name: 'Patatas salteadas',
          price: 60,
          description: 'Patatas nuevas cortadas en cuartos y salteadas lentamente hasta conseguir un exterior dorado y crujiente con un interior tierno. Perfumadas con tomillo fresco y ajo, son el acompañamiento ideal para realzar nuestros platos principales.'
        },
        {
          name: 'Patatas fritas',
          price: 60,
          description: 'Patatas fritas crujientes preparadas en nuestra cocina según el método tradicional: cortadas a mano, cocinadas dos veces para obtener un exterior perfectamente dorado y un interior suave, y sazonadas con una pizca de flor de sal.'
        },
        {
          name: 'Ensalada verde',
          price: 60,
          description: 'Mezcla fresca de brotes jóvenes y hojas crujientes, ligeramente aliñadas con una vinagreta casera a base de aceite de oliva virgen extra y vinagre balsámico añejo. La opción perfecta para un acompañamiento ligero y refrescante.'
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
            Pescados & Carnes
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Frescura y calidad
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
              Buen provecho
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default FishMeatMenu;