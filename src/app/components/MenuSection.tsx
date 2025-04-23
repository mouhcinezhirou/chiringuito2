'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const menuCategories = [
  {
    title: "Cocktails & Shots",
    image: "/cocktails.jpg",
    description: "Des élixirs méticuleusement élaborés qui harmonisent sophistication et plaisir sensoriel.",
    href: "/menu/cocktails"
  },
  {
    title: "Boissons & Softs",
    image: "/soft-drinks.jpg",
    description: "Boissons non alcoolisées sélectionnées pour rafraîchir et rehausser le palais.",
    href: "/menu/soft-drinks"
  },
  {
    title: "Champagnes & Vins",
    image: "/champagne.jpg",
    description: "Des cuvées prestigieuses et des champagnes effervescents issus des vignobles les plus prestigieux du monde.",
    href: "/menu/champagne-wines"
  },
  {
    title: "Bières & Alcools",
    image: "/beers.jpg",
    description: "A discerning collection of artisanal brews and distinguished spirit selections.",
    href: "/menu/beers-drinks"
  },
  {
    title: "Asiatique / Sushis",
    image: "/sushi.jpg",
    description: "Cuisine asiatique authentique et sushis préparés avec précision, célébrant des siècles de tradition gastronomique.",
    href: "/menu/asian-sushi"
  },
  {
    title: "Entrées",
    image: "/starters.jpg",
    description: "Des entrées soigneusement composées qui préparent le terrain pour un voyage culinaire mémorable.",
    href: "/menu/starters"
  },
  {
    title: "Poisson & Viande",
    image: "/fish-meat.jpg",
    description: "Fruits de mer immaculés et morceaux de choix, sélectionnés avec une attention méticuleuse à la qualité et à la provenance.",
    href: "/menu/fish-and-meat"
  },
  {
    title: "Pâtes & pizzas",
    image: "/pasta-pizza.jpg",
    description: "Compositions italiennes authentiques, préparées avec respect des techniques et des saveurs traditionnelles.",
    href: "/menu/pastas-pizzas"
  },
  {
    title: "Desserts",
    image: "/desserts.jpg",
    description: "Des confiseries sublimes qui offrent une conclusion nuancée et élégante à votre expérience culinaire.",
    href: "/menu/desserts"
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
  Paysage Culinaire
</motion.h2>
        <p 
  className="text-sm mb-12 tracking-wide max-w-2xl mx-auto text-center"
  style={{ color: '#81715E' }}
>
  Un voyage culinaire où chaque plat raconte une histoire et chaque bouchée révèle l'art de notre cuisine.
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
                    Explorer
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