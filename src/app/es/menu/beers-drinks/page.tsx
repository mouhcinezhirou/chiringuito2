import Beers from "./components/Beers";
import BeersHero from "./components/BeersHero";
import NavSection from "../../components/NavSection";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <BeersHero />
      <Beers />
      <NavSection />
    </main>
  );
}