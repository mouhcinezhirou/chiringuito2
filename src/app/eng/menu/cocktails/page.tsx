import Cocktails from "./components/Cocktails";
import CocktailHero from "./components/CocktailHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <CocktailHero />
      <Cocktails />
      <NavSection />
    </main>
  );
}