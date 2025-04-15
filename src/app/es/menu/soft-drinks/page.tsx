import Drinks from "./components/Drinks";
import DrinksHero from "./components/DrinksHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <DrinksHero />
      <Drinks />
      <NavSection />
    </main>
  );
}