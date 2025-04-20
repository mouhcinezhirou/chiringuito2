'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const menuCategories = [
  {
    title: "Cócteles y Shots",
    image: "/cocktails.jpg",
    description: "Elixires meticulosamente elaborados que armonizan sofisticación y placer sensorial.",
    href: "/es/menu/cocktails"
  },
  {
    title: "Bebidas Sin Alcohol",
    image: "/soft-drinks.jpg",
    description: "Bebidas sin alcohol seleccionadas para refrescar y elevar el paladar.",
    href: "/es/menu/soft-drinks"
  },
  {
    title: "Champán y Vinos",
    image: "/champagne.jpg",
    description: "Cosechas prestigiosas y champanes efervescentes de los viñedos más distinguidos del mundo.",
    href: "/es/menu/champagne-wines"
  },
  {
    title: "Cervezas y Alcohol",
    image: "/beers.jpg",
    description: "Una colección selecta de cervezas artesanales y espirituosos de distinción.",
    href: "/es/menu/beers-drinks"
  },
  {
    title: "Asiática / Sushi",
    image: "/sushi.jpg",
    description: "Cocina asiática auténtica y sushi elaborado con precisión, celebrando siglos de tradición gastronómica.",
    href: "/es/menu/asian-sushi"
  },
  {
    title: "Entrantes",
    image: "/starters.jpg",
    description: "Aperitivos cuidadosamente diseñados que preparan el escenario para una experiencia culinaria inolvidable.",
    href: "/es/menu/starters"
  },
  {
    title: "Pescados y Carnes",
    image: "/fish-meat.jpg",
    description: "Mariscos y cortes selectos, obtenidos con meticulosa atención a la calidad y procedencia.",
    href: "/es/menu/fish-and-meat"
  },
  {
    title: "Pastas y Pizzas",
    image: "/pasta-pizza.jpg",
    description: "Composiciones italianas auténticas, preparadas con respeto a las técnicas y sabores tradicionales.",
    href: "/es/menu/pastas-pizzas"
  },
  {
    title: "Postres",
    image: "/desserts.jpg",
    description: "Sublimes creaciones que ofrecen un cierre elegante y matizado a tu experiencia gastronómica.",
    href: "/es/menu/desserts"
  }
];

export default function MenuCategories() {
  return (
    <div id="menu" className="py-16 px-4 bg-[#F2EFEC]">
      <div className="container mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="font-optima text-4xl md:text-5xl font-light text-center mb-4"
        style={{ color: '#81715E' }}
      >
        Paisaje Culinario
      </motion.h2>

      <p 
        className="text-sm mb-12 tracking-wide max-w-2xl mx-auto text-center"
        style={{ color: '#81715E' }}
      >
        Un viaje culinario donde cada plato cuenta una historia y cada bocado revela el arte de nuestra cocina.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="relative overflow-hidden rounded-xl shadow-lg group"
          >
            <Link href={category.href} className="block h-full">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src={category.image} 
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.6]"
                  style={{ objectFit: 'cover', objectPosition: 'center' }} 
                  priority={index < 3}
                />
              </div>

              <div className="relative z-10 p-7 text-white h-80 flex flex-col justify-end">
                <h3 className="font-optima text-2xl font-semibold mb-4 text-white drop-shadow-lg tracking-wide">
                  {category.title}
                </h3>
                <p className="mb-5 text-neutral-100 text-opacity-90 drop-shadow-md leading-relaxed">
                  {category.description}
                </p>
                <span 
                  className="font-optima inline-block border border-white/30 text-white hover:bg-white/10 font-medium py-2 px-5 rounded-full transition duration-300 self-start backdrop-blur-sm"
                >
                  Explorar
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}
