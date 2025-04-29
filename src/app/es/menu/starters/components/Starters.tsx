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
          description: 'Frescas y con sabor a mar',
          options: '6 unidades / 12 unidades',
          detailedDescription: 'Joyas brillantes de la costa atlántica de Dakhla, estas ostras ofrecen un sabor delicadamente yodado y una textura cremosa que evoca la esencia pura del océano en cada bocado.'
        },
        {
          name: 'Pimientos "Padrón"',
          price: 80,
          description: 'Pimientos verdes dulces fritos, acompañados de flor de sal',
          detailedDescription: 'Un juego de ruleta española donde algunos son dulces y otros sorprenden por su calor, estos pequeños pimientos fritos crujientes se realzan con el crujido de la sal marina gruesa.'
        },
        {
          name: 'Boquerones en Vinagre',
          price: 80,
          description: 'Filetes de anchoas frescas marinadas en aceite de oliva y ajo',
          detailedDescription: 'Una preparación tradicional mediterránea donde el intenso sabor de las anchoas se suaviza con un marinado perfumado con aceite de oliva virgen y ajo, para una experiencia gustativa profunda.'
        },
        {
          name: 'Gambas Palomitas',
          price: 90,
          description: 'Gambas fritas crujientes especiadas',
          detailedDescription: 'Bocados de gambas recubiertas con un rebozado ligeramente picante y fritas a la perfección, creando un contraste irresistible entre lo crujiente exterior y la tierna jugosidad interior.'
        },
        {
          name: 'Tacos de Tartar de Atún',
          price: 120,
          description: 'Tacos crujientes, atún rojo, mango, aguacate',
          detailedDescription: 'Una fusión elegante de sabores donde el atún rojo crudo se encuentra con la dulzura exótica del mango y la cremosidad del aguacate, todo ello envuelto en el abrazo crujiente de un taco artesanal.'
        },
        {
          name: 'Tacos de Gambas',
          price: 120,
          description: 'Tacos crujientes rellenos de una mezcla de gambas a la parrilla, aguacate, tomates, cebollas con un aliño ligeramente picante',
          detailedDescription: 'El mar y la tierra se unen en estos tacos donde las jugosas gambas se encuentran con la frescura de las verduras y la cremosidad del aguacate, realzados por un aliño que despierta delicadamente las papilas gustativas.'
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
          description: 'Patatas fritas con mayonesa de ajo',
          detailedDescription: 'Una tapa española imprescindible donde el calor de las patatas doradas se encuentra con la frescura de un alioli cremoso infusionado con ajo, para un contraste reconfortante de temperaturas y texturas.'
        },
        {
          name: 'Batata Harra',
          price: 60,
          description: 'Patatas fritas con chile, cilantro, limón y ajo',
          detailedDescription: 'Un viaje al Líbano en un bocado, donde las patatas crujientes bailan con el calor de los chiles, la frescura del limón y las notas aromáticas del cilantro.'
        },
        {
          name: 'Tabla de Quesos',
          price: 180,
          description: 'Selección de quesos variados',
          detailedDescription: 'Una tabla seleccionada con pasión que presenta quesos con carácter, desde los más suaves hasta los más curados, acompañados de condimentos que realzan sus complejas notas.'
        },
        {
          name: 'Ensaladilla Rusa',
          price: 70,
          description: 'Patatas, zanahorias, huevos, guisantes, atún, mayonesa',
          detailedDescription: 'Una preparación nostálgica donde las verduras crujientes y el atún se mezclan en un abrazo cremoso de mayonesa, creando un equilibrio perfecto entre riqueza y frescor.'
        },
        {
          name: 'Edamame',
          price: 80,
          description: 'Habas de soja cocidas al vapor con sal marina y marinadas con ajo',
          detailedDescription: 'Pequeños tesoros verdes de Japón, estas habas de soja en vainas se realzan con sal marina y ajo, ofreciendo una experiencia táctil y gustativa que es a la vez lúdica y satisfactoria.'
        },
        {
          name: 'Tortilla Española',
          price: 70,
          description: 'Tortilla de patatas',
          detailedDescription: 'Un clásico español reinterpretado con patatas suaves y huevos esponjosos, cocinados lentamente para crear esa textura distintiva que se deshace en la boca, entre sólido y cremoso.'
        },
        {
          name: 'Croquetas de Marisco',
          price: 80,
          description: 'Bechamel cremosa con mariscos',
          detailedDescription: 'Bocados dorados y crujientes que revelan un corazón tierno de bechamel enriquecida con delicados mariscos, capturando la esencia del Mediterráneo en cada mordisco.'
        },
        {
          name: 'Croquetas de Pollo',
          price: 80,
          description: 'Pollo tierno y champiñones aromáticos',
          detailedDescription: 'El encuentro del pollo tierno y los champiñones terrosos en una bechamel aterciopelada, todo ello envuelto en un pan rallado dorado que cruje alegremente bajo el diente.'
        },
        {
          name: 'Champi-Crunchi',
          price: 100,
          description: 'Champiñones empanados marinados y picantes con salsa tártara',
          detailedDescription: 'Champiñones adictivos por un marinado picante y un empanado crujiente, acompañados de una salsa tártara casera que equilibra perfectamente su carácter audaz.'
        },
        {
          name: 'Champiñones al Ajillo',
          price: 100,
          description: 'Champiñones, aceite de oliva, ajo y perejil',
          detailedDescription: 'La simplicidad en su apogeo, donde los champiñones jugosos absorben la esencia del ajo dorado y el aroma del perejil fresco, todo ello envuelto en un aceite de oliva afrutado de primera presión.'
        },
        {
          name: 'Almejas al Ajillo',
          price: 140,
          description: 'Almejas, ajo, aceite de oliva y perejil',
          detailedDescription: 'Estos delicados mariscos se abren para revelar su carne tierna, bañada en un elixir de aceite de oliva infusionado con ajo y espolvoreada con perejil fresco - un homenaje al mar.'
        },
        {
          name: 'Gambas al Ajillo',
          price: 140,
          description: 'En un aceite de oliva picante',
          detailedDescription: 'Gambas jugosas salteadas en un aceite de oliva ardiente que captura toda la esencia del ajo y del chile, creando un jugo irresistible que pide ser saboreado con pan.'
        },
        {
          name: 'Calamares "Estilo Andaluz"',
          price: 160,
          description: 'Calamares fritos con harina andaluza',
          detailedDescription: 'El arte andaluz de la fritura en todo su esplendor, con anillos de calamar tiernos recubiertos de una masa ligera y crujiente, servidos con un toque de limón para despertar los sabores.'
        },
        {
          name: 'Chipirones a la Plancha',
          price: 220,
          description: 'Con ensalada, aceite de oliva y ajo',
          detailedDescription: 'Pequeños calamares enteros a la parrilla en su punto, conservando su ternura natural y realzados por la sutil alianza del ajo y el aceite de oliva sobre un lecho de ensalada fresca.'
        },
        {
          name: 'Vitello Tonnato',
          price: 160,
          description: 'Finas lonchas de ternera en una mayonesa cremosa de atún, servidas con alcaparras',
          detailedDescription: 'Una elegancia italiana clásica donde la delicadeza de la ternera rosada se casa con la riqueza de la salsa de atún, puntuada por los estallidos salados de las alcaparras y la acidez del limón.'
        },
        {
          name: 'Pulpo a la Gallega',
          price: 160,
          description: 'Pulpo cocido sobre un puré de patatas',
          detailedDescription: 'Una especialidad del norte de España donde el tierno pulpo reposa sobre un lecho de patatas aterciopeladas, todo ello generosamente rociado con aceite de oliva y espolvoreado con pimentón ahumado.'
        }
      ]
    },
    {
      title: 'ENSALADAS',
      items: [
        {
          name: 'Ensalada César – Clásica –',
          price: 140,
          description: 'Lechuga romana, Pollo a la parrilla, Anchoas, Tomates, Huevo, Picatostes de pan, Virutas de parmesano y salsa césar',
          detailedDescription: 'La emblemática ensalada reinventada con pollo jugoso y todos los ingredientes que la han hecho famosa, realzada por nuestra salsa césar casera con un equilibrio perfecto entre cremosidad y umami.'
        },
        {
          name: 'Ensalada Arcoíris',
          price: 120,
          description: 'Lechuga, Verduras, Atún, Huevos, Anchoas',
          detailedDescription: 'Un cuadro colorido y nutritivo donde cada bocado ofrece una combinación diferente de sabores y texturas, desde el crujido de las verduras frescas hasta la riqueza del atún y los huevos.'
        },
        {
          name: 'Ensalada Griega',
          price: 140,
          description: 'Tomates, Pimientos, Cebollas, Pepino, Feta',
          detailedDescription: 'Una escapada a las islas griegas en cada bocado, donde la frescura de las verduras impregnadas de sol se casa con la salinidad del queso feta y la dulzura de las hierbas mediterráneas.'
        },
        {
          name: 'Ensalada de Cangrejo Azul Tangerino',
          price: 130,
          description: 'Fina juliana de lechuga romana, 100gr de carne de cangrejo y mayonesa',
          detailedDescription: 'Nuestra especialidad local donde la delicadeza de la carne de cangrejo azul se despliega sobre un lecho de romana crujiente, todo ello envuelto en una mayonesa aérea con sutiles notas de limón.'
        },
        {
          name: 'Ensalada Chiringuito',
          price: 140,
          description: 'Ensalada, Aguacate, Mezcla de mariscos y salsa cocktail',
          detailedDescription: 'Nuestra creación emblemática que captura la esencia misma de nuestro establecimiento - una generosa porción de mariscos frescos encontrándose con el cremoso aguacate sobre un lecho de verduras crujientes.'
        },
        {
          name: 'Ensalada de Pulpo',
          price: 160,
          description: 'Pulpo, Patatas, Pimientos asados, Perejil, Aceite, sal',
          detailedDescription: 'El pulpo tierno y carnoso se une a las patatas suaves y los pimientos ahumados en una danza de aceite de oliva perfumado con perejil fresco - una verdadera oda al Mediterráneo.'
        },
        {
          name: 'Ensalada de Burrata',
          price: 160,
          description: 'Servida con tomates, Pesto casero, y créma balsámica',
          detailedDescription: 'El contraste perfecto entre la burrata cremosa de corazón líquido y los tomates cargados de sol, magnificado por nuestro pesto artesanal con notas de albahaca recién cosechada.'
        },
        {
          name: 'Ensalada de Queso de Cabra',
          price: 140,
          description: 'Rúcula, Queso de cabra, Crema balsámica, Frambuesas confitadas',
          detailedDescription: 'El calor del queso de cabra fundente se casa con la frescura picante de la rúcula, mientras que las frambuesas confitadas aportan una nota agridulce que baila con el vinagre balsámico.'
        },
        {
          name: 'Carpaccio de Tomates con Atún',
          price: 140,
          description: 'Tomates finos y atún premium',
          detailedDescription: 'Lonchas de tomate de extrema finura que se adornan con delicado atún, todo ello rociado con un aceite de oliva afrutado y espolvoreado con hierbas frescas para un plato de elegante simplicidad.'
        },
        {
          name: 'Pimientos Asados con Tataki de Atun',
          price: 140,
          description: 'Atún marcado con ligereza',
          detailedDescription: 'El atún rojo brevemente marcado para preservar su ternura natural, colocado sobre un lecho de pimientos de sabor ahumado que complementa perfectamente la riqueza del pescado sin jamás dominarlo.'
        },
        {
          name: 'Carpaccio de Ternera',
          price: 140,
          description: 'Finas lonchas de ternera cruda',
          detailedDescription: 'Lonchas de ternera de extraordinaria finura, bellamente dispuestas y sazonadas con aceite de oliva de primera presión, parmesano curado y alcaparras que realzan su delicado sabor.'
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
            Frescura y sabores
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