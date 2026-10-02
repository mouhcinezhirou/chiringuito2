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

const PizzaPastaMenuItem: React.FC<MenuItem & { onExpand: () => void, isExpanded: boolean }> = ({ 
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

const PizzaPastaMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <PizzaPastaMenuItem
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

const PizzaPastaMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      "title": "PIZZAS",
      "items": [
        {
          "name": "Primavera",
          "price": 140,
          "ingredients": "Verduras de temporada, rúcula, queso feta, salsa pesto, mozzarella, salsa de tomate",
          "description": "Una sinfonía colorida de verduras frescas, realzada por rúcula, feta y una perfumada salsa pesto, sobre una base de salsa de tomate casera. Cada bocado evoca un jardín mediterráneo en pleno verano."
        },
        {
          "name": "La Margherita",
          "price": 120,
          "ingredients": "Queso con salsa de tomate",
          "description": "La elegancia en su forma más pura - nuestra interpretación del clásico napolitano con una salsa de tomate aromatizada con albahaca fresca y una mozzarella fundente sobre una masa fina y crujiente."
        },
        {
          "name": "La Rustica",
          "price": 140,
          "ingredients": "Queso de cabra, Hojas de rúcula y pequeños tomates confitados",
          "description": "Un contraste perfecto entre la cremosidad del queso de cabra, la frescura picante de la rúcula y la dulzura de los tomates confitados. Una creación que celebra la simplicidad refinada de la cocina mediterránea."
        },
        {
          "name": "Pizza Tonno & Stracciatella",
          "price": 150,
          "ingredients": "Salsa de tomate, atún, cebolla frita, mozzarella, stracciatella, cebollino",
          "description": "El atún se encuentra con la cremosa stracciatella, realzado por la dulzura de la cebolla frita crujiente y la frescura del cebollino, sobre una base de salsa de tomate y mozzarella fundente."
        },
        {
          "name": "Pizza Mare Mediterraneo",
          "price": 195,
          "ingredients": "Salsa de tomate, pulpo, calamares, gambas, calabacín, mozzarella, gremolata",
          "description": "El Mediterráneo en cada bocado: pulpo, calamares y gambas generosos, calabacín tierno y mozzarella, culminados con una fresca gremolata de limón y perejil."
        },
        {
          "name": "Pizza de Aguja de Ternera",
          "price": 160,
          "ingredients": "Salsa de tomate, champiñones, aguja de ternera, parmesano",
          "description": "Aguja de ternera tierna y cocinada lentamente, junto con champiñones y parmesano sobre nuestra salsa de tomate casera. Una pizza rica y reconfortante."
        },
        {
          "name": "Pizza Capricciosa",
          "price": 160,
          "ingredients": "Salsa de tomate, champiñones, jamón, alcachofas confitadas, mozzarella, aceitunas negras",
          "description": "El gran clásico italiano: jamón, champiñones, alcachofas confitadas y aceitunas negras sobre salsa de tomate y mozzarella fundente."
        },
        {
          "name": "Pizza Pepperoni",
          "price": 160,
          "ingredients": "Salsa de tomate, pepperoni, mozzarella, tomates secos",
          "description": "El pepperoni ligeramente picante se encuentra con la dulzura concentrada de los tomates secos y la mozzarella fundente, sobre nuestra salsa de tomate casera."
        }
      ]
    },
    {
      title: 'PASTAS',
      items: [
        {
          name: 'Linguine Con Salmón',
          price: 240,
          ingredients: 'Dúo de salmón con una salsa rosada',
          description: 'Un dúo de salmón fresco y ahumado abraza unos linguine al dente en una aterciopelada salsa rosada. Cada bocado transporta entre mar y montaña para una experiencia refinada y reconfortante.'
        },
        {
          name: 'Linguine Con Gambas',
          price: 240,
          ingredients: 'Con una salsa de tomate picante',
          description: 'Gambas salvajes selladas a la perfección sobre un nido de linguine envueltos en una salsa de tomate especiada. Las notas picantes bailan con la dulzura de los crustáceos para un plato memorable.'
        },
        {
          name: 'Penne Arrabbiata',
          price: 160,
          ingredients: 'Pasta con una salsa de tomate picante y albahaca',
          description: 'La pasión italiana en cada bocado - nuestros penne capturan perfectamente la ardiente salsa de tomate, puntuada de picante y suavizada por hojas de albahaca fresca para un equilibrio armonioso.'
        },
        {
          name: 'Espaguetis a la Marinera',
          price: 320,
          ingredients: 'Almejas, mariscos y gambas salvajes',
          description: 'Una celebración de los tesoros del mar donde almejas frescas, delicados mariscos y gambas salvajes se encuentran en una ligera salsa perfumada con ajo y perejil.'
        },
        {
          name: 'Espaguetis Alle Vongole',
          price: 230,
          ingredients: 'Almejas y tomates frescos',
          description: 'La elegancia marina en estado puro - almejas frescas liberan su jugo sabroso que se mezcla con los tomates y el aceite de oliva para una sinfonía de sabores marítimos.'
        },
        {
          name: 'Espaguetis Carbonara',
          price: 190,
          ingredients: 'Bacon de pavo halal con salsa blanca',
          description: 'Nuestra interpretación del clásico romano - espaguetis al dente envueltos en una salsa cremosa de huevos, espolvoreados con crujiente bacon de pavo halal y un generoso toque de pimienta negra.'
        },
        {
          name: 'Tagliatelle con Pollo y Champiñones',
          price: 220,
          ingredients: 'Pollo, champiñones, salsa blanca perfumada con trufa',
          description: 'Cintas de pasta fresca entrelazan jugosos trozos de pollo y champiñones, todo envuelto en una salsa delicadamente infusionada con trufa. Un equilibrio perfecto entre rusticidad y refinamiento.'
        }
      ]
    }
  ];

  return (
    <div 
      id="pizza-pasta-menu-section"
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
            Pizzas & Pastas
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-2 font-light"
            style={{ color: 'rgba(129, 113, 94, 0.8)' }}
          >
            Autenticidad y sabores
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
            <PizzaPastaMenuSection 
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

export default PizzaPastaMenu;