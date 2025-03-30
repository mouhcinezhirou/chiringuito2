// app/page.tsx
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import NavSection from "./components/NavSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <MenuSection />
      <NavSection />
    </main>
  );
}