import Champagne from "./components/Champagne";
import ChampagneHero from "./components/ChampagneHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <ChampagneHero />
      <Champagne />
      <NavSection />
    </main>
  );
}