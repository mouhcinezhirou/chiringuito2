'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const categoriasMenu = [
  {
    categoria: "Cócteles & Shots",
    link: "/es/menu/cocktails",
  },
  {
    categoria: "Bebidas Sin Alcohol",
    link: "/es/menu/soft-drinks",
  },
  {
    categoria: "Champán & Vinos",
    link: "/es/menu/champagne-wines",
  },
  {
    categoria: "Cervezas & Licores",
    link: "/es/menu/beers-drinks",
  },
  {
    categoria: "Asiático / Sushi",
    link: "/es/menu/asian-sushi",
  },
  {
    categoria: "Entrantes",
    link: "/es/menu/starters",
  },
  {
    categoria: "Pescados & Carnes",
    link: "/es/menu/fish-and-meat",
  },
  {
    categoria: "Pastas & Pizzas",
    link: "/es/menu/pastas-pizzas",
  },
  {
    categoria: "Postres",
    link: "/es/menu/desserts",
  }
];

export default function NavegacionMenuFijo({ categoriaSeleccionada = null }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [esFijo, setEsFijo] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      setEsFijo(window.scrollY > 50);
    };

    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuAbierto]);

  return (
    <>
      {/* Navegación fija */}
      <motion.nav 
        className={`w-full z-50 fixed top-0 left-0 transition-all duration-500
          ${esFijo ? 'bg-stone-900/90 backdrop-blur-md' : 'bg-transparent'}`}
        animate={{
          height: esFijo ? 64 : 80,
          borderBottom: esFijo ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-6xl h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: esFijo ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="/logo.png" 
                alt="Logo del Restaurante" 
                width={esFijo ? 70 : 85}
                height={esFijo ? 25 : 30}
                className="object-contain transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Botón de menú hamburguesa */}
          <motion.button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="group relative"
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center justify-center w-8 h-8 relative">
              <motion.span 
                className={`block h-px w-6 absolute ${menuAbierto ? 'bg-white' : esFijo ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  rotate: menuAbierto ? 45 : 0,
                  y: menuAbierto ? 0 : -4,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className={`block h-px w-6 absolute ${menuAbierto ? 'bg-white' : esFijo ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  opacity: menuAbierto ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className={`block h-px w-6 absolute ${menuAbierto ? 'bg-white' : esFijo ? 'bg-amber-200' : 'bg-white'}`}
                animate={{ 
                  rotate: menuAbierto ? -45 : 0,
                  y: menuAbierto ? 0 : 4,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Overlay del Menú */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-stone-900"
          >
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 h-24 w-24 border-t border-l border-amber-200/20"></div>
            <div className="absolute bottom-0 right-0 h-24 w-24 border-b border-r border-amber-200/20"></div>
            
            {/* Contenido del Menú */}
            <div className="flex flex-col justify-center items-center h-full pt-16 relative z-10">
              <div className="flex flex-col justify-center items-center space-y-2 px-4 max-w-md w-full">
                {categoriasMenu.map((item, index) => (
                  <Link 
                    key={item.categoria} 
                    href={item.link}
                    onClick={() => setMenuAbierto(false)}
                    className="w-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                      className="relative group"
                    >
                      <motion.div 
                        className={`
                          text-center text-xl py-2 leading-tight font-serif transition-all duration-300
                          ${categoriaSeleccionada === item.categoria 
                            ? 'text-amber-200' 
                            : 'text-stone-200 group-hover:text-amber-100'}
                        `}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.categoria}
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-1/2 h-px bg-amber-200/30 w-0 transform -translate-x-1/2 transition-all duration-300 group-hover:w-16"
                        whileHover={{ width: 64 }}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
