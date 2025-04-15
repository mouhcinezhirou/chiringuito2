import Pastaspizzas from "./components/Pastaspizzas";
import PastaspizzasHero from "./components/PastaspizzasHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <PastaspizzasHero />
      <Pastaspizzas />
      <NavSection />
    </main>
  );
}